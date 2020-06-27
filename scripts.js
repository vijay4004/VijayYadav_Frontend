document.getElementById("plot").onclick = function() {myFunction()};

function myFunction() {
    try {
        h = $('#height').val()
        console.log(h);
        e = $('#slider11').val()/100
        t = math.sqrt(h/5)
  
        expression = h+"-5*x*x"
        var expr = math.compile(expression)
        var xValues = math.range(0, t, 0.01).toArray()
        var yValues = xValues.map(function (x) {
          return expr.evaluate({x: x})
        })
        var trace = {
          x: xValues,
          y: yValues,
          type: 'scatter'
        }
        var data = [trace]
        curr_t = t
        iter = 1;
        console.log(data)
        while (true) {
            next_t = curr_t + 2*math.pow(e,iter)*t
            expression = math.pow(e,iter)+"*10*"+t+"*(x-"+curr_t+")-5*(x-"+curr_t+")*(x-"+curr_t+")"
            expr = math.compile(expression)
            xValues = math.range(curr_t, next_t, 0.0001).toArray()
            yValues = xValues.map(function (x) {
              return expr.evaluate({x: x})
            })
            trace = {
              x: xValues,
              y: yValues,
              type: 'scatter'
            }
            data.push(trace)
            curr_t = next_t
            iter = iter + 1
            if ( math.pow(e,iter)*h < 1.0){
              break
            }
        }
        Plotly.newPlot('myChart', data)
        console.log('The number of bounces id: ' + iter)
      }
      catch (err) {
        console.error(err)
        alert(err)
      }
}

            var rangeslider = document.getElementById("slider11"); 
            var output = document.getElementById("demo"); 
            output.innerHTML = rangeslider.value/100; 
              
            rangeslider.oninput = function() { 
              output.innerHTML = this.value/100; 
            } 
