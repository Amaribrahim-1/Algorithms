// ─── Dataset ───────────────────────────────────────────────────────────────
const SIZE = 10000;
const data = Array.from({ length: SIZE }, () =>
  Math.floor(Math.random() * 1000),
);

// ─── Sorting Algorithms ────────────────────────────────────────────────────

// 1. Bubble Sort — O(n²) -> 100 million comparison operations for 10,000 elements
function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length - 1; i++)
    for (let j = 0; j < a.length - 1 - i; j++)
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]]; // swap
      }
  return a;
}

// 2. Counting Sort — O(n + k) -> n(number of elements) + k(range of elements) = 10000 + 1000 = 11000
function countingSort(arr) {
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);
  arr.forEach((n) => count[n]++);
  const result = [];
  count.forEach((val, i) => {
    for (let j = 0; j < val; j++) result.push(i);
  });
  return result;
}

// ─── Searching Algorithms ──────────────────────────────────────────────────

// 1. Linear Search — O(n)
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) if (arr[i] === target) return i;
  return -1;
}

// 2. Binary Search — O(log n)
function binarySearch(arr, target) {
  let low = 0,
    high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

// ─── Run & Measure Sorting ─────────────────────────────────────────────────
console.log("\n========== SORTING ==========");

let t_start, t_end, sorted1, sorted2;

t_start = performance.now();
sorted1 = bubbleSort(data);
t_end = performance.now();
const bubbleTime = (t_end - t_start).toFixed(4);

t_start = performance.now();
sorted2 = countingSort(data);
t_end = performance.now();
const countingTime = (t_end - t_start).toFixed(4);

console.log("\n[Bubble Sort]    O(n²)");
console.log("Sorted Data:    ", sorted1);
console.log("Execution Time: ", bubbleTime, "ms");

console.log("-".repeat(50));

console.log("\n[Counting Sort]  O(n + k)");
console.log("Sorted Data:    ", sorted2);
console.log("Execution Time: ", countingTime, "ms\n");

const fasterSort =
  parseFloat(bubbleTime) < parseFloat(countingTime)
    ? "Bubble Sort"
    : "Counting Sort";
console.log(`\n✔ Faster Sort: ${fasterSort}`);

// ─── Run & Measure Searching ───────────────────────────────────────────────
console.log("\n========== SEARCHING ==========");

const target = data[Math.floor(Math.random() * SIZE)];
console.log(`\nSearching for target: ${target}`);

t_start = performance.now();
const linIdx = linearSearch(data, target);
t_end = performance.now();
const linearTime = (t_end - t_start).toFixed(4);

const sortedForBinary = [...sorted1];
t_start = performance.now();
const binIdx = binarySearch(sortedForBinary, target);
t_end = performance.now();
const binaryTime = (t_end - t_start).toFixed(4);

console.log("\n[Linear Search]  O(n)  — searches original array");
console.log(
  `Result: ${linIdx !== -1 ? `Found at index ${linIdx}` : "Not found"}`,
);
console.log("Execution Time: ", linearTime, "ms\n");

console.log("-".repeat(50));

console.log("\n[Binary Search]  O(log n) — searches sorted array");
console.log(
  `Result: ${binIdx !== -1 ? `Found at index ${binIdx} (in sorted array)` : "Not found"}`,
);
console.log("Execution Time: ", binaryTime, "ms");

const fasterSearch =
  parseFloat(linearTime) < parseFloat(binaryTime)
    ? "Linear Search"
    : "Binary Search";
console.log(`\n✔ Faster Search: ${fasterSearch}`);

// ─── Summary ───────────────────────────────────────────────────────────────
console.log("\n========== SUMMARY ==========");
console.log(`Bubble Sort:    ${bubbleTime} ms`);
console.log(`Counting Sort:  ${countingTime} ms`);
console.log(`Linear Search:  ${linearTime} ms`);
console.log(`Binary Search:  ${binaryTime} ms`);
