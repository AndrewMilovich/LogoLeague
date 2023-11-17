export const multithreading = async <A, T>(
  listOfArguments: A[],
  limit: number,
  asyncOperation: (arg: A) => Promise<T>,
): Promise<T[]> => {
  const concurrencyLimit = limit;

  const delay = () => 1000 / 10;

  const argsCopy = [].concat(listOfArguments.map((val, ind) => ({ val, ind })));
  const result = new Array(listOfArguments.length);
  const promises = new Array(concurrencyLimit).fill(Promise.resolve());

  function chainNext(promise: Promise<void>): Promise<void> {
    if (argsCopy.length) {
      const arg = argsCopy.shift();

      return promise.then(() => {
        const operationPromise = asyncOperation(arg.val).then((res) => {
          result[arg.ind] = res;
        });

        return new Promise((resolve) => {
          setTimeout(() => resolve(chainNext(operationPromise)), delay());
        });
      });
    }

    return promise;
  }

  await Promise.all(promises.map(chainNext));

  return result;
};
