function task1(){
  return new Promise(function(resolve, reject) {
    if (true) {
      resolve("task 1")
    } else {
      reject()
    }
  });
}

function task2(){
  return new Promise(function(resolve, reject) {
    if (true) {
      resolve("task2")
    } else {
      reject()
    }
  });
}

function task3(){
  return new Promise(function(resolve, reject) {
    if (true) {
      resolve("task3")
    } else {
      reject()
    }
  });
}

task1().then(function(data){
  console.log(data);
  return task2();
}).then(function(data){
  console.log(data);
  return task3();
}).then(function(data){
  console.log(data);
}).catch(function(err){
  console.log(err);
});

Promise.all([task1(), task2(), task3()]).then(function(data){
  console.log(data);
}).catch(function(err){
  console.log(err);
})

function find(input, callback){
  var hasil = typeof(input)
  callback(hasil)
}

find("yoni", function(data){
  console.log(data);
})
