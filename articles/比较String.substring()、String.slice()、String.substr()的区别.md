# 比较String.substring()、String.slice()、String.substr()的区别
String.substring()、String.slice()、String.substr()这三者都能从String字符串中截取一部分，那么它们在使用上有什么不同么？

> slice() 方法提取一个字符串的一部分，并返回一新的字符串。

语法：`str.slice(start[, end])`<br>
slice() 提取从 start 到 end（不包括）之间的新字符串。

> substring() 方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。

语法：`str.substring(start[, end])`<br>
substring 提取从 start 到 end（不包括）之间的新字符串。

-- `substring` VS `slice` 相同：

- 如果 start == end，return ""。
- 如果省略 end，提取字符一直到字符串末尾。
- 如果任一参数大于 length，则被当作 length。

-- `substring` VS `slice` 不同：

`substring`
- 如果 start > end，则 substring 的执行效果就像两个参数调换了一样。
- 如果任一参数小于 0 或为 NaN，则被当作 0。

`slice`
- 如果 start > end，return ""。
- 如果任一参数为 NaN，则被当作 0。
- 如果任一参数为于小 0，则被当作((length - 该参数) > 0 ? (length - 该参数) : 0)。

> substr() 方法返回一个字符串中从指定位置开始到指定字符数的字符。

语法： `str.substr(start[, length])` <br>
substr 从 start 位置开始提取字符，提取 length 个字符（或直到字符串的末尾）。

- 如果 start >= length，return ""。
- 如果 start < 0，则被当作((length - 该参数) > 0 ? (length - 该参数) : 0)。
- 如果 length <= 0，return ""。
- 如果忽略 length，则 substr 提取字符，直到字符串末尾。

