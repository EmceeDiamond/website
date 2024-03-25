
export default function AddStoreProvider(){
     
    var getJSON = function(url, callback) {
     var xhr = new XMLHttpRequest();
     xhr.open('GET', url, true);
     xhr.responseType = 'json';
     xhr.onload = function() {
       var status = xhr.status;
       if (status === 200) {
         callback(xhr.response, xhr.response);
       } else {
         callback(status, xhr.response);
       }
     };
     xhr.send();
     };

   const initialState_two = []
   getJSON('http://localhost:8000/providers', function(data){
     initialState_two.push(...data)   
   })
   
   return initialState_two
 }