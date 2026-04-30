// QuickSort implementation
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
}

// In-place QuickSort using partition
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

function quickSortInPlace(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSortInPlace(arr, low, pivotIndex - 1);
    quickSortInPlace(arr, pivotIndex + 1, high);
  }
  return arr;
}

// Generate random array
function generateRandomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100000));
}

// Verify arrays are sorted correctly
function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}

// Main benchmarking function
function runBenchmarks() {
  const sizes = [1000, 5000, 10000, 50000];

  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║          QUICKSORT vs ARRAY.SORT() BENCHMARKS             ║");
  console.log(
    "╚════════════════════════════════════════════════════════════╝\n",
  );

  sizes.forEach((size) => {
    console.log(`\n📊 Testing with ${size} random elements:\n`);

    // Generate test array
    const testArray = generateRandomArray(size);

    // Test 1: Simple QuickSort (creates new arrays)
    const arr1 = [...testArray];
    console.time("✓ QuickSort (simple, creates new arrays)");
    const result1 = quickSort(arr1);
    console.timeEnd("✓ QuickSort (simple, creates new arrays)");
    console.log(`  Sorted correctly: ${isSorted(result1)}`);

    // Test 2: In-place QuickSort
    const arr2 = [...testArray];
    console.time("✓ QuickSort (in-place)");
    quickSortInPlace(arr2);
    console.timeEnd("✓ QuickSort (in-place)");
    console.log(`  Sorted correctly: ${isSorted(arr2)}`);

    // Test 3: Array.sort() built-in
    const arr3 = [...testArray];
    console.time("✓ Array.sort() (built-in)");
    arr3.sort((a, b) => a - b);
    console.timeEnd("✓ Array.sort() (built-in)");
    console.log(`  Sorted correctly: ${isSorted(arr3)}`);

    console.log(
      "\n─────────────────────────────────────────────────────────────",
    );
  });

  console.log(
    "\n╔════════════════════════════════════════════════════════════╗",
  );
  console.log("║                    BENCHMARK COMPLETE                      ║");
  console.log(
    "╚════════════════════════════════════════════════════════════╝\n",
  );

  // Summary insights
  console.log("📝 Summary:\n");
  console.log("• Array.sort() is typically fastest (engine-optimized)");
  console.log("• In-place QuickSort uses less memory than simple QuickSort");
  console.log("• Simple QuickSort creates new arrays (higher memory usage)");
  console.log(
    "• Performance depends on data distribution and engine implementation\n",
  );
}

// Run benchmarks
runBenchmarks();
