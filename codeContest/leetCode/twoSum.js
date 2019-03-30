// Problem Description

// Given an array of integers, return indices of the two numbers such that they add up to a specific target.
//
// You may assume that each input would have exactly one solution, and you may not use the same element twice.

const nums = [2, 7, 11, 15];
const target = 9;

function twoSum(nums, target) {
  const map = {};
  const len = nums.length;
  map[target - nums[0]] = 0;
  for (let i = 1; i < len; i++) {
    const n = nums[i];
    if (n in map) return [map[n], i];
    map[target - n] = i;
  }
}

console.log(twoSum(nums, target));
