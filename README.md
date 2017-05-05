## aligned-sum-operation

Aligned sum operation

## Install

```bash
$ npm install aligned-sum-operation
```

## Usage

```js
const perform_aligned_sum_operation = require('aligned-sum-operation')

perform_aligned_sum_operation(12,34.12045)
// => 46.12045

perform_aligned_sum_operation(12,12)
// => 24

perform_aligned_sum_operation(0.0000005,12.002004)
// => "12.0023453"

