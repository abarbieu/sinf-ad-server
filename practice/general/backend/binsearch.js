const arr = [];
for (let i = 0; i < 100; i++) {
  arr[i] = i;
}

const binsearch = (num, arr) => {
  if (arr.length < 1) {
    console.log("Not Found!");
    return -1;
  }
  const mid = arr.length / 2;
  if (arr[mid] === num) {
    console.log("Found!");
    return 0;
  } else if (arr[mid] > num) {
    return binsearch(num, arr.slice(0, mid - 1));
  } else {
    return binsearch(num, arr.slice(mid, arr.length));
  }
};

console.log(binsearch(21, arr));
