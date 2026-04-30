# Sorting Algorithm Analysis

## QuickSort Complexity

- Time complexity:
  - Best case: `O(n log n)`
  - Average case: `O(n log n)`
  - Worst case: `O(n²)` (for example, when the pivot choice is poor on already-sorted input)
- Space complexity:
  - `O(n)` extra space in this implementation due to the `left` and `right` arrays
  - Recursion stack space: `O(log n)` average, `O(n)` worst-case
- Notes:
  - This version is not in-place.
  - Pivot selection is critical for performance.

## Comparison with Other Sorting Algorithms

### MergeSort

- Time complexity: `O(n log n)` best/average/worst
- Space complexity: `O(n)` extra space for merging
- Stability: stable
- Characteristics:
  - Guaranteed performance regardless of input order
  - More predictable than QuickSort
  - Often used when stable sorting is required

### HeapSort

- Time complexity: `O(n log n)` best/average/worst
- Space complexity: `O(1)` extra space (in-place)
- Stability: not stable
- Characteristics:
  - Worst-case guarantee without additional memory
  - Usually slower than QuickSort and MergeSort in practice due to larger constant factors
  - Good choice when in-place sorting is important

### JavaScript built-in `Array.prototype.sort()`

- Engine-specific implementations vary:
  - V8 uses hybrid algorithms such as Timsort or QuickSort variants
  - SpiderMonkey uses merge sort / insertion sort hybrids
- Typical performance: `O(n log n)` average, often `O(n log n)` worst-case
- Space complexity: usually `O(n)` or engine-dependent
- Stability: many modern engines use stable sorting
- Characteristics:
  - Optimized by the runtime and generally the best choice for application code
  - Handles edge cases and performance optimizations internally

## Practical Summary

- **Use built-in `sort()`** for most JavaScript code: it is optimized, maintained by the runtime, and usually the best choice.
- **Use QuickSort** when you need a simple, usually fast algorithm and can manage pivot choice.
- **Use MergeSort** when stability and guaranteed `O(n log n)` performance matter.
- **Use HeapSort** when you need an in-place sort with guaranteed worst-case performance.
