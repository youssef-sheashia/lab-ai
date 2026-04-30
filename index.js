// implement quick sort in javascript
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
// optimize quicksort to reduce recursion depth and improve performance
function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
function optimizedQuickSort(arr, low, high) {
  while (low < high) {
    // Partition the array and get the pivot index
    const pivotIndex = partition(arr, low, high);
    // Recur on the smaller subarray to reduce recursion depth
    if (pivotIndex - low < high - pivotIndex) {
      optimizedQuickSort(arr, low, pivotIndex - 1);
      low = pivotIndex + 1; // Tail call optimization
    } else {
      optimizedQuickSort(arr, pivotIndex + 1, high);
      high = pivotIndex - 1; // Tail call optimization
    }
  }
  return arr;
}
// In-place Quick Sort: Recursive version
function quickSortRecursive(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSortRecursive(arr, left, pivotIndex - 1);
    quickSortRecursive(arr, pivotIndex + 1, right);
  }
  return arr;
}
// In-place Quick Sort: Iterative version
function quickSortIterative(arr) {
  const stack = [];
  stack.push(0);
  stack.push(arr.length - 1);
  while (stack.length) {
    const right = stack.pop();
    const left = stack.pop();
    if (left < right) {
      const pivotIndex = partition(arr, left, right);
      // Push subarrays to stack
      stack.push(left);
      stack.push(pivotIndex - 1);
      stack.push(pivotIndex + 1);
      stack.push(right);
    }
  }
  return arr;
}
// Compare performance of recursive and iterative quicksort
function compareQuickSorts() {
  const arr1 = Array.from({ length: 10000 }, () =>
    Math.floor(Math.random() * 10000),
  );
  const arr2 = [...arr1];
  console.time("Recursive QuickSort");
  quickSortRecursive(arr1);
  console.timeEnd("Recursive QuickSort");
  console.time("Iterative QuickSort");
  quickSortIterative(arr2);
  console.timeEnd("Iterative QuickSort");
}
// Run the performance comparison
compareQuickSorts();
// write unit tests using jest for quicksort covering edge cases:
// empty array, sorted, reverse sorted, duplicates, large dataset
test("Quick Sort - Empty Array", () => {
  expect(quickSort([])).toEqual([]);
});

test("Quick Sort - Already Sorted", () => {
  expect(quickSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
});
test("Quick Sort - Reverse Sorted", () => {
  expect(quickSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
});
test("Quick Sort - Duplicates", () => {
  expect(quickSort([3, 1, 2, 3, 1])).toEqual([1, 1, 2, 3, 3]);
});
test("Quick Sort - Large Dataset", () => {
  const largeArray = Array.from({ length: 1000 }, () =>
    Math.floor(Math.random() * 1000),
  );
  const sortedArray = [...largeArray].sort((a, b) => a - b);
  expect(quickSort(largeArray)).toEqual(sortedArray);
});
