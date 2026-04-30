# QuickSort Implementation Explanation

This document explains a recursive implementation of the QuickSort algorithm in JavaScript. It sorts an array by partitioning it around a pivot element and recursively sorting the subarrays.

## Overview

- **Algorithm Type**: Divide and conquer, recursive sorting.
- **Time Complexity**: O(n log n) average, O(n²) worst-case.
- **Space Complexity**: O(n) due to auxiliary arrays (not in-place).
- **Stability**: Not stable (relative order of equal elements may change).

## Step-by-Step Breakdown

1. **Base Case**  
   If the array has 1 or fewer elements (`arr.length <= 1`), it's already sorted, so return it as-is.

2. **Pivot Selection**  
   Choose the first element (`arr[0]`) as the pivot. This is a simple choice; other strategies (e.g., median-of-three) exist for better performance.

3. **Partitioning**
   - Create two empty arrays: `left` for elements smaller than the pivot, `right` for elements larger or equal.
   - Loop through the array starting from index 1 (skipping the pivot).
   - If an element is less than the pivot, add it to `left`; otherwise, add it to `right`.

4. **Recursive Calls**  
   Recursively sort the `left` and `right` subarrays using the same `quickSort` function.

5. **Combine**  
   Concatenate the sorted `left` array, the pivot, and the sorted `right` array to form the final sorted array.

## Example Walkthrough

For the array `[3, 1, 4, 1, 5]`:

- Pivot: 3
- Left: [1, 1] (elements < 3)
- Right: [4, 5] (elements >= 3)
- Recurse: `quickSort([1,1])` → [1,1]; `quickSort([4,5])` → [4,5]
- Result: [1,1] + [3] + [4,5] = [1,1,3,4,5]

## Code Snippet

```javascript
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
```

## Notes

- This implementation uses extra space for `left` and `right` arrays. In-place versions exist but are more complex.
- Worst-case occurs when the pivot is always the smallest or largest element (e.g., already sorted array).
- For production use, consider randomized pivot selection or other optimizations.
