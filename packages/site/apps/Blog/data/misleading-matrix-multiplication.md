---
title: 矩阵乘法入门（大雾）
createdAt: 2024-02-18
updatedAt: 2024-02-18
tags: funny
introduction: 10s 掌握矩阵乘法，但不适用于全部矩阵。
---

在网上看到了一张矩阵乘法指南。

虽然这个算法并不适用于所有的矩阵，但对于符合条件的矩阵，真的可以算得又快又准（狗头）。

![网上流传的矩阵乘法指南](misleading-matrix-multiplication.png)

那么问题来了，到底有矩阵是符合算法要求的？

祭出经典的循环嵌套术试验一下：

```js
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const match = (a, b, c, d, e, f, g, h) => {
  const m1 = a * e + b * g === 10 * a + e
  const m2 = a * f + b * h === 10 * b + f
  const m3 = c * e + d * g === 10 * c + g
  const m4 = c * f + d * h === 10 * d + h
  return m1 && m2 && m3 && m4
}

let total = 0
let count = 0
for (let a = 0; a <= 9; a++) {
  for (let b = 0; b <= 9; b++) {
    for (let c = 0; c <= 9; c++) {
      for (let d = 0; d <= 9; d++) {
        for (let e = 0; e <= 9; e++) {
          for (let f = 0; f <= 9; f++) {
            for (let g = 0; g <= 9; g++) {
              for (let h = 0; h <= 9; h++) {
                total++
                if (match(a, b, c, d, e, f, g, h)) {
                  console.log(`
┌      ┐   ┌      ┐   ┌       ┐
  ${a}  ${b}   x   ${e}  ${f}   =   ${a}${e} ${b}${f} 
  ${c}  ${d}       ${g}  ${h}       ${c}${g} ${d}${h} 
└      ┘   └      ┘   └       ┘
`)
                  count++
                }
              }
            }
          }
        }
      }
    }
  }
}

console.log(`10 以内的矩阵共有 ${total} 个，可以使用快速算法的有 ${count} 个`)
```

计算结果显示：

```plain
10 以内的矩阵共有 100000000 个，可以使用快速算法的有 101 个
```

一些符合要求的结果：

```plain
┌      ┐   ┌      ┐   ┌       ┐
  0  0   x   0  0   =   00 00
  0  0       0  0       00 00
└      ┘   └      ┘   └       ┘

┌      ┐   ┌      ┐   ┌       ┐
  2  2   x   8  4   =   28 24
  3  2       6  8       36 28
└      ┘   └      ┘   └       ┘

┌      ┐   ┌      ┐   ┌       ┐
  2  2   x   4  4   =   24 24
  4  4       8  8       48 48
└      ┘   └      ┘   └       ┘

┌      ┐   ┌      ┐   ┌       ┐
  2  2   x   8  2   =   28 22
  6  3       6  9       66 39
└      ┘   └      ┘   └       ┘
```

也就是说，对于 10 以内的矩阵，使用快速算法有 **0.000101%** 的概率可以计算正确。

附：一个[矩阵在线计算器](https://matrixcalc.org/zh-CN/)。
