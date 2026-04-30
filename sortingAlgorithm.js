//generate quick sort algorithm
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var pivot = arr[0];
  var left = [];
  var right = [];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
}

//generate HeapSort algorithm
function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap
    heapify(arr, n, largest); // Recursively heapify the affected sub-tree
  }
}
//generate MergeSort algorithm
function merge(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  let i = 0,
    j = 0,
    k = left;
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] < rightArr[j]) {
      arr[k++] = leftArr[i++];
    } else {
      arr[k++] = rightArr[j++];
    }
  }
  while (i < leftArr.length) {
    arr[k++] = leftArr[i++];
  }
  while (j < rightArr.length) {
    arr[k++] = rightArr[j++];
  }
}
function mergeSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }
  return arr;
}

//compare performance between mergesort and quicksort and heapsort
function compareSortingAlgorithms() {
  const arr1 = Array.from({ length: 10000 }, () =>
    Math.floor(Math.random() * 10000),
  );
  const arr2 = [...arr1];
  const arr3 = [...arr1];
  console.time("QuickSort");
  quickSort(arr1, 0, arr1.length - 1);
  console.timeEnd("QuickSort");
  console.time("MergeSort");
  mergeSort(arr2, 0, arr2.length - 1);
  console.timeEnd("MergeSort");
  console.time("HeapSort");
  heapSort(arr3);
  console.timeEnd("HeapSort");
}
