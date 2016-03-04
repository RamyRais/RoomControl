angular
  .module('RoomControlApp')
  .controller('indexCtrl', ['$scope', function ($scope) {

    $scope.handlers= {};
    $scope.handlers.rectangle = new drawRectangle();
    $scope.handlers.dragHandler = new dragHandler();
    $scope.drawType = '';
    $scope.switchNumber = 0;
    $scope.svgContainer = d3.select("#appendSVG").append("svg")
      .attr("width", 600)
      .attr("height", 500)
      .attr("style", "outline: thin solid black;")
      .on("mousedown", mouseEventHandler)
      .on("mouseup", mouseEventHandler)
      .on("mousemove", mouseEventHandler);

    $scope.clearLastDraw = function () {
      console.log($scope.handlers.rectangle.drawNumber);
      var number = $scope.handlers.rectangle.drawNumber;
      d3.select('#chart' + number).remove();
      if($scope.handlers.rectangle.drawNumber >0) {
        $scope.handlers.rectangle.drawNumber--;
      }
    };

    $scope.addSwitch = function () {
      $scope
        .svgContainer
        .append("image")
        .attr('id', 'switch' +$scope.switchNumber)
        .attr('data-type', 'switch')
        .attr("xlink:href", "assets/images/light_switch.jpg")
        .attr("x", "0")
        .attr("y", "0")
        .attr("width", "50")
        .attr("height", "50");
      $scope.switchNumber++;
    };

    $scope.dragMode = function () {
      $scope.drawType = 'dragHandler';
    };

    function mouseEventHandler () {
      //figure out how to call the functions
      if(d3.event) {
        var type = d3.event.type;
        if ($scope.drawType) {
          var func = $scope.handlers[$scope.drawType][type];//$scope.handlers[type];
          if (func) {
            func(d3.mouse(this));
          }
        }
      }
    }

    function dragHandler () {
      var tool = this;
      this.switchNumber = 0;

      this.mousedown = function (ev) {

        tool.started = true;
        tool.x0 = ev[0];
        tool.y0 = ev[1];
        //TODO figure out what image to select
        var switchs = d3.selectAll('image').data('switch');
        console.log(switchs);
      };
    }
    function drawRectangle () {
      var tool = this;
      this.started = false;
      this.number = 0;
      this.drawNumber = 0;

      this.mousedown = function (ev) {

        tool.started = true;
        tool.x0 = ev[0];
        tool.y0 = ev[1];
      };

      this.mousemove = function (ev, drawNumber) {
        if (!tool.started) {
          return;
        }

        var x = Math.min(ev[0], tool.x0),
          y = Math.min(ev[1], tool.y0),
          w = Math.abs(ev[0] - tool.x0),
          h = Math.abs(ev[1] - tool.y0);

        if (!w || !h) {
          return;
        }
        if(tool.started) {
          tool.number++;
          console.log(drawNumber === undefined ? tool.number : drawNumber);
          var number;
          if(drawNumber){
            number = drawNumber;
          } else {
            number = tool.number;
          }
          $scope.svgContainer
            .append("rect")
            .attr("x", x)
            .attr("y", y)
            .attr("width", w)
            .attr("height", h)
            .attr('id', 'chart' +number)
            .style("stroke", "#000")
            .style("stroke-width", "1px")
            .style("fill", "none");
          d3.select('#chart' + (tool.number - 1)).remove();
        }
      };

      this.mouseup = function (ev) {

        if (tool.started) {
          tool.drawNumber++;
          tool.mousemove(ev, tool.drawNumber);
          tool.number++;
          var x = Math.min(ev[0], tool.x0),
            y = Math.min(ev[1], tool.y0),
            w = Math.abs(ev[0] - tool.x0),
            h = Math.abs(ev[1] - tool.y0);

          tool.started = false;
        }
      };
    }

  }]);