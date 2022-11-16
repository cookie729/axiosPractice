$(function () {
  $('button').on('click', function () {
    axios.get('http://qiita.com/api/v2/items').then(function (res) {
      const ul = $('<ul>');
      for (const obj of res.data) {
        const li = $('<ul>');
        for (const obj of res.data) {
          const li = $('<li>').html(
            `${obj.title} <a href="${obj.url}">${obj.url}<a>`
          );
          ul.append(li);
        }
        $('.response-render-area').html(ul);
      }
      console.log(res.data);
    });
  });
});

setTimeout(function () {
  console.log('hello');
  setTimeout(function () {
    console.log('world');
    setTimeout(function () {
      console.log('world');
      setTimeout(function () {
        console.log('world');
      }, 1000);
    }, 1000);
  }, 1000);
}, 2000);

taskA()
  .then(function (res) {
    // Promiseオブジェクトの第一コールバックが実行された際はこちら
    // 今回だとtaskAでresolveが利用されたのでこちら側が実行される
    console.log(res);
  })
  .catch(function (err) {
    // 第二コールバックが実行された際はこちら
    console.log('エラー:' + err);
  });

// Promiseを体験しよう

// 処理A
function taskA() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('A');
    }, 1000);
  });
}

// 処理B
taskA()
  .then(function () {
    // 処理B
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log('B');
        resolve();
      }, 1000);
    });
  })
  .then(function () {
    // 処理C
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log('C');
        resolve();
      }, 1000);
    });
  })
  .then(function () {
    // 処理D
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log('D');
        resolve();
      }, 1000);
    });
  });
  // それぞれの処理をthenで繋げる




// リファクタ
  function taskA() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        console.log("A");
        // resolve();
        reject('タスクBでエラー')
      }, 1000);
    });
  }
  function taskB() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        console.log("B");
        resolve();
      }, 1000);
    });
  }
  function taskC() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        console.log("C");
        resolve();
      }, 1000);
    });
  }
  function taskD() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        console.log("D");
        resolve();
      }, 1000);
    });
  }
taskA().then(taskB).then(taskC).then(taskD);
