// 流程控制分为两类：串行和并行

// 需要一个接着一个执行的任务叫作串行任务。创建一个目录并往里放一个文件的任务就是串行的。你不能在创建目录前往里放文件。
// 不需要一个接着一个执行的任务叫作并行任务。这些任务彼此之间开始和结束的时间并不重要，但在后续逻辑执行之前它们应该全部执行完。下载几个文件然后把它们压缩到一个zip 归档文件中就是并行任务。这些文件的下载可以同时进行，但在创建归档文件之前应该全部下载完。

setTimeout(() => {
  console.log("I execute first.");

  setTimeout(() => {
    console.log("I execute next.");

    setTimeout(() => {
      console.log("I execute last.");
    }, 100);
  }, 500);
}, 1000);

//实现串行化流程控制:为了用串行化流程控制让几个异步任务按顺序执行，需要先把这些任务按预期的执行顺序放到一个数组中。如图2 - 11 所示，这个数组将起到队列的作用：完成一个任务后按顺序从数组中取出下一个。
const async = require("async");
async.series([
  callback => {
    setTimeout(() => {
      console.log("I execute first.");
      callback();
    }, 1000);
  },
  callback => {
    setTimeout(() => {
      console.log("I execute next.");
      callback();
    }, 500);
  },
  callback => {
    setTimeout(() => {
      console.log("I execute last.");
      callback();
    }, 100);
  }
]);
