/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 305.0, "minX": 0.0, "maxY": 406.0, "series": [{"data": [[0.0, 305.0], [0.1, 305.0], [0.2, 305.0], [0.3, 305.0], [0.4, 305.0], [0.5, 305.0], [0.6, 305.0], [0.7, 305.0], [0.8, 305.0], [0.9, 308.0], [1.0, 308.0], [1.1, 308.0], [1.2, 308.0], [1.3, 308.0], [1.4, 308.0], [1.5, 308.0], [1.6, 308.0], [1.7, 309.0], [1.8, 309.0], [1.9, 309.0], [2.0, 309.0], [2.1, 309.0], [2.2, 309.0], [2.3, 309.0], [2.4, 309.0], [2.5, 314.0], [2.6, 314.0], [2.7, 314.0], [2.8, 314.0], [2.9, 314.0], [3.0, 314.0], [3.1, 314.0], [3.2, 314.0], [3.3, 314.0], [3.4, 316.0], [3.5, 316.0], [3.6, 316.0], [3.7, 316.0], [3.8, 316.0], [3.9, 316.0], [4.0, 316.0], [4.1, 316.0], [4.2, 316.0], [4.3, 316.0], [4.4, 316.0], [4.5, 316.0], [4.6, 316.0], [4.7, 316.0], [4.8, 316.0], [4.9, 316.0], [5.0, 316.0], [5.1, 316.0], [5.2, 316.0], [5.3, 316.0], [5.4, 316.0], [5.5, 316.0], [5.6, 316.0], [5.7, 316.0], [5.8, 316.0], [5.9, 316.0], [6.0, 316.0], [6.1, 316.0], [6.2, 316.0], [6.3, 316.0], [6.4, 316.0], [6.5, 316.0], [6.6, 316.0], [6.7, 317.0], [6.8, 317.0], [6.9, 317.0], [7.0, 317.0], [7.1, 317.0], [7.2, 317.0], [7.3, 317.0], [7.4, 317.0], [7.5, 318.0], [7.6, 318.0], [7.7, 318.0], [7.8, 318.0], [7.9, 318.0], [8.0, 318.0], [8.1, 318.0], [8.2, 318.0], [8.3, 318.0], [8.4, 318.0], [8.5, 318.0], [8.6, 318.0], [8.7, 318.0], [8.8, 318.0], [8.9, 318.0], [9.0, 318.0], [9.1, 318.0], [9.2, 318.0], [9.3, 318.0], [9.4, 318.0], [9.5, 318.0], [9.6, 318.0], [9.7, 318.0], [9.8, 318.0], [9.9, 318.0], [10.0, 318.0], [10.1, 318.0], [10.2, 318.0], [10.3, 318.0], [10.4, 318.0], [10.5, 318.0], [10.6, 318.0], [10.7, 318.0], [10.8, 318.0], [10.9, 318.0], [11.0, 318.0], [11.1, 318.0], [11.2, 318.0], [11.3, 318.0], [11.4, 318.0], [11.5, 318.0], [11.6, 318.0], [11.7, 319.0], [11.8, 319.0], [11.9, 319.0], [12.0, 319.0], [12.1, 319.0], [12.2, 319.0], [12.3, 319.0], [12.4, 319.0], [12.5, 319.0], [12.6, 320.0], [12.7, 320.0], [12.8, 320.0], [12.9, 320.0], [13.0, 320.0], [13.1, 320.0], [13.2, 320.0], [13.3, 320.0], [13.4, 321.0], [13.5, 321.0], [13.6, 321.0], [13.7, 321.0], [13.8, 321.0], [13.9, 321.0], [14.0, 321.0], [14.1, 321.0], [14.2, 321.0], [14.3, 321.0], [14.4, 321.0], [14.5, 321.0], [14.6, 321.0], [14.7, 321.0], [14.8, 321.0], [14.9, 321.0], [15.0, 321.0], [15.1, 321.0], [15.2, 321.0], [15.3, 321.0], [15.4, 321.0], [15.5, 321.0], [15.6, 321.0], [15.7, 321.0], [15.8, 321.0], [15.9, 321.0], [16.0, 321.0], [16.1, 321.0], [16.2, 321.0], [16.3, 321.0], [16.4, 321.0], [16.5, 321.0], [16.6, 321.0], [16.7, 321.0], [16.8, 321.0], [16.9, 321.0], [17.0, 321.0], [17.1, 321.0], [17.2, 321.0], [17.3, 321.0], [17.4, 321.0], [17.5, 321.0], [17.6, 321.0], [17.7, 321.0], [17.8, 321.0], [17.9, 321.0], [18.0, 321.0], [18.1, 321.0], [18.2, 321.0], [18.3, 321.0], [18.4, 322.0], [18.5, 322.0], [18.6, 322.0], [18.7, 322.0], [18.8, 322.0], [18.9, 322.0], [19.0, 322.0], [19.1, 322.0], [19.2, 322.0], [19.3, 322.0], [19.4, 322.0], [19.5, 322.0], [19.6, 322.0], [19.7, 322.0], [19.8, 322.0], [19.9, 322.0], [20.0, 322.0], [20.1, 322.0], [20.2, 322.0], [20.3, 322.0], [20.4, 322.0], [20.5, 322.0], [20.6, 322.0], [20.7, 322.0], [20.8, 322.0], [20.9, 322.0], [21.0, 322.0], [21.1, 322.0], [21.2, 322.0], [21.3, 322.0], [21.4, 322.0], [21.5, 322.0], [21.6, 322.0], [21.7, 322.0], [21.8, 322.0], [21.9, 322.0], [22.0, 322.0], [22.1, 322.0], [22.2, 322.0], [22.3, 322.0], [22.4, 322.0], [22.5, 322.0], [22.6, 322.0], [22.7, 322.0], [22.8, 322.0], [22.9, 322.0], [23.0, 322.0], [23.1, 322.0], [23.2, 322.0], [23.3, 322.0], [23.4, 322.0], [23.5, 322.0], [23.6, 322.0], [23.7, 322.0], [23.8, 322.0], [23.9, 322.0], [24.0, 322.0], [24.1, 322.0], [24.2, 322.0], [24.3, 322.0], [24.4, 322.0], [24.5, 322.0], [24.6, 322.0], [24.7, 322.0], [24.8, 322.0], [24.9, 322.0], [25.0, 322.0], [25.1, 323.0], [25.2, 323.0], [25.3, 323.0], [25.4, 323.0], [25.5, 323.0], [25.6, 323.0], [25.7, 323.0], [25.8, 323.0], [25.9, 323.0], [26.0, 323.0], [26.1, 323.0], [26.2, 323.0], [26.3, 323.0], [26.4, 323.0], [26.5, 323.0], [26.6, 323.0], [26.7, 324.0], [26.8, 324.0], [26.9, 324.0], [27.0, 324.0], [27.1, 324.0], [27.2, 324.0], [27.3, 324.0], [27.4, 324.0], [27.5, 324.0], [27.6, 324.0], [27.7, 324.0], [27.8, 324.0], [27.9, 324.0], [28.0, 324.0], [28.1, 324.0], [28.2, 324.0], [28.3, 324.0], [28.4, 324.0], [28.5, 324.0], [28.6, 324.0], [28.7, 324.0], [28.8, 324.0], [28.9, 324.0], [29.0, 324.0], [29.1, 324.0], [29.2, 324.0], [29.3, 324.0], [29.4, 324.0], [29.5, 324.0], [29.6, 324.0], [29.7, 324.0], [29.8, 324.0], [29.9, 324.0], [30.0, 324.0], [30.1, 324.0], [30.2, 324.0], [30.3, 324.0], [30.4, 324.0], [30.5, 324.0], [30.6, 324.0], [30.7, 324.0], [30.8, 324.0], [30.9, 324.0], [31.0, 324.0], [31.1, 324.0], [31.2, 324.0], [31.3, 324.0], [31.4, 324.0], [31.5, 324.0], [31.6, 324.0], [31.7, 324.0], [31.8, 324.0], [31.9, 324.0], [32.0, 324.0], [32.1, 324.0], [32.2, 324.0], [32.3, 324.0], [32.4, 324.0], [32.5, 324.0], [32.6, 324.0], [32.7, 324.0], [32.8, 324.0], [32.9, 324.0], [33.0, 324.0], [33.1, 324.0], [33.2, 324.0], [33.3, 324.0], [33.4, 324.0], [33.5, 324.0], [33.6, 324.0], [33.7, 324.0], [33.8, 324.0], [33.9, 324.0], [34.0, 324.0], [34.1, 324.0], [34.2, 324.0], [34.3, 324.0], [34.4, 324.0], [34.5, 324.0], [34.6, 324.0], [34.7, 324.0], [34.8, 324.0], [34.9, 324.0], [35.0, 324.0], [35.1, 325.0], [35.2, 325.0], [35.3, 325.0], [35.4, 325.0], [35.5, 325.0], [35.6, 325.0], [35.7, 325.0], [35.8, 325.0], [35.9, 325.0], [36.0, 325.0], [36.1, 325.0], [36.2, 325.0], [36.3, 325.0], [36.4, 325.0], [36.5, 325.0], [36.6, 325.0], [36.7, 325.0], [36.8, 325.0], [36.9, 325.0], [37.0, 325.0], [37.1, 325.0], [37.2, 325.0], [37.3, 325.0], [37.4, 325.0], [37.5, 325.0], [37.6, 325.0], [37.7, 325.0], [37.8, 325.0], [37.9, 325.0], [38.0, 325.0], [38.1, 325.0], [38.2, 325.0], [38.3, 325.0], [38.4, 325.0], [38.5, 325.0], [38.6, 325.0], [38.7, 325.0], [38.8, 325.0], [38.9, 325.0], [39.0, 325.0], [39.1, 325.0], [39.2, 325.0], [39.3, 325.0], [39.4, 325.0], [39.5, 325.0], [39.6, 325.0], [39.7, 325.0], [39.8, 325.0], [39.9, 325.0], [40.0, 325.0], [40.1, 325.0], [40.2, 325.0], [40.3, 325.0], [40.4, 325.0], [40.5, 325.0], [40.6, 325.0], [40.7, 325.0], [40.8, 325.0], [40.9, 326.0], [41.0, 326.0], [41.1, 326.0], [41.2, 326.0], [41.3, 326.0], [41.4, 326.0], [41.5, 326.0], [41.6, 326.0], [41.7, 326.0], [41.8, 326.0], [41.9, 326.0], [42.0, 326.0], [42.1, 326.0], [42.2, 326.0], [42.3, 326.0], [42.4, 326.0], [42.5, 326.0], [42.6, 326.0], [42.7, 326.0], [42.8, 326.0], [42.9, 326.0], [43.0, 326.0], [43.1, 326.0], [43.2, 326.0], [43.3, 326.0], [43.4, 326.0], [43.5, 326.0], [43.6, 326.0], [43.7, 326.0], [43.8, 326.0], [43.9, 326.0], [44.0, 326.0], [44.1, 326.0], [44.2, 327.0], [44.3, 327.0], [44.4, 327.0], [44.5, 327.0], [44.6, 327.0], [44.7, 327.0], [44.8, 327.0], [44.9, 327.0], [45.0, 327.0], [45.1, 327.0], [45.2, 327.0], [45.3, 327.0], [45.4, 327.0], [45.5, 327.0], [45.6, 327.0], [45.7, 327.0], [45.8, 327.0], [45.9, 327.0], [46.0, 327.0], [46.1, 327.0], [46.2, 327.0], [46.3, 327.0], [46.4, 327.0], [46.5, 327.0], [46.6, 327.0], [46.7, 327.0], [46.8, 327.0], [46.9, 327.0], [47.0, 327.0], [47.1, 327.0], [47.2, 327.0], [47.3, 327.0], [47.4, 327.0], [47.5, 327.0], [47.6, 327.0], [47.7, 327.0], [47.8, 327.0], [47.9, 327.0], [48.0, 327.0], [48.1, 327.0], [48.2, 327.0], [48.3, 327.0], [48.4, 328.0], [48.5, 328.0], [48.6, 328.0], [48.7, 328.0], [48.8, 328.0], [48.9, 328.0], [49.0, 328.0], [49.1, 328.0], [49.2, 328.0], [49.3, 328.0], [49.4, 328.0], [49.5, 328.0], [49.6, 328.0], [49.7, 328.0], [49.8, 328.0], [49.9, 328.0], [50.0, 328.0], [50.1, 328.0], [50.2, 328.0], [50.3, 328.0], [50.4, 328.0], [50.5, 328.0], [50.6, 328.0], [50.7, 328.0], [50.8, 328.0], [50.9, 328.0], [51.0, 328.0], [51.1, 328.0], [51.2, 328.0], [51.3, 328.0], [51.4, 328.0], [51.5, 328.0], [51.6, 328.0], [51.7, 328.0], [51.8, 328.0], [51.9, 328.0], [52.0, 328.0], [52.1, 328.0], [52.2, 328.0], [52.3, 328.0], [52.4, 328.0], [52.5, 328.0], [52.6, 328.0], [52.7, 328.0], [52.8, 328.0], [52.9, 328.0], [53.0, 328.0], [53.1, 328.0], [53.2, 328.0], [53.3, 328.0], [53.4, 328.0], [53.5, 328.0], [53.6, 328.0], [53.7, 328.0], [53.8, 328.0], [53.9, 328.0], [54.0, 328.0], [54.1, 328.0], [54.2, 329.0], [54.3, 329.0], [54.4, 329.0], [54.5, 329.0], [54.6, 329.0], [54.7, 329.0], [54.8, 329.0], [54.9, 329.0], [55.0, 329.0], [55.1, 329.0], [55.2, 329.0], [55.3, 329.0], [55.4, 329.0], [55.5, 329.0], [55.6, 329.0], [55.7, 329.0], [55.8, 329.0], [55.9, 329.0], [56.0, 329.0], [56.1, 329.0], [56.2, 329.0], [56.3, 329.0], [56.4, 329.0], [56.5, 329.0], [56.6, 329.0], [56.7, 329.0], [56.8, 329.0], [56.9, 329.0], [57.0, 329.0], [57.1, 329.0], [57.2, 329.0], [57.3, 329.0], [57.4, 329.0], [57.5, 329.0], [57.6, 329.0], [57.7, 329.0], [57.8, 329.0], [57.9, 329.0], [58.0, 329.0], [58.1, 329.0], [58.2, 329.0], [58.3, 329.0], [58.4, 329.0], [58.5, 329.0], [58.6, 329.0], [58.7, 329.0], [58.8, 329.0], [58.9, 329.0], [59.0, 329.0], [59.1, 329.0], [59.2, 329.0], [59.3, 329.0], [59.4, 329.0], [59.5, 329.0], [59.6, 329.0], [59.7, 329.0], [59.8, 329.0], [59.9, 329.0], [60.0, 329.0], [60.1, 329.0], [60.2, 329.0], [60.3, 329.0], [60.4, 329.0], [60.5, 329.0], [60.6, 329.0], [60.7, 329.0], [60.8, 329.0], [60.9, 329.0], [61.0, 329.0], [61.1, 329.0], [61.2, 329.0], [61.3, 329.0], [61.4, 329.0], [61.5, 329.0], [61.6, 329.0], [61.7, 329.0], [61.8, 329.0], [61.9, 329.0], [62.0, 329.0], [62.1, 329.0], [62.2, 329.0], [62.3, 329.0], [62.4, 329.0], [62.5, 329.0], [62.6, 329.0], [62.7, 329.0], [62.8, 329.0], [62.9, 329.0], [63.0, 329.0], [63.1, 329.0], [63.2, 329.0], [63.3, 329.0], [63.4, 330.0], [63.5, 330.0], [63.6, 330.0], [63.7, 330.0], [63.8, 330.0], [63.9, 330.0], [64.0, 330.0], [64.1, 330.0], [64.2, 330.0], [64.3, 330.0], [64.4, 330.0], [64.5, 330.0], [64.6, 330.0], [64.7, 330.0], [64.8, 330.0], [64.9, 330.0], [65.0, 330.0], [65.1, 330.0], [65.2, 330.0], [65.3, 330.0], [65.4, 330.0], [65.5, 330.0], [65.6, 330.0], [65.7, 330.0], [65.8, 330.0], [65.9, 330.0], [66.0, 330.0], [66.1, 330.0], [66.2, 330.0], [66.3, 330.0], [66.4, 330.0], [66.5, 330.0], [66.6, 330.0], [66.7, 330.0], [66.8, 330.0], [66.9, 330.0], [67.0, 330.0], [67.1, 330.0], [67.2, 330.0], [67.3, 330.0], [67.4, 330.0], [67.5, 330.0], [67.6, 330.0], [67.7, 330.0], [67.8, 330.0], [67.9, 330.0], [68.0, 330.0], [68.1, 330.0], [68.2, 330.0], [68.3, 330.0], [68.4, 331.0], [68.5, 331.0], [68.6, 331.0], [68.7, 331.0], [68.8, 331.0], [68.9, 331.0], [69.0, 331.0], [69.1, 331.0], [69.2, 331.0], [69.3, 331.0], [69.4, 331.0], [69.5, 331.0], [69.6, 331.0], [69.7, 331.0], [69.8, 331.0], [69.9, 331.0], [70.0, 331.0], [70.1, 331.0], [70.2, 331.0], [70.3, 331.0], [70.4, 331.0], [70.5, 331.0], [70.6, 331.0], [70.7, 331.0], [70.8, 331.0], [70.9, 331.0], [71.0, 331.0], [71.1, 331.0], [71.2, 331.0], [71.3, 331.0], [71.4, 331.0], [71.5, 331.0], [71.6, 331.0], [71.7, 331.0], [71.8, 331.0], [71.9, 331.0], [72.0, 331.0], [72.1, 331.0], [72.2, 331.0], [72.3, 331.0], [72.4, 331.0], [72.5, 331.0], [72.6, 332.0], [72.7, 332.0], [72.8, 332.0], [72.9, 332.0], [73.0, 332.0], [73.1, 332.0], [73.2, 332.0], [73.3, 332.0], [73.4, 333.0], [73.5, 333.0], [73.6, 333.0], [73.7, 333.0], [73.8, 333.0], [73.9, 333.0], [74.0, 333.0], [74.1, 333.0], [74.2, 333.0], [74.3, 333.0], [74.4, 333.0], [74.5, 333.0], [74.6, 333.0], [74.7, 333.0], [74.8, 333.0], [74.9, 333.0], [75.0, 333.0], [75.1, 333.0], [75.2, 333.0], [75.3, 333.0], [75.4, 333.0], [75.5, 333.0], [75.6, 333.0], [75.7, 333.0], [75.8, 333.0], [75.9, 333.0], [76.0, 333.0], [76.1, 333.0], [76.2, 333.0], [76.3, 333.0], [76.4, 333.0], [76.5, 333.0], [76.6, 333.0], [76.7, 334.0], [76.8, 334.0], [76.9, 334.0], [77.0, 334.0], [77.1, 334.0], [77.2, 334.0], [77.3, 334.0], [77.4, 334.0], [77.5, 334.0], [77.6, 334.0], [77.7, 334.0], [77.8, 334.0], [77.9, 334.0], [78.0, 334.0], [78.1, 334.0], [78.2, 334.0], [78.3, 334.0], [78.4, 335.0], [78.5, 335.0], [78.6, 335.0], [78.7, 335.0], [78.8, 335.0], [78.9, 335.0], [79.0, 335.0], [79.1, 335.0], [79.2, 336.0], [79.3, 336.0], [79.4, 336.0], [79.5, 336.0], [79.6, 336.0], [79.7, 336.0], [79.8, 336.0], [79.9, 336.0], [80.0, 336.0], [80.1, 336.0], [80.2, 336.0], [80.3, 336.0], [80.4, 336.0], [80.5, 336.0], [80.6, 336.0], [80.7, 336.0], [80.8, 336.0], [80.9, 337.0], [81.0, 337.0], [81.1, 337.0], [81.2, 337.0], [81.3, 337.0], [81.4, 337.0], [81.5, 337.0], [81.6, 337.0], [81.7, 338.0], [81.8, 338.0], [81.9, 338.0], [82.0, 338.0], [82.1, 338.0], [82.2, 338.0], [82.3, 338.0], [82.4, 338.0], [82.5, 340.0], [82.6, 340.0], [82.7, 340.0], [82.8, 340.0], [82.9, 340.0], [83.0, 340.0], [83.1, 340.0], [83.2, 340.0], [83.3, 340.0], [83.4, 341.0], [83.5, 341.0], [83.6, 341.0], [83.7, 341.0], [83.8, 341.0], [83.9, 341.0], [84.0, 341.0], [84.1, 341.0], [84.2, 342.0], [84.3, 342.0], [84.4, 342.0], [84.5, 342.0], [84.6, 342.0], [84.7, 342.0], [84.8, 342.0], [84.9, 342.0], [85.0, 345.0], [85.1, 345.0], [85.2, 345.0], [85.3, 345.0], [85.4, 345.0], [85.5, 345.0], [85.6, 345.0], [85.7, 345.0], [85.8, 345.0], [85.9, 348.0], [86.0, 348.0], [86.1, 348.0], [86.2, 348.0], [86.3, 348.0], [86.4, 348.0], [86.5, 348.0], [86.6, 348.0], [86.7, 348.0], [86.8, 348.0], [86.9, 348.0], [87.0, 348.0], [87.1, 348.0], [87.2, 348.0], [87.3, 348.0], [87.4, 348.0], [87.5, 350.0], [87.6, 350.0], [87.7, 350.0], [87.8, 350.0], [87.9, 350.0], [88.0, 350.0], [88.1, 350.0], [88.2, 350.0], [88.3, 350.0], [88.4, 351.0], [88.5, 351.0], [88.6, 351.0], [88.7, 351.0], [88.8, 351.0], [88.9, 351.0], [89.0, 351.0], [89.1, 351.0], [89.2, 352.0], [89.3, 352.0], [89.4, 352.0], [89.5, 352.0], [89.6, 352.0], [89.7, 352.0], [89.8, 352.0], [89.9, 352.0], [90.0, 353.0], [90.1, 353.0], [90.2, 353.0], [90.3, 353.0], [90.4, 353.0], [90.5, 353.0], [90.6, 353.0], [90.7, 353.0], [90.8, 353.0], [90.9, 353.0], [91.0, 353.0], [91.1, 353.0], [91.2, 353.0], [91.3, 353.0], [91.4, 353.0], [91.5, 353.0], [91.6, 353.0], [91.7, 355.0], [91.8, 355.0], [91.9, 355.0], [92.0, 355.0], [92.1, 355.0], [92.2, 355.0], [92.3, 355.0], [92.4, 355.0], [92.5, 362.0], [92.6, 362.0], [92.7, 362.0], [92.8, 362.0], [92.9, 362.0], [93.0, 362.0], [93.1, 362.0], [93.2, 362.0], [93.3, 362.0], [93.4, 363.0], [93.5, 363.0], [93.6, 363.0], [93.7, 363.0], [93.8, 363.0], [93.9, 363.0], [94.0, 363.0], [94.1, 363.0], [94.2, 365.0], [94.3, 365.0], [94.4, 365.0], [94.5, 365.0], [94.6, 365.0], [94.7, 365.0], [94.8, 365.0], [94.9, 365.0], [95.0, 366.0], [95.1, 366.0], [95.2, 366.0], [95.3, 366.0], [95.4, 366.0], [95.5, 366.0], [95.6, 366.0], [95.7, 366.0], [95.8, 366.0], [95.9, 367.0], [96.0, 367.0], [96.1, 367.0], [96.2, 367.0], [96.3, 367.0], [96.4, 367.0], [96.5, 367.0], [96.6, 367.0], [96.7, 368.0], [96.8, 368.0], [96.9, 368.0], [97.0, 368.0], [97.1, 368.0], [97.2, 368.0], [97.3, 368.0], [97.4, 368.0], [97.5, 371.0], [97.6, 371.0], [97.7, 371.0], [97.8, 371.0], [97.9, 371.0], [98.0, 371.0], [98.1, 371.0], [98.2, 371.0], [98.3, 371.0], [98.4, 384.0], [98.5, 384.0], [98.6, 384.0], [98.7, 384.0], [98.8, 384.0], [98.9, 384.0], [99.0, 384.0], [99.1, 384.0], [99.2, 406.0], [99.3, 406.0], [99.4, 406.0], [99.5, 406.0], [99.6, 406.0], [99.7, 406.0], [99.8, 406.0], [99.9, 406.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 2.0, "minX": 300.0, "maxY": 238.0, "series": [{"data": [[300.0, 238.0], [400.0, 2.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 400.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 240.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 240.0, "series": [{"data": [[0.0, 240.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 4.9E-324, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 345.74999999999994, "minX": 1.74794658E12, "maxY": 400.0, "series": [{"data": [[1.74794724E12, 400.0], [1.74794694E12, 400.0], [1.74794784E12, 400.0], [1.74794754E12, 400.0], [1.74794796E12, 400.0], [1.74794664E12, 400.0], [1.74794766E12, 400.0], [1.74794826E12, 400.0], [1.74794838E12, 400.0], [1.74794736E12, 400.0], [1.74794676E12, 400.0], [1.74794706E12, 400.0], [1.74794748E12, 400.0], [1.74794718E12, 400.0], [1.74794808E12, 400.0], [1.74794778E12, 400.0], [1.74794658E12, 345.74999999999994], [1.7479482E12, 400.0], [1.74794688E12, 400.0], [1.747947E12, 400.0], [1.7479467E12, 400.0], [1.7479476E12, 400.0], [1.7479473E12, 400.0], [1.74794772E12, 400.0], [1.74794742E12, 400.0], [1.74794832E12, 400.0], [1.74794802E12, 400.0], [1.74794682E12, 400.0], [1.74794814E12, 400.0], [1.74794712E12, 400.0]], "isOverall": false, "label": "LoadTest", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74794838E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 325.0, "minX": 185.0, "maxY": 406.0, "series": [{"data": [[185.0, 406.0], [398.0, 325.0], [400.0, 330.60169491525414]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[398.19166666666666, 331.18333333333305]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 400.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 8.7, "minX": 1.74794658E12, "maxY": 219.56666666666666, "series": [{"data": [[1.74794724E12, 54.9], [1.74794694E12, 54.86666666666667], [1.74794784E12, 123.53333333333333], [1.74794754E12, 41.2], [1.74794796E12, 27.433333333333334], [1.74794664E12, 41.2], [1.74794766E12, 219.56666666666666], [1.74794826E12, 27.466666666666665], [1.74794838E12, 27.466666666666665], [1.74794736E12, 54.9], [1.74794676E12, 54.86666666666667], [1.74794706E12, 41.2], [1.74794748E12, 41.06666666666667], [1.74794718E12, 27.366666666666667], [1.74794808E12, 13.733333333333333], [1.74794778E12, 13.666666666666666], [1.74794658E12, 54.9], [1.7479482E12, 82.36666666666666], [1.74794688E12, 27.433333333333334], [1.747947E12, 41.13333333333333], [1.7479467E12, 41.166666666666664], [1.7479476E12, 82.3], [1.7479473E12, 41.13333333333333], [1.74794772E12, 137.16666666666666], [1.74794742E12, 27.433333333333334], [1.74794832E12, 68.5], [1.74794802E12, 41.166666666666664], [1.74794682E12, 41.06666666666667], [1.74794814E12, 54.833333333333336], [1.74794712E12, 41.13333333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.74794724E12, 34.8], [1.74794694E12, 34.8], [1.74794784E12, 78.3], [1.74794754E12, 26.1], [1.74794796E12, 17.4], [1.74794664E12, 26.1], [1.74794766E12, 139.2], [1.74794826E12, 17.4], [1.74794838E12, 17.4], [1.74794736E12, 34.8], [1.74794676E12, 34.8], [1.74794706E12, 26.1], [1.74794748E12, 26.1], [1.74794718E12, 17.4], [1.74794808E12, 8.7], [1.74794778E12, 8.7], [1.74794658E12, 34.8], [1.7479482E12, 52.2], [1.74794688E12, 17.4], [1.747947E12, 26.1], [1.7479467E12, 26.1], [1.7479476E12, 52.2], [1.7479473E12, 26.1], [1.74794772E12, 87.0], [1.74794742E12, 17.4], [1.74794832E12, 43.5], [1.74794802E12, 26.1], [1.74794682E12, 26.1], [1.74794814E12, 34.8], [1.74794712E12, 26.1]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74794838E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 319.5, "minX": 1.74794658E12, "maxY": 355.75, "series": [{"data": [[1.74794724E12, 326.0], [1.74794694E12, 330.75], [1.74794784E12, 322.55555555555554], [1.74794754E12, 346.33333333333337], [1.74794796E12, 322.5], [1.74794664E12, 330.0], [1.74794766E12, 330.4374999999999], [1.74794826E12, 326.0], [1.74794838E12, 319.5], [1.74794736E12, 335.49999999999994], [1.74794676E12, 340.5], [1.74794706E12, 346.33333333333337], [1.74794748E12, 332.0], [1.74794718E12, 319.5], [1.74794808E12, 322.0], [1.74794778E12, 327.0], [1.74794658E12, 355.75], [1.7479482E12, 322.16666666666663], [1.74794688E12, 328.5], [1.747947E12, 330.6666666666667], [1.7479467E12, 354.66666666666663], [1.7479476E12, 327.3333333333333], [1.7479473E12, 341.6666666666667], [1.74794772E12, 331.79999999999995], [1.74794742E12, 332.0], [1.74794832E12, 320.4], [1.74794802E12, 327.0], [1.74794682E12, 349.0], [1.74794814E12, 322.5], [1.74794712E12, 324.3333333333333]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74794838E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 319.5, "minX": 1.74794658E12, "maxY": 354.75, "series": [{"data": [[1.74794724E12, 325.75], [1.74794694E12, 330.5], [1.74794784E12, 322.55555555555554], [1.74794754E12, 346.33333333333337], [1.74794796E12, 322.5], [1.74794664E12, 330.0], [1.74794766E12, 330.4374999999999], [1.74794826E12, 326.0], [1.74794838E12, 319.5], [1.74794736E12, 335.49999999999994], [1.74794676E12, 340.5], [1.74794706E12, 346.33333333333337], [1.74794748E12, 332.0], [1.74794718E12, 319.5], [1.74794808E12, 322.0], [1.74794778E12, 327.0], [1.74794658E12, 354.75], [1.7479482E12, 322.0], [1.74794688E12, 328.5], [1.747947E12, 330.6666666666667], [1.7479467E12, 354.66666666666663], [1.7479476E12, 327.3333333333333], [1.7479473E12, 341.6666666666667], [1.74794772E12, 331.79999999999995], [1.74794742E12, 332.0], [1.74794832E12, 320.4], [1.74794802E12, 326.6666666666667], [1.74794682E12, 349.0], [1.74794814E12, 322.5], [1.74794712E12, 324.3333333333333]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74794838E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.74794658E12, "maxY": 9.5, "series": [{"data": [[1.74794724E12, 0.5], [1.74794694E12, 0.25000000000000006], [1.74794784E12, 0.44444444444444436], [1.74794754E12, 0.6666666666666667], [1.74794796E12, 0.5], [1.74794664E12, 0.33333333333333337], [1.74794766E12, 0.6250000000000001], [1.74794826E12, 0.5], [1.74794838E12, 0.0], [1.74794736E12, 0.25000000000000006], [1.74794676E12, 0.5], [1.74794706E12, 0.33333333333333337], [1.74794748E12, 0.6666666666666667], [1.74794718E12, 1.0], [1.74794808E12, 1.0], [1.74794778E12, 0.0], [1.74794658E12, 9.5], [1.7479482E12, 0.16666666666666666], [1.74794688E12, 0.0], [1.747947E12, 0.6666666666666667], [1.7479467E12, 0.6666666666666667], [1.7479476E12, 0.5], [1.7479473E12, 0.6666666666666666], [1.74794772E12, 0.30000000000000004], [1.74794742E12, 1.0], [1.74794832E12, 0.7999999999999999], [1.74794802E12, 0.6666666666666667], [1.74794682E12, 0.33333333333333337], [1.74794814E12, 0.5], [1.74794712E12, 0.33333333333333337]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74794838E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 305.0, "minX": 1.74794658E12, "maxY": 406.0, "series": [{"data": [[1.74794724E12, 331.0], [1.74794694E12, 353.0], [1.74794784E12, 326.0], [1.74794754E12, 368.0], [1.74794796E12, 323.0], [1.74794664E12, 340.0], [1.74794766E12, 367.0], [1.74794826E12, 328.0], [1.74794838E12, 321.0], [1.74794736E12, 363.0], [1.74794676E12, 371.0], [1.74794706E12, 362.0], [1.74794748E12, 342.0], [1.74794718E12, 330.0], [1.74794808E12, 322.0], [1.74794778E12, 327.0], [1.74794658E12, 406.0], [1.7479482E12, 338.0], [1.74794688E12, 330.0], [1.747947E12, 331.0], [1.7479467E12, 384.0], [1.7479476E12, 332.0], [1.7479473E12, 355.0], [1.74794772E12, 348.0], [1.74794742E12, 336.0], [1.74794832E12, 330.0], [1.74794802E12, 333.0], [1.74794682E12, 366.0], [1.74794814E12, 325.0], [1.74794712E12, 330.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.74794724E12, 331.0], [1.74794694E12, 353.0], [1.74794784E12, 326.0], [1.74794754E12, 368.0], [1.74794796E12, 323.0], [1.74794664E12, 340.0], [1.74794766E12, 353.0], [1.74794826E12, 328.0], [1.74794838E12, 321.0], [1.74794736E12, 363.0], [1.74794676E12, 371.0], [1.74794706E12, 362.0], [1.74794748E12, 342.0], [1.74794718E12, 330.0], [1.74794808E12, 322.0], [1.74794778E12, 327.0], [1.74794658E12, 406.0], [1.7479482E12, 338.0], [1.74794688E12, 330.0], [1.747947E12, 331.0], [1.7479467E12, 384.0], [1.7479476E12, 332.0], [1.7479473E12, 355.0], [1.74794772E12, 346.50000000000006], [1.74794742E12, 336.0], [1.74794832E12, 330.0], [1.74794802E12, 333.0], [1.74794682E12, 366.0], [1.74794814E12, 325.0], [1.74794712E12, 330.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.74794724E12, 331.0], [1.74794694E12, 353.0], [1.74794784E12, 326.0], [1.74794754E12, 368.0], [1.74794796E12, 323.0], [1.74794664E12, 340.0], [1.74794766E12, 367.0], [1.74794826E12, 328.0], [1.74794838E12, 321.0], [1.74794736E12, 363.0], [1.74794676E12, 371.0], [1.74794706E12, 362.0], [1.74794748E12, 342.0], [1.74794718E12, 330.0], [1.74794808E12, 322.0], [1.74794778E12, 327.0], [1.74794658E12, 406.0], [1.7479482E12, 338.0], [1.74794688E12, 330.0], [1.747947E12, 331.0], [1.7479467E12, 384.0], [1.7479476E12, 332.0], [1.7479473E12, 355.0], [1.74794772E12, 348.0], [1.74794742E12, 336.0], [1.74794832E12, 330.0], [1.74794802E12, 333.0], [1.74794682E12, 366.0], [1.74794814E12, 325.0], [1.74794712E12, 330.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.74794724E12, 331.0], [1.74794694E12, 353.0], [1.74794784E12, 326.0], [1.74794754E12, 368.0], [1.74794796E12, 323.0], [1.74794664E12, 340.0], [1.74794766E12, 367.0], [1.74794826E12, 328.0], [1.74794838E12, 321.0], [1.74794736E12, 363.0], [1.74794676E12, 371.0], [1.74794706E12, 362.0], [1.74794748E12, 342.0], [1.74794718E12, 330.0], [1.74794808E12, 322.0], [1.74794778E12, 327.0], [1.74794658E12, 406.0], [1.7479482E12, 338.0], [1.74794688E12, 330.0], [1.747947E12, 331.0], [1.7479467E12, 384.0], [1.7479476E12, 332.0], [1.7479473E12, 355.0], [1.74794772E12, 348.0], [1.74794742E12, 336.0], [1.74794832E12, 330.0], [1.74794802E12, 333.0], [1.74794682E12, 366.0], [1.74794814E12, 325.0], [1.74794712E12, 330.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.74794724E12, 324.0], [1.74794694E12, 322.0], [1.74794784E12, 318.0], [1.74794754E12, 326.0], [1.74794796E12, 322.0], [1.74794664E12, 324.0], [1.74794766E12, 316.0], [1.74794826E12, 324.0], [1.74794838E12, 318.0], [1.74794736E12, 308.0], [1.74794676E12, 328.0], [1.74794706E12, 329.0], [1.74794748E12, 326.0], [1.74794718E12, 309.0], [1.74794808E12, 322.0], [1.74794778E12, 327.0], [1.74794658E12, 325.0], [1.7479482E12, 305.0], [1.74794688E12, 327.0], [1.747947E12, 330.0], [1.7479467E12, 328.0], [1.7479476E12, 321.0], [1.7479473E12, 329.0], [1.74794772E12, 327.0], [1.74794742E12, 328.0], [1.74794832E12, 316.0], [1.74794802E12, 324.0], [1.74794682E12, 331.0], [1.74794814E12, 321.0], [1.74794712E12, 314.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.74794724E12, 324.5], [1.74794694E12, 324.0], [1.74794784E12, 322.0], [1.74794754E12, 345.0], [1.74794796E12, 322.5], [1.74794664E12, 326.0], [1.74794766E12, 326.0], [1.74794826E12, 326.0], [1.74794838E12, 319.5], [1.74794736E12, 335.5], [1.74794676E12, 331.5], [1.74794706E12, 348.0], [1.74794748E12, 328.0], [1.74794718E12, 319.5], [1.74794808E12, 322.0], [1.74794778E12, 327.0], [1.74794658E12, 346.0], [1.7479482E12, 318.5], [1.74794688E12, 328.5], [1.747947E12, 331.0], [1.7479467E12, 352.0], [1.7479476E12, 329.0], [1.7479473E12, 341.0], [1.74794772E12, 329.5], [1.74794742E12, 332.0], [1.74794832E12, 318.0], [1.74794802E12, 324.0], [1.74794682E12, 350.0], [1.74794814E12, 322.0], [1.74794712E12, 329.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74794838E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 327.0, "minX": 2.0, "maxY": 328.0, "series": [{"data": [[2.0, 327.0], [4.0, 328.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 4.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 327.0, "minX": 2.0, "maxY": 328.0, "series": [{"data": [[2.0, 327.0], [4.0, 328.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 4.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.74794658E12, "maxY": 0.5666666666666667, "series": [{"data": [[1.74794724E12, 0.13333333333333333], [1.74794694E12, 0.13333333333333333], [1.74794784E12, 0.3], [1.74794754E12, 0.1], [1.74794796E12, 0.06666666666666667], [1.74794664E12, 0.1], [1.74794766E12, 0.5666666666666667], [1.74794826E12, 0.06666666666666667], [1.74794838E12, 0.06666666666666667], [1.74794736E12, 0.13333333333333333], [1.74794676E12, 0.13333333333333333], [1.74794706E12, 0.1], [1.74794748E12, 0.1], [1.74794718E12, 0.06666666666666667], [1.74794808E12, 0.06666666666666667], [1.74794778E12, 0.03333333333333333], [1.74794658E12, 0.13333333333333333], [1.7479482E12, 0.2], [1.74794688E12, 0.06666666666666667], [1.747947E12, 0.1], [1.7479467E12, 0.1], [1.7479476E12, 0.2], [1.7479473E12, 0.1], [1.74794772E12, 0.3], [1.74794742E12, 0.06666666666666667], [1.74794832E12, 0.16666666666666666], [1.74794802E12, 0.1], [1.74794682E12, 0.1], [1.74794814E12, 0.1], [1.74794712E12, 0.1]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74794838E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.74794658E12, "maxY": 0.5333333333333333, "series": [{"data": [[1.74794724E12, 0.13333333333333333], [1.74794694E12, 0.13333333333333333], [1.74794784E12, 0.3], [1.74794754E12, 0.1], [1.74794796E12, 0.06666666666666667], [1.74794664E12, 0.1], [1.74794766E12, 0.5333333333333333], [1.74794826E12, 0.06666666666666667], [1.74794838E12, 0.06666666666666667], [1.74794736E12, 0.13333333333333333], [1.74794676E12, 0.13333333333333333], [1.74794706E12, 0.1], [1.74794748E12, 0.1], [1.74794718E12, 0.06666666666666667], [1.74794808E12, 0.03333333333333333], [1.74794778E12, 0.03333333333333333], [1.74794658E12, 0.13333333333333333], [1.7479482E12, 0.2], [1.74794688E12, 0.06666666666666667], [1.747947E12, 0.1], [1.7479467E12, 0.1], [1.7479476E12, 0.2], [1.7479473E12, 0.1], [1.74794772E12, 0.3333333333333333], [1.74794742E12, 0.06666666666666667], [1.74794832E12, 0.16666666666666666], [1.74794802E12, 0.1], [1.74794682E12, 0.1], [1.74794814E12, 0.13333333333333333], [1.74794712E12, 0.1]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74794838E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.74794658E12, "maxY": 0.5333333333333333, "series": [{"data": [[1.74794724E12, 0.13333333333333333], [1.74794694E12, 0.13333333333333333], [1.74794784E12, 0.3], [1.74794754E12, 0.1], [1.74794796E12, 0.06666666666666667], [1.74794664E12, 0.1], [1.74794766E12, 0.5333333333333333], [1.74794826E12, 0.06666666666666667], [1.74794838E12, 0.06666666666666667], [1.74794736E12, 0.13333333333333333], [1.74794676E12, 0.13333333333333333], [1.74794706E12, 0.1], [1.74794748E12, 0.1], [1.74794718E12, 0.06666666666666667], [1.74794808E12, 0.03333333333333333], [1.74794778E12, 0.03333333333333333], [1.74794658E12, 0.13333333333333333], [1.7479482E12, 0.2], [1.74794688E12, 0.06666666666666667], [1.747947E12, 0.1], [1.7479467E12, 0.1], [1.7479476E12, 0.2], [1.7479473E12, 0.1], [1.74794772E12, 0.3333333333333333], [1.74794742E12, 0.06666666666666667], [1.74794832E12, 0.16666666666666666], [1.74794802E12, 0.1], [1.74794682E12, 0.1], [1.74794814E12, 0.13333333333333333], [1.74794712E12, 0.1]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74794838E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.74794658E12, "maxY": 0.5333333333333333, "series": [{"data": [[1.74794724E12, 0.13333333333333333], [1.74794694E12, 0.13333333333333333], [1.74794784E12, 0.3], [1.74794754E12, 0.1], [1.74794796E12, 0.06666666666666667], [1.74794664E12, 0.1], [1.74794766E12, 0.5333333333333333], [1.74794826E12, 0.06666666666666667], [1.74794838E12, 0.06666666666666667], [1.74794736E12, 0.13333333333333333], [1.74794676E12, 0.13333333333333333], [1.74794706E12, 0.1], [1.74794748E12, 0.1], [1.74794718E12, 0.06666666666666667], [1.74794808E12, 0.03333333333333333], [1.74794778E12, 0.03333333333333333], [1.74794658E12, 0.13333333333333333], [1.7479482E12, 0.2], [1.74794688E12, 0.06666666666666667], [1.747947E12, 0.1], [1.7479467E12, 0.1], [1.7479476E12, 0.2], [1.7479473E12, 0.1], [1.74794772E12, 0.3333333333333333], [1.74794742E12, 0.06666666666666667], [1.74794832E12, 0.16666666666666666], [1.74794802E12, 0.1], [1.74794682E12, 0.1], [1.74794814E12, 0.13333333333333333], [1.74794712E12, 0.1]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74794838E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

