# search-loader
> Search across webpack resources

## Installation
```bash
npm i --save-dev search-loader
```

## Usage
Add the search loader configuration to the beginning of _any_ loader chain to search among that file type

```javascript
const webpackConfiguration = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {loader: 'babel-loader'},
          {
            loader: 'search-loader',
            options: {
              regex: new RegExp(/test/, 'g'),
              output: path.resolve(__dirname, 'search/output.json'),
            },
          },
        ],
      },
      // ...
    ],
  },
  //...
}
```

### Options

- **regex**: A regular expression to apply to the source. Don't forget the 'g' flag if you want to find all matches
  within a source file.
- **output**: An absolute file path to store the search results.
