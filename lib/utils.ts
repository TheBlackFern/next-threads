import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { IThread } from "./models/thread.model";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function getRepliesFromThreads(threads: IThread[]) {
  const replies = threads.reduce<[IThread, IThread][]>(
    (outerAcc, parentThread) => {
      return outerAcc.concat(
        parentThread.children.reduce<[IThread, IThread][]>(
          (innerAcc, childThread) => {
            if (childThread.author.id !== parentThread.author.id) {
              innerAcc.push([childThread, parentThread]);
            }
            return innerAcc;
          },
          [],
        ),
      );
    },
    [],
  );
  return replies.sort(function ([child1, p1], [child2, p2]) {
    return child1.created > child2.created ? -1 : 1;
  });
}
