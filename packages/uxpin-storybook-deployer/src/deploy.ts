import { PresignedPost } from "aws-sdk/clients/s3";
import axios, {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { execSync } from "child_process";
import { createReadStream, readdirSync, statSync } from "fs";
import { relative, join } from "path";
import FormData from "form-data";
import { IncomingMessage } from "http";
import chalk from "chalk";
import mime from "mime-types";
// @ts-ignore
import dig from "node-dig-dns";

type DeployOptions = {
  source: string;
  token: string;
  uxpinDomain?: string;
};

type GetLibraryHashByTokenResponse = {
  libraryHash: string;
};

type UpdateCommitHashBody = {
  commitHash: string;
};

const UXPIN_DOMAIN = "uxpin.com";
const AUTH_TOKEN_HEADER_NAME = "auth-token";

let latestCommitHash: string;

export async function deploy(args: DeployOptions): Promise<void> {
  try {
    latestCommitHash = getLatestCommitHash(args.source);
    const { libraryHash } = await getLibraryHashByToken(args);
    console.log("Library hash", libraryHash);
    console.log("Start uploading", Date.now());
    const presignedS3PostUrlResponse = await getPresignedS3PostUrl(args);
    console.log(presignedS3PostUrlResponse);
    dig([presignedS3PostUrlResponse.url])
      .then((result: any) => {
        console.log("Presigned url - dig result", result);
      })
      .catch((err: any) => {
        console.log("Error presigned url:", err);
      });

    await deployStorybookToS3(args, libraryHash, presignedS3PostUrlResponse);
    console.log("Updating commit hash on UXPin...");
    console.log("End uploading", Date.now());
    await updateCommitHash(args);
    const storybookUrl = join(
      getBaseUrl(args.uxpinDomain),
      "libraries-storybook",
      libraryHash,
      "index.html"
    );
    console.log(
      chalk.green(`✅ DONE! Your storybook is available on ${storybookUrl}`)
    );
  } catch (error) {
    console.log("End uploading", Date.now());
    typeof error === "string"
      ? console.log(chalk.red(error))
      : console.log(error);
  }
}

function getBaseUrl(uxpinDomain: string | undefined): string {
  return `https://api.${uxpinDomain || UXPIN_DOMAIN}`;
}

async function getLibraryHashByToken(
  args: DeployOptions
): Promise<GetLibraryHashByTokenResponse> {
  const url = `${getBaseUrl(
    args.uxpinDomain
  )}/libraries-storybook/getLibraryHashByToken`;
  return axiosWithEnhancedError({
    url,
    headers: { [AUTH_TOKEN_HEADER_NAME]: args.token, method: "GET" },
  }).then((res: AxiosResponse) => res.data as GetLibraryHashByTokenResponse);
}

async function getPresignedS3PostUrl(
  args: DeployOptions
): Promise<PresignedPost> {
  const url = `${getBaseUrl(
    args.uxpinDomain
  )}/libraries-storybook/getPresignedS3PostUrl/${latestCommitHash}`;
  console.log("getPresignedS3PostUrl", url);
  return axiosWithEnhancedError({
    url,
    headers: { [AUTH_TOKEN_HEADER_NAME]: args.token, method: "GET" },
  }).then((res: AxiosResponse) => res.data as PresignedPost);
}

function getLatestCommitHash(source: string): string {
  try {
    return execSync(`cd ${source} && git rev-parse HEAD`).toString().trim();
  } catch (error) {
    throw `ERROR: Failed to get commit hash from ${source}. Please make sure you can run\ngit rev-parse HEAD \ncommand in the directory because UXPin requires latest commit hash`;
  }
}

function getS3Prefix(libraryHash: string): string {
  return `${libraryHash}/${latestCommitHash}/`;
}

function getFilesList(source: string): string[] {
  let results: string[] = [];
  const list: string[] = readdirSync(source);
  list.forEach((fileOrDir) => {
    fileOrDir = source + "/" + fileOrDir;
    const stat = statSync(fileOrDir);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesList(fileOrDir));
    } else {
      results.push(fileOrDir);
    }
  });
  return results;
}

async function deployStorybookToS3(
  args: DeployOptions,
  libraryHash: string,
  presignedS3urlResponse: PresignedPost
): Promise<void[]> {
  console.log("Start uploading Storybook assets...");
  const s3Prefix = getS3Prefix(libraryHash);
  const promises: Array<Promise<void>> = getFilesList(args.source).map(
    async (absFilePath) => {
      const relativePath = relative(args.source, absFilePath);
      const key = join(s3Prefix, relativePath);

      const form = new FormData();
      Object.entries(presignedS3urlResponse.fields).forEach(
        ([field, value]) => {
          form.append(field, value);
        }
      );
      form.append("key", key);
      form.append(
        "Content-Type",
        mime.contentType(mime.lookup(absFilePath) || "application/octet-stream")
      );

      console.log("File", absFilePath, mime.lookup(absFilePath));
      form.append("file", createReadStream(absFilePath));

      return new Promise((resolve, reject) =>
        form.submit(
          presignedS3urlResponse.url,
          (err, data: IncomingMessage) => {
            if (err) {
              reject(err);
            } else if (data.statusCode !== 204) {
              reject({
                status: data.statusCode,
                statusMessage: data.statusMessage,
                filePath: relativePath,
              });
            }
            resolve();
          }
        )
      );
    }
  );

  return Promise.all(promises);
}

async function updateCommitHash(args: DeployOptions): Promise<boolean> {
  const url = `${getBaseUrl(
    args.uxpinDomain
  )}/libraries-storybook/updateCommitHash`;
  const data: UpdateCommitHashBody = { commitHash: latestCommitHash };
  return axiosWithEnhancedError({
    url,
    data,
    headers: { [AUTH_TOKEN_HEADER_NAME]: args.token },
    method: "PUT",
  }).then(() => true);
}

function axiosWithEnhancedError(options: AxiosRequestConfig): AxiosPromise {
  return axios(options).catch((error: AxiosError) => {
    if (error.response) {
      throw {
        ...(error.response.data as AxiosError),
        url: options.url,
      };
    }
    throw error;
  });
}
