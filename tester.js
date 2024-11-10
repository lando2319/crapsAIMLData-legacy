const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num) => {
    if (num < 3) return;  // Skip this iteration if number is less than 3
    console.log(num);  // This will only log 3, 4, and 5
});
