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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 386.0, "series": [{"data": [[0.0, 1.0], [0.1, 1.0], [0.2, 1.0], [0.3, 1.0], [0.4, 1.0], [0.5, 1.0], [0.6, 1.0], [0.7, 1.0], [0.8, 1.0], [0.9, 1.0], [1.0, 1.0], [1.1, 1.0], [1.2, 2.0], [1.3, 2.0], [1.4, 2.0], [1.5, 2.0], [1.6, 2.0], [1.7, 2.0], [1.8, 2.0], [1.9, 2.0], [2.0, 2.0], [2.1, 2.0], [2.2, 2.0], [2.3, 2.0], [2.4, 2.0], [2.5, 2.0], [2.6, 2.0], [2.7, 2.0], [2.8, 2.0], [2.9, 2.0], [3.0, 2.0], [3.1, 2.0], [3.2, 2.0], [3.3, 2.0], [3.4, 2.0], [3.5, 2.0], [3.6, 2.0], [3.7, 2.0], [3.8, 2.0], [3.9, 2.0], [4.0, 2.0], [4.1, 2.0], [4.2, 2.0], [4.3, 2.0], [4.4, 2.0], [4.5, 2.0], [4.6, 2.0], [4.7, 2.0], [4.8, 2.0], [4.9, 2.0], [5.0, 2.0], [5.1, 2.0], [5.2, 2.0], [5.3, 2.0], [5.4, 2.0], [5.5, 2.0], [5.6, 2.0], [5.7, 2.0], [5.8, 2.0], [5.9, 2.0], [6.0, 2.0], [6.1, 2.0], [6.2, 2.0], [6.3, 2.0], [6.4, 2.0], [6.5, 2.0], [6.6, 2.0], [6.7, 2.0], [6.8, 3.0], [6.9, 3.0], [7.0, 3.0], [7.1, 3.0], [7.2, 3.0], [7.3, 3.0], [7.4, 3.0], [7.5, 3.0], [7.6, 3.0], [7.7, 3.0], [7.8, 3.0], [7.9, 3.0], [8.0, 3.0], [8.1, 3.0], [8.2, 3.0], [8.3, 3.0], [8.4, 3.0], [8.5, 3.0], [8.6, 3.0], [8.7, 3.0], [8.8, 3.0], [8.9, 3.0], [9.0, 3.0], [9.1, 3.0], [9.2, 3.0], [9.3, 3.0], [9.4, 3.0], [9.5, 3.0], [9.6, 3.0], [9.7, 3.0], [9.8, 3.0], [9.9, 3.0], [10.0, 3.0], [10.1, 3.0], [10.2, 3.0], [10.3, 3.0], [10.4, 3.0], [10.5, 3.0], [10.6, 3.0], [10.7, 3.0], [10.8, 3.0], [10.9, 3.0], [11.0, 3.0], [11.1, 3.0], [11.2, 3.0], [11.3, 3.0], [11.4, 3.0], [11.5, 3.0], [11.6, 3.0], [11.7, 3.0], [11.8, 3.0], [11.9, 3.0], [12.0, 3.0], [12.1, 3.0], [12.2, 3.0], [12.3, 3.0], [12.4, 3.0], [12.5, 3.0], [12.6, 3.0], [12.7, 3.0], [12.8, 3.0], [12.9, 3.0], [13.0, 3.0], [13.1, 3.0], [13.2, 3.0], [13.3, 3.0], [13.4, 3.0], [13.5, 3.0], [13.6, 3.0], [13.7, 3.0], [13.8, 3.0], [13.9, 3.0], [14.0, 3.0], [14.1, 3.0], [14.2, 3.0], [14.3, 3.0], [14.4, 3.0], [14.5, 3.0], [14.6, 3.0], [14.7, 3.0], [14.8, 3.0], [14.9, 3.0], [15.0, 3.0], [15.1, 3.0], [15.2, 3.0], [15.3, 3.0], [15.4, 3.0], [15.5, 4.0], [15.6, 4.0], [15.7, 4.0], [15.8, 4.0], [15.9, 4.0], [16.0, 4.0], [16.1, 4.0], [16.2, 4.0], [16.3, 4.0], [16.4, 4.0], [16.5, 4.0], [16.6, 4.0], [16.7, 4.0], [16.8, 4.0], [16.9, 4.0], [17.0, 4.0], [17.1, 4.0], [17.2, 4.0], [17.3, 4.0], [17.4, 4.0], [17.5, 4.0], [17.6, 4.0], [17.7, 4.0], [17.8, 4.0], [17.9, 4.0], [18.0, 4.0], [18.1, 4.0], [18.2, 4.0], [18.3, 4.0], [18.4, 4.0], [18.5, 4.0], [18.6, 4.0], [18.7, 4.0], [18.8, 4.0], [18.9, 4.0], [19.0, 4.0], [19.1, 4.0], [19.2, 4.0], [19.3, 4.0], [19.4, 4.0], [19.5, 4.0], [19.6, 4.0], [19.7, 4.0], [19.8, 4.0], [19.9, 4.0], [20.0, 4.0], [20.1, 4.0], [20.2, 4.0], [20.3, 4.0], [20.4, 4.0], [20.5, 4.0], [20.6, 4.0], [20.7, 4.0], [20.8, 4.0], [20.9, 4.0], [21.0, 4.0], [21.1, 4.0], [21.2, 4.0], [21.3, 4.0], [21.4, 4.0], [21.5, 4.0], [21.6, 4.0], [21.7, 4.0], [21.8, 4.0], [21.9, 4.0], [22.0, 4.0], [22.1, 4.0], [22.2, 4.0], [22.3, 4.0], [22.4, 4.0], [22.5, 4.0], [22.6, 4.0], [22.7, 4.0], [22.8, 4.0], [22.9, 4.0], [23.0, 4.0], [23.1, 5.0], [23.2, 5.0], [23.3, 5.0], [23.4, 5.0], [23.5, 5.0], [23.6, 5.0], [23.7, 5.0], [23.8, 5.0], [23.9, 5.0], [24.0, 5.0], [24.1, 5.0], [24.2, 5.0], [24.3, 5.0], [24.4, 5.0], [24.5, 5.0], [24.6, 5.0], [24.7, 5.0], [24.8, 5.0], [24.9, 5.0], [25.0, 5.0], [25.1, 5.0], [25.2, 5.0], [25.3, 5.0], [25.4, 5.0], [25.5, 5.0], [25.6, 5.0], [25.7, 5.0], [25.8, 5.0], [25.9, 5.0], [26.0, 5.0], [26.1, 5.0], [26.2, 5.0], [26.3, 5.0], [26.4, 5.0], [26.5, 5.0], [26.6, 5.0], [26.7, 5.0], [26.8, 5.0], [26.9, 5.0], [27.0, 5.0], [27.1, 5.0], [27.2, 5.0], [27.3, 5.0], [27.4, 5.0], [27.5, 5.0], [27.6, 5.0], [27.7, 5.0], [27.8, 5.0], [27.9, 5.0], [28.0, 5.0], [28.1, 5.0], [28.2, 5.0], [28.3, 5.0], [28.4, 5.0], [28.5, 5.0], [28.6, 5.0], [28.7, 5.0], [28.8, 5.0], [28.9, 5.0], [29.0, 5.0], [29.1, 5.0], [29.2, 5.0], [29.3, 5.0], [29.4, 5.0], [29.5, 5.0], [29.6, 5.0], [29.7, 5.0], [29.8, 5.0], [29.9, 5.0], [30.0, 5.0], [30.1, 5.0], [30.2, 5.0], [30.3, 6.0], [30.4, 6.0], [30.5, 6.0], [30.6, 6.0], [30.7, 6.0], [30.8, 6.0], [30.9, 6.0], [31.0, 6.0], [31.1, 6.0], [31.2, 6.0], [31.3, 6.0], [31.4, 6.0], [31.5, 6.0], [31.6, 6.0], [31.7, 6.0], [31.8, 6.0], [31.9, 6.0], [32.0, 6.0], [32.1, 6.0], [32.2, 6.0], [32.3, 6.0], [32.4, 6.0], [32.5, 6.0], [32.6, 6.0], [32.7, 6.0], [32.8, 6.0], [32.9, 6.0], [33.0, 6.0], [33.1, 6.0], [33.2, 6.0], [33.3, 6.0], [33.4, 6.0], [33.5, 6.0], [33.6, 6.0], [33.7, 6.0], [33.8, 6.0], [33.9, 6.0], [34.0, 6.0], [34.1, 6.0], [34.2, 6.0], [34.3, 6.0], [34.4, 6.0], [34.5, 6.0], [34.6, 6.0], [34.7, 6.0], [34.8, 6.0], [34.9, 6.0], [35.0, 6.0], [35.1, 6.0], [35.2, 6.0], [35.3, 6.0], [35.4, 6.0], [35.5, 6.0], [35.6, 6.0], [35.7, 6.0], [35.8, 6.0], [35.9, 6.0], [36.0, 6.0], [36.1, 6.0], [36.2, 6.0], [36.3, 6.0], [36.4, 6.0], [36.5, 6.0], [36.6, 6.0], [36.7, 6.0], [36.8, 7.0], [36.9, 7.0], [37.0, 7.0], [37.1, 7.0], [37.2, 7.0], [37.3, 7.0], [37.4, 7.0], [37.5, 7.0], [37.6, 7.0], [37.7, 7.0], [37.8, 7.0], [37.9, 7.0], [38.0, 7.0], [38.1, 7.0], [38.2, 7.0], [38.3, 7.0], [38.4, 7.0], [38.5, 7.0], [38.6, 7.0], [38.7, 7.0], [38.8, 7.0], [38.9, 7.0], [39.0, 7.0], [39.1, 7.0], [39.2, 7.0], [39.3, 7.0], [39.4, 7.0], [39.5, 7.0], [39.6, 7.0], [39.7, 7.0], [39.8, 7.0], [39.9, 7.0], [40.0, 7.0], [40.1, 7.0], [40.2, 7.0], [40.3, 7.0], [40.4, 7.0], [40.5, 7.0], [40.6, 7.0], [40.7, 7.0], [40.8, 7.0], [40.9, 7.0], [41.0, 7.0], [41.1, 7.0], [41.2, 7.0], [41.3, 7.0], [41.4, 7.0], [41.5, 7.0], [41.6, 7.0], [41.7, 7.0], [41.8, 7.0], [41.9, 7.0], [42.0, 7.0], [42.1, 7.0], [42.2, 7.0], [42.3, 7.0], [42.4, 7.0], [42.5, 7.0], [42.6, 8.0], [42.7, 8.0], [42.8, 8.0], [42.9, 8.0], [43.0, 8.0], [43.1, 8.0], [43.2, 8.0], [43.3, 8.0], [43.4, 8.0], [43.5, 8.0], [43.6, 8.0], [43.7, 8.0], [43.8, 8.0], [43.9, 8.0], [44.0, 8.0], [44.1, 8.0], [44.2, 8.0], [44.3, 8.0], [44.4, 8.0], [44.5, 8.0], [44.6, 8.0], [44.7, 8.0], [44.8, 8.0], [44.9, 8.0], [45.0, 8.0], [45.1, 8.0], [45.2, 8.0], [45.3, 8.0], [45.4, 8.0], [45.5, 8.0], [45.6, 8.0], [45.7, 8.0], [45.8, 8.0], [45.9, 8.0], [46.0, 8.0], [46.1, 8.0], [46.2, 8.0], [46.3, 8.0], [46.4, 8.0], [46.5, 8.0], [46.6, 8.0], [46.7, 8.0], [46.8, 8.0], [46.9, 8.0], [47.0, 8.0], [47.1, 8.0], [47.2, 8.0], [47.3, 8.0], [47.4, 8.0], [47.5, 8.0], [47.6, 9.0], [47.7, 9.0], [47.8, 9.0], [47.9, 9.0], [48.0, 9.0], [48.1, 9.0], [48.2, 9.0], [48.3, 9.0], [48.4, 9.0], [48.5, 9.0], [48.6, 9.0], [48.7, 9.0], [48.8, 9.0], [48.9, 9.0], [49.0, 9.0], [49.1, 9.0], [49.2, 9.0], [49.3, 9.0], [49.4, 9.0], [49.5, 9.0], [49.6, 9.0], [49.7, 9.0], [49.8, 9.0], [49.9, 9.0], [50.0, 9.0], [50.1, 9.0], [50.2, 9.0], [50.3, 9.0], [50.4, 9.0], [50.5, 9.0], [50.6, 9.0], [50.7, 9.0], [50.8, 9.0], [50.9, 9.0], [51.0, 9.0], [51.1, 9.0], [51.2, 9.0], [51.3, 9.0], [51.4, 9.0], [51.5, 9.0], [51.6, 9.0], [51.7, 9.0], [51.8, 9.0], [51.9, 9.0], [52.0, 9.0], [52.1, 9.0], [52.2, 10.0], [52.3, 10.0], [52.4, 10.0], [52.5, 10.0], [52.6, 10.0], [52.7, 10.0], [52.8, 10.0], [52.9, 10.0], [53.0, 10.0], [53.1, 10.0], [53.2, 10.0], [53.3, 10.0], [53.4, 10.0], [53.5, 10.0], [53.6, 10.0], [53.7, 10.0], [53.8, 10.0], [53.9, 10.0], [54.0, 10.0], [54.1, 10.0], [54.2, 10.0], [54.3, 10.0], [54.4, 10.0], [54.5, 10.0], [54.6, 10.0], [54.7, 10.0], [54.8, 10.0], [54.9, 10.0], [55.0, 10.0], [55.1, 10.0], [55.2, 10.0], [55.3, 10.0], [55.4, 10.0], [55.5, 10.0], [55.6, 10.0], [55.7, 10.0], [55.8, 10.0], [55.9, 10.0], [56.0, 10.0], [56.1, 11.0], [56.2, 11.0], [56.3, 11.0], [56.4, 11.0], [56.5, 11.0], [56.6, 11.0], [56.7, 11.0], [56.8, 11.0], [56.9, 11.0], [57.0, 11.0], [57.1, 11.0], [57.2, 11.0], [57.3, 11.0], [57.4, 11.0], [57.5, 11.0], [57.6, 11.0], [57.7, 11.0], [57.8, 11.0], [57.9, 11.0], [58.0, 11.0], [58.1, 11.0], [58.2, 11.0], [58.3, 11.0], [58.4, 11.0], [58.5, 11.0], [58.6, 11.0], [58.7, 11.0], [58.8, 11.0], [58.9, 11.0], [59.0, 11.0], [59.1, 11.0], [59.2, 11.0], [59.3, 11.0], [59.4, 11.0], [59.5, 12.0], [59.6, 12.0], [59.7, 12.0], [59.8, 12.0], [59.9, 12.0], [60.0, 12.0], [60.1, 12.0], [60.2, 12.0], [60.3, 12.0], [60.4, 12.0], [60.5, 12.0], [60.6, 12.0], [60.7, 12.0], [60.8, 12.0], [60.9, 12.0], [61.0, 12.0], [61.1, 12.0], [61.2, 12.0], [61.3, 12.0], [61.4, 12.0], [61.5, 12.0], [61.6, 12.0], [61.7, 12.0], [61.8, 12.0], [61.9, 12.0], [62.0, 12.0], [62.1, 12.0], [62.2, 12.0], [62.3, 12.0], [62.4, 13.0], [62.5, 13.0], [62.6, 13.0], [62.7, 13.0], [62.8, 13.0], [62.9, 13.0], [63.0, 13.0], [63.1, 13.0], [63.2, 13.0], [63.3, 13.0], [63.4, 13.0], [63.5, 13.0], [63.6, 13.0], [63.7, 13.0], [63.8, 13.0], [63.9, 13.0], [64.0, 13.0], [64.1, 13.0], [64.2, 13.0], [64.3, 13.0], [64.4, 13.0], [64.5, 13.0], [64.6, 13.0], [64.7, 13.0], [64.8, 13.0], [64.9, 13.0], [65.0, 13.0], [65.1, 14.0], [65.2, 14.0], [65.3, 14.0], [65.4, 14.0], [65.5, 14.0], [65.6, 14.0], [65.7, 14.0], [65.8, 14.0], [65.9, 14.0], [66.0, 14.0], [66.1, 14.0], [66.2, 14.0], [66.3, 14.0], [66.4, 14.0], [66.5, 14.0], [66.6, 14.0], [66.7, 14.0], [66.8, 14.0], [66.9, 14.0], [67.0, 14.0], [67.1, 14.0], [67.2, 14.0], [67.3, 15.0], [67.4, 15.0], [67.5, 15.0], [67.6, 15.0], [67.7, 15.0], [67.8, 15.0], [67.9, 15.0], [68.0, 15.0], [68.1, 15.0], [68.2, 15.0], [68.3, 15.0], [68.4, 15.0], [68.5, 15.0], [68.6, 15.0], [68.7, 15.0], [68.8, 15.0], [68.9, 15.0], [69.0, 15.0], [69.1, 15.0], [69.2, 15.0], [69.3, 16.0], [69.4, 16.0], [69.5, 16.0], [69.6, 16.0], [69.7, 16.0], [69.8, 16.0], [69.9, 16.0], [70.0, 16.0], [70.1, 16.0], [70.2, 16.0], [70.3, 16.0], [70.4, 16.0], [70.5, 16.0], [70.6, 16.0], [70.7, 16.0], [70.8, 16.0], [70.9, 16.0], [71.0, 17.0], [71.1, 17.0], [71.2, 17.0], [71.3, 17.0], [71.4, 17.0], [71.5, 17.0], [71.6, 17.0], [71.7, 17.0], [71.8, 17.0], [71.9, 17.0], [72.0, 17.0], [72.1, 17.0], [72.2, 17.0], [72.3, 17.0], [72.4, 18.0], [72.5, 18.0], [72.6, 18.0], [72.7, 18.0], [72.8, 18.0], [72.9, 18.0], [73.0, 18.0], [73.1, 18.0], [73.2, 18.0], [73.3, 18.0], [73.4, 18.0], [73.5, 18.0], [73.6, 18.0], [73.7, 19.0], [73.8, 19.0], [73.9, 19.0], [74.0, 19.0], [74.1, 19.0], [74.2, 19.0], [74.3, 19.0], [74.4, 19.0], [74.5, 19.0], [74.6, 19.0], [74.7, 20.0], [74.8, 20.0], [74.9, 20.0], [75.0, 20.0], [75.1, 20.0], [75.2, 20.0], [75.3, 20.0], [75.4, 20.0], [75.5, 20.0], [75.6, 21.0], [75.7, 21.0], [75.8, 21.0], [75.9, 21.0], [76.0, 21.0], [76.1, 21.0], [76.2, 21.0], [76.3, 22.0], [76.4, 22.0], [76.5, 22.0], [76.6, 22.0], [76.7, 22.0], [76.8, 22.0], [76.9, 23.0], [77.0, 23.0], [77.1, 23.0], [77.2, 23.0], [77.3, 23.0], [77.4, 24.0], [77.5, 24.0], [77.6, 24.0], [77.7, 24.0], [77.8, 24.0], [77.9, 25.0], [78.0, 25.0], [78.1, 25.0], [78.2, 25.0], [78.3, 26.0], [78.4, 26.0], [78.5, 26.0], [78.6, 26.0], [78.7, 27.0], [78.8, 27.0], [78.9, 27.0], [79.0, 28.0], [79.1, 28.0], [79.2, 28.0], [79.3, 28.0], [79.4, 29.0], [79.5, 29.0], [79.6, 29.0], [79.7, 30.0], [79.8, 30.0], [79.9, 30.0], [80.0, 30.0], [80.1, 31.0], [80.2, 31.0], [80.3, 31.0], [80.4, 32.0], [80.5, 32.0], [80.6, 32.0], [80.7, 33.0], [80.8, 33.0], [80.9, 33.0], [81.0, 34.0], [81.1, 34.0], [81.2, 34.0], [81.3, 35.0], [81.4, 35.0], [81.5, 35.0], [81.6, 36.0], [81.7, 36.0], [81.8, 36.0], [81.9, 37.0], [82.0, 37.0], [82.1, 37.0], [82.2, 38.0], [82.3, 38.0], [82.4, 38.0], [82.5, 39.0], [82.6, 39.0], [82.7, 39.0], [82.8, 39.0], [82.9, 40.0], [83.0, 40.0], [83.1, 40.0], [83.2, 41.0], [83.3, 41.0], [83.4, 41.0], [83.5, 42.0], [83.6, 42.0], [83.7, 42.0], [83.8, 43.0], [83.9, 43.0], [84.0, 43.0], [84.1, 44.0], [84.2, 44.0], [84.3, 44.0], [84.4, 45.0], [84.5, 45.0], [84.6, 45.0], [84.7, 45.0], [84.8, 46.0], [84.9, 46.0], [85.0, 46.0], [85.1, 47.0], [85.2, 47.0], [85.3, 47.0], [85.4, 47.0], [85.5, 48.0], [85.6, 48.0], [85.7, 48.0], [85.8, 49.0], [85.9, 49.0], [86.0, 49.0], [86.1, 49.0], [86.2, 50.0], [86.3, 50.0], [86.4, 50.0], [86.5, 50.0], [86.6, 50.0], [86.7, 50.0], [86.8, 51.0], [86.9, 51.0], [87.0, 51.0], [87.1, 51.0], [87.2, 52.0], [87.3, 52.0], [87.4, 52.0], [87.5, 52.0], [87.6, 52.0], [87.7, 53.0], [87.8, 53.0], [87.9, 53.0], [88.0, 53.0], [88.1, 53.0], [88.2, 54.0], [88.3, 54.0], [88.4, 54.0], [88.5, 54.0], [88.6, 55.0], [88.7, 55.0], [88.8, 55.0], [88.9, 55.0], [89.0, 55.0], [89.1, 56.0], [89.2, 56.0], [89.3, 56.0], [89.4, 56.0], [89.5, 57.0], [89.6, 57.0], [89.7, 57.0], [89.8, 57.0], [89.9, 58.0], [90.0, 58.0], [90.1, 58.0], [90.2, 59.0], [90.3, 59.0], [90.4, 59.0], [90.5, 60.0], [90.6, 60.0], [90.7, 60.0], [90.8, 60.0], [90.9, 61.0], [91.0, 61.0], [91.1, 61.0], [91.2, 62.0], [91.3, 62.0], [91.4, 63.0], [91.5, 63.0], [91.6, 63.0], [91.7, 64.0], [91.8, 64.0], [91.9, 65.0], [92.0, 66.0], [92.1, 66.0], [92.2, 67.0], [92.3, 67.0], [92.4, 68.0], [92.5, 69.0], [92.6, 70.0], [92.7, 71.0], [92.8, 72.0], [92.9, 73.0], [93.0, 74.0], [93.1, 75.0], [93.2, 76.0], [93.3, 77.0], [93.4, 79.0], [93.5, 80.0], [93.6, 81.0], [93.7, 82.0], [93.8, 83.0], [93.9, 85.0], [94.0, 86.0], [94.1, 87.0], [94.2, 88.0], [94.3, 89.0], [94.4, 90.0], [94.5, 91.0], [94.6, 92.0], [94.7, 93.0], [94.8, 94.0], [94.9, 95.0], [95.0, 96.0], [95.1, 97.0], [95.2, 97.0], [95.3, 98.0], [95.4, 99.0], [95.5, 100.0], [95.6, 100.0], [95.7, 101.0], [95.8, 102.0], [95.9, 102.0], [96.0, 103.0], [96.1, 104.0], [96.2, 104.0], [96.3, 105.0], [96.4, 106.0], [96.5, 107.0], [96.6, 107.0], [96.7, 108.0], [96.8, 109.0], [96.9, 110.0], [97.0, 110.0], [97.1, 111.0], [97.2, 113.0], [97.3, 114.0], [97.4, 115.0], [97.5, 117.0], [97.6, 120.0], [97.7, 122.0], [97.8, 126.0], [97.9, 130.0], [98.0, 134.0], [98.1, 138.0], [98.2, 142.0], [98.3, 145.0], [98.4, 148.0], [98.5, 150.0], [98.6, 152.0], [98.7, 154.0], [98.8, 155.0], [98.9, 158.0], [99.0, 161.0], [99.1, 164.0], [99.2, 168.0], [99.3, 176.0], [99.4, 187.0], [99.5, 195.0], [99.6, 202.0], [99.7, 209.0], [99.8, 219.0], [99.9, 251.0], [100.0, 386.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 36.0, "minX": 0.0, "maxY": 279168.0, "series": [{"data": [[0.0, 279168.0], [300.0, 36.0], [100.0, 12066.0], [200.0, 1276.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 300.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 292546.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 292546.0, "series": [{"data": [[0.0, 292546.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 4.9E-324, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 976.9954763924262, "minX": 1.74705306E12, "maxY": 1000.0, "series": [{"data": [[1.74705456E12, 1000.0], [1.74705426E12, 1000.0], [1.74705306E12, 976.9954763924262], [1.74705396E12, 1000.0], [1.74705336E12, 1000.0], [1.74705366E12, 1000.0], [1.74705468E12, 1000.0], [1.74705438E12, 1000.0], [1.74705324E12, 1000.0], [1.74705474E12, 1000.0], [1.74705444E12, 1000.0], [1.74705414E12, 1000.0], [1.74705384E12, 1000.0], [1.74705354E12, 1000.0], [1.74705312E12, 1000.0], [1.74705486E12, 1000.0], [1.74705342E12, 1000.0], [1.7470536E12, 1000.0], [1.74705462E12, 1000.0], [1.74705432E12, 1000.0], [1.74705402E12, 1000.0], [1.7470533E12, 1000.0], [1.74705372E12, 1000.0], [1.74705408E12, 1000.0], [1.74705378E12, 1000.0], [1.74705348E12, 1000.0], [1.74705318E12, 1000.0], [1.7470548E12, 1000.0], [1.7470545E12, 1000.0], [1.7470542E12, 1000.0], [1.7470539E12, 1000.0]], "isOverall": false, "label": "LoadTest", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74705486E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 3.0, "minX": 129.0, "maxY": 376.0, "series": [{"data": [[541.0, 128.0], [542.0, 119.0], [545.0, 90.80000000000001], [546.0, 67.0], [548.0, 49.0], [549.0, 30.0], [584.0, 39.5], [589.0, 28.0], [590.0, 15.0], [596.0, 5.0], [613.0, 4.0], [641.0, 4.0], [662.0, 12.0], [664.0, 3.0], [680.0, 3.0], [706.0, 4.0], [743.0, 7.0], [754.0, 3.0], [776.0, 4.0], [801.0, 4.0], [825.0, 6.0], [844.0, 6.0], [851.0, 4.0], [877.0, 6.0], [918.0, 11.0], [923.0, 3.0], [942.0, 3.0], [970.0, 4.0], [1000.0, 21.722567401122262], [133.0, 111.66666666666666], [129.0, 95.25], [132.0, 101.0], [144.0, 124.66666666666667], [146.0, 128.0], [151.0, 131.0], [154.0, 136.0], [159.0, 143.0], [162.0, 146.0], [163.0, 149.0], [164.0, 76.0], [182.0, 177.0], [186.0, 180.0], [187.0, 185.0], [189.0, 189.5], [192.0, 194.0], [194.0, 198.0], [220.0, 231.0], [223.0, 240.0], [224.0, 243.0], [227.0, 192.0], [228.0, 238.0], [229.0, 162.0], [232.0, 255.0], [233.0, 256.0], [259.0, 281.0], [262.0, 283.0], [263.0, 286.66666666666663], [264.0, 291.5], [265.0, 293.0], [266.0, 295.0], [267.0, 297.0], [292.0, 328.0], [298.0, 334.0], [299.0, 336.0], [301.0, 337.5], [304.0, 341.0], [310.0, 346.0], [339.0, 334.0], [342.0, 376.0], [343.0, 337.0], [344.0, 280.0], [347.0, 275.0], [348.0, 270.0], [349.0, 261.0], [373.0, 273.0], [376.0, 265.0], [377.0, 257.0], [378.0, 249.0], [379.0, 234.0], [382.0, 215.0], [384.0, 214.0], [421.0, 233.0], [424.0, 227.0], [427.0, 208.0], [428.0, 224.0], [436.0, 208.0], [437.0, 170.33333333333334], [438.0, 188.0], [477.0, 175.0], [479.0, 168.0], [482.0, 154.0], [485.0, 139.0], [488.0, 135.0], [490.0, 144.5], [491.0, 117.0], [495.0, 101.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[999.4437387624387, 21.851742973754156]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1000.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 14144.0, "minX": 1.74705306E12, "maxY": 87876.8, "series": [{"data": [[1.74705456E12, 68026.66666666667], [1.74705426E12, 71314.73333333334], [1.74705306E12, 50761.03333333333], [1.74705396E12, 70940.33333333333], [1.74705336E12, 66822.76666666666], [1.74705366E12, 69950.4], [1.74705468E12, 51881.333333333336], [1.74705438E12, 87488.8], [1.74705324E12, 87617.36666666667], [1.74705474E12, 51438.433333333334], [1.74705444E12, 86157.86666666667], [1.74705414E12, 51669.5], [1.74705384E12, 87119.0], [1.74705354E12, 51967.6], [1.74705312E12, 83151.66666666667], [1.74705486E12, 23422.833333333332], [1.74705342E12, 58613.03333333333], [1.7470536E12, 56101.433333333334], [1.74705462E12, 60851.46666666667], [1.74705432E12, 82092.8], [1.74705402E12, 59791.86666666667], [1.7470533E12, 79334.76666666666], [1.74705372E12, 82293.23333333334], [1.74705408E12, 54063.03333333333], [1.74705378E12, 87876.8], [1.74705348E12, 51550.0], [1.74705318E12, 87547.36666666667], [1.7470548E12, 57134.76666666667], [1.7470545E12, 80122.96666666666], [1.7470542E12, 60246.8], [1.7470539E12, 81934.86666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.74705456E12, 41080.0], [1.74705426E12, 43064.666666666664], [1.74705306E12, 30654.0], [1.74705396E12, 42839.333333333336], [1.74705336E12, 40352.0], [1.74705366E12, 42241.333333333336], [1.74705468E12, 31330.0], [1.74705438E12, 52832.0], [1.74705324E12, 52910.0], [1.74705474E12, 31061.333333333332], [1.74705444E12, 52026.0], [1.74705414E12, 31200.0], [1.74705384E12, 52606.666666666664], [1.74705354E12, 31382.0], [1.74705312E12, 50214.666666666664], [1.74705486E12, 14144.0], [1.74705342E12, 35394.666666666664], [1.7470536E12, 33878.0], [1.74705462E12, 36746.666666666664], [1.74705432E12, 49573.333333333336], [1.74705402E12, 36105.333333333336], [1.7470533E12, 47909.333333333336], [1.74705372E12, 49694.666666666664], [1.74705408E12, 32647.333333333332], [1.74705378E12, 53066.0], [1.74705348E12, 31130.666666666668], [1.74705318E12, 52866.666666666664], [1.7470548E12, 34502.0], [1.7470545E12, 48386.0], [1.7470542E12, 36382.666666666664], [1.7470539E12, 49478.0]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74705486E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 14.931867399633475, "minX": 1.74705306E12, "maxY": 33.23635849590044, "series": [{"data": [[1.74705456E12, 20.963713080168688], [1.74705426E12, 20.277923123364822], [1.74705306E12, 33.23635849590044], [1.74705396E12, 19.320048553510077], [1.74705336E12, 17.010309278350555], [1.74705366E12, 27.592942141977804], [1.74705468E12, 16.642876901798022], [1.74705438E12, 19.903051181102335], [1.74705324E12, 20.08763308763314], [1.74705474E12, 18.03989955357147], [1.74705444E12, 14.931867399633475], [1.74705414E12, 22.17222222222217], [1.74705384E12, 17.440527182866614], [1.74705354E12, 18.027892847279826], [1.74705312E12, 26.012254055919886], [1.74705486E12, 31.471200980392144], [1.74705342E12, 21.84329089128305], [1.7470536E12, 28.55512918905096], [1.74705462E12, 22.67688679245282], [1.74705432E12, 17.746153846153792], [1.74705402E12, 18.52280364858367], [1.7470533E12, 21.696816208393734], [1.74705372E12, 32.701081269619635], [1.74705408E12, 23.329174409344258], [1.74705378E12, 22.546627470194448], [1.74705348E12, 21.555122494432094], [1.74705318E12, 21.002622950819646], [1.7470548E12, 15.52097462949013], [1.7470545E12, 20.66863693354815], [1.7470542E12, 31.706288708908986], [1.7470539E12, 23.318619723243966]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74705486E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 14.929202065633838, "minX": 1.74705306E12, "maxY": 33.19140514560371, "series": [{"data": [[1.74705456E12, 20.959493670886093], [1.74705426E12, 20.275306902797332], [1.74705306E12, 33.19140514560371], [1.74705396E12, 19.3147885899251], [1.74705336E12, 17.007302405498322], [1.74705366E12, 27.59048009848183], [1.74705468E12, 16.637344398340204], [1.74705438E12, 19.898622047244185], [1.74705324E12, 20.082063882063814], [1.74705474E12, 18.035156249999922], [1.74705444E12, 14.929202065633838], [1.74705414E12, 22.168333333333337], [1.74705384E12, 17.43591433278422], [1.74705354E12, 18.02292184479428], [1.74705312E12, 26.00621332412831], [1.74705486E12, 31.46507352941178], [1.74705342E12, 21.838638589618046], [1.7470536E12, 28.55078025070355], [1.74705462E12, 22.67311320754723], [1.74705432E12, 17.740734265734336], [1.74705402E12, 18.518482957273168], [1.7470533E12, 21.692474674384957], [1.74705372E12, 32.69672131147544], [1.74705408E12, 23.327050703477617], [1.74705378E12, 22.542217867058604], [1.74705348E12, 21.55150334075719], [1.74705318E12, 20.997704918032806], [1.7470548E12, 15.517960311479575], [1.7470545E12, 20.66523374529828], [1.7470542E12, 31.69985707479748], [1.7470539E12, 23.31441583464707]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74705486E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.023020579002441567, "minX": 1.74705306E12, "maxY": 1.5581000848176447, "series": [{"data": [[1.74705456E12, 0.03270042194092827], [1.74705426E12, 0.03219963775407536], [1.74705306E12, 1.5581000848176447], [1.74705396E12, 0.03196439409265632], [1.74705336E12, 0.04274054982817864], [1.74705366E12, 0.03405826836274114], [1.74705468E12, 0.05228215767634862], [1.74705438E12, 0.026738845144356857], [1.74705324E12, 0.0404586404586407], [1.74705474E12, 0.03655133928571449], [1.74705444E12, 0.025820423121772403], [1.74705414E12, 0.04166666666666659], [1.74705384E12, 0.0266886326194399], [1.74705354E12, 0.04943385805026232], [1.74705312E12, 0.05056955471177089], [1.74705486E12, 0.04473039215686267], [1.74705342E12, 0.04774730656219396], [1.7470536E12, 0.042466103862880474], [1.74705462E12, 0.04103773584905678], [1.74705432E12, 0.025874125874125884], [1.74705402E12, 0.036245799327892576], [1.7470533E12, 0.02912445730824887], [1.74705372E12, 0.023020579002441567], [1.74705408E12, 0.040350411468011695], [1.74705378E12, 0.024661113833088413], [1.74705348E12, 0.04092427616926509], [1.74705318E12, 0.03311475409836075], [1.7470548E12, 0.037930168299422286], [1.7470545E12, 0.02597169980297326], [1.7470542E12, 0.03454025726536448], [1.7470539E12, 0.026624627780697095]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74705486E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 1.0, "minX": 1.74705306E12, "maxY": 386.0, "series": [{"data": [[1.74705456E12, 188.0], [1.74705426E12, 282.0], [1.74705306E12, 386.0], [1.74705396E12, 150.0], [1.74705336E12, 221.0], [1.74705366E12, 288.0], [1.74705468E12, 158.0], [1.74705438E12, 197.0], [1.74705324E12, 166.0], [1.74705474E12, 238.0], [1.74705444E12, 154.0], [1.74705414E12, 219.0], [1.74705384E12, 166.0], [1.74705354E12, 190.0], [1.74705312E12, 252.0], [1.74705486E12, 230.0], [1.74705342E12, 223.0], [1.7470536E12, 266.0], [1.74705462E12, 256.0], [1.74705432E12, 210.0], [1.74705402E12, 189.0], [1.7470533E12, 200.0], [1.74705372E12, 309.0], [1.74705408E12, 209.0], [1.74705378E12, 205.0], [1.74705348E12, 255.0], [1.74705318E12, 176.0], [1.7470548E12, 199.0], [1.7470545E12, 191.0], [1.7470542E12, 303.0], [1.7470539E12, 300.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.74705456E12, 57.0], [1.74705426E12, 51.0], [1.74705306E12, 97.0], [1.74705396E12, 54.0], [1.74705336E12, 49.0], [1.74705366E12, 87.10000000000036], [1.74705468E12, 47.0], [1.74705438E12, 54.0], [1.74705324E12, 54.0], [1.74705474E12, 52.0], [1.74705444E12, 42.0], [1.74705414E12, 63.0], [1.74705384E12, 48.0], [1.74705354E12, 52.0], [1.74705312E12, 68.0], [1.74705486E12, 99.0], [1.74705342E12, 59.0], [1.7470536E12, 86.0], [1.74705462E12, 59.0], [1.74705432E12, 50.0], [1.74705402E12, 51.0], [1.7470533E12, 62.0], [1.74705372E12, 97.0], [1.74705408E12, 64.0], [1.74705378E12, 59.0], [1.74705348E12, 60.0], [1.74705318E12, 59.0], [1.7470548E12, 49.0], [1.7470545E12, 56.0], [1.7470542E12, 102.0], [1.7470539E12, 56.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.74705456E12, 135.1900000000005], [1.74705426E12, 177.0], [1.74705306E12, 254.25], [1.74705396E12, 111.1299999999992], [1.74705336E12, 149.0], [1.74705366E12, 201.0], [1.74705468E12, 111.0], [1.74705438E12, 150.0], [1.74705324E12, 105.0], [1.74705474E12, 159.0], [1.74705444E12, 87.0], [1.74705414E12, 158.98999999999978], [1.74705384E12, 112.0], [1.74705354E12, 126.0], [1.74705312E12, 165.0], [1.74705486E12, 187.0], [1.74705342E12, 166.0], [1.7470536E12, 208.8099999999995], [1.74705462E12, 184.1900000000005], [1.74705432E12, 139.59000000000015], [1.74705402E12, 143.0], [1.7470533E12, 151.4300000000003], [1.74705372E12, 224.0], [1.74705408E12, 149.0], [1.74705378E12, 154.0], [1.74705348E12, 204.0], [1.74705318E12, 125.98999999999978], [1.7470548E12, 114.0], [1.7470545E12, 134.0], [1.7470542E12, 203.0], [1.7470539E12, 166.04999999999745]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.74705456E12, 85.0], [1.74705426E12, 89.0], [1.74705306E12, 160.0], [1.74705396E12, 73.0], [1.74705336E12, 80.0], [1.74705366E12, 113.0], [1.74705468E12, 69.0], [1.74705438E12, 83.0], [1.74705324E12, 71.0], [1.74705474E12, 90.0], [1.74705444E12, 54.0], [1.74705414E12, 101.0], [1.74705384E12, 62.0], [1.74705354E12, 75.0], [1.74705312E12, 103.0], [1.74705486E12, 133.0], [1.74705342E12, 99.0], [1.7470536E12, 118.04999999999927], [1.74705462E12, 103.94999999999982], [1.74705432E12, 68.0], [1.74705402E12, 87.0], [1.7470533E12, 100.0], [1.74705372E12, 153.0], [1.74705408E12, 99.0], [1.74705378E12, 95.64999999999964], [1.74705348E12, 98.0], [1.74705318E12, 92.0], [1.7470548E12, 62.0], [1.7470545E12, 91.0], [1.7470542E12, 142.0], [1.7470539E12, 89.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.74705456E12, 1.0], [1.74705426E12, 1.0], [1.74705306E12, 1.0], [1.74705396E12, 1.0], [1.74705336E12, 1.0], [1.74705366E12, 1.0], [1.74705468E12, 1.0], [1.74705438E12, 1.0], [1.74705324E12, 1.0], [1.74705474E12, 1.0], [1.74705444E12, 1.0], [1.74705414E12, 1.0], [1.74705384E12, 1.0], [1.74705354E12, 1.0], [1.74705312E12, 1.0], [1.74705486E12, 1.0], [1.74705342E12, 1.0], [1.7470536E12, 1.0], [1.74705462E12, 1.0], [1.74705432E12, 1.0], [1.74705402E12, 1.0], [1.7470533E12, 1.0], [1.74705372E12, 1.0], [1.74705408E12, 1.0], [1.74705378E12, 1.0], [1.74705348E12, 1.0], [1.74705318E12, 1.0], [1.7470548E12, 1.0], [1.7470545E12, 1.0], [1.7470542E12, 1.0], [1.7470539E12, 1.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.74705456E12, 9.0], [1.74705426E12, 9.0], [1.74705306E12, 12.0], [1.74705396E12, 9.0], [1.74705336E12, 7.0], [1.74705366E12, 9.0], [1.74705468E12, 8.0], [1.74705438E12, 9.0], [1.74705324E12, 10.0], [1.74705474E12, 6.0], [1.74705444E12, 9.0], [1.74705414E12, 8.0], [1.74705384E12, 9.0], [1.74705354E12, 8.0], [1.74705312E12, 11.0], [1.74705486E12, 11.0], [1.74705342E12, 9.0], [1.7470536E12, 10.0], [1.74705462E12, 9.0], [1.74705432E12, 8.0], [1.74705402E12, 8.0], [1.7470533E12, 9.0], [1.74705372E12, 11.0], [1.74705408E12, 9.0], [1.74705378E12, 10.0], [1.74705348E12, 7.0], [1.74705318E12, 9.0], [1.7470548E12, 7.0], [1.7470545E12, 9.0], [1.7470542E12, 10.0], [1.7470539E12, 11.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74705486E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 1.5, "minX": 4.0, "maxY": 115.0, "series": [{"data": [[4.0, 1.5], [6.0, 5.0], [22.0, 4.0], [30.0, 2.0], [34.0, 12.0], [36.0, 3.0], [40.0, 6.5], [42.0, 12.0], [44.0, 54.0], [46.0, 5.5], [48.0, 11.0], [50.0, 24.0], [52.0, 4.5], [54.0, 5.0], [56.0, 4.0], [58.0, 54.0], [60.0, 16.5], [62.0, 5.0], [64.0, 5.0], [66.0, 7.5], [68.0, 9.0], [70.0, 10.0], [74.0, 5.0], [72.0, 9.0], [76.0, 7.0], [78.0, 5.0], [80.0, 19.0], [82.0, 6.0], [86.0, 9.0], [84.0, 51.0], [90.0, 5.0], [88.0, 8.0], [94.0, 13.0], [92.0, 11.0], [98.0, 7.0], [96.0, 9.5], [102.0, 6.0], [100.0, 7.0], [104.0, 7.0], [106.0, 12.0], [110.0, 11.0], [108.0, 7.0], [114.0, 9.0], [112.0, 8.0], [116.0, 10.0], [118.0, 10.0], [120.0, 11.5], [122.0, 10.0], [124.0, 10.0], [126.0, 9.0], [130.0, 9.0], [134.0, 13.0], [132.0, 12.0], [128.0, 8.0], [142.0, 7.0], [136.0, 10.0], [138.0, 8.0], [140.0, 8.0], [146.0, 8.0], [150.0, 8.0], [148.0, 8.0], [144.0, 9.0], [156.0, 8.0], [154.0, 8.0], [152.0, 6.0], [158.0, 8.0], [164.0, 9.0], [166.0, 9.0], [162.0, 8.0], [160.0, 8.0], [168.0, 9.0], [174.0, 9.0], [170.0, 8.5], [172.0, 7.0], [176.0, 8.0], [178.0, 9.0], [180.0, 10.0], [182.0, 10.0], [186.0, 11.0], [184.0, 10.0], [190.0, 8.0], [188.0, 10.0], [192.0, 11.0], [196.0, 10.0], [198.0, 9.0], [194.0, 10.0], [202.0, 10.0], [206.0, 9.0], [200.0, 9.0], [204.0, 8.0], [212.0, 8.0], [210.0, 7.0], [208.0, 9.0], [214.0, 10.0], [218.0, 8.0], [222.0, 8.0], [216.0, 9.0], [220.0, 12.0], [230.0, 10.0], [228.0, 11.0], [224.0, 9.0], [226.0, 19.0], [232.0, 55.0], [238.0, 13.0], [236.0, 32.0], [234.0, 10.0], [242.0, 40.0], [240.0, 49.5], [246.0, 115.0], [248.0, 22.5], [250.0, 45.5], [260.0, 31.5], [262.0, 45.0], [258.0, 13.5], [264.0, 81.0], [256.0, 68.5], [274.0, 96.0], [300.0, 63.5], [298.0, 97.0], [296.0, 102.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 300.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 1.5, "minX": 4.0, "maxY": 115.0, "series": [{"data": [[4.0, 1.5], [6.0, 5.0], [22.0, 4.0], [30.0, 2.0], [34.0, 12.0], [36.0, 3.0], [40.0, 6.5], [42.0, 12.0], [44.0, 54.0], [46.0, 5.5], [48.0, 10.5], [50.0, 24.0], [52.0, 4.5], [54.0, 5.0], [56.0, 4.0], [58.0, 54.0], [60.0, 16.5], [62.0, 5.0], [64.0, 5.0], [66.0, 7.5], [68.0, 9.0], [70.0, 10.0], [74.0, 5.0], [72.0, 9.0], [76.0, 7.0], [78.0, 5.0], [80.0, 19.0], [82.0, 6.0], [86.0, 9.0], [84.0, 51.0], [90.0, 5.0], [88.0, 8.0], [94.0, 13.0], [92.0, 11.0], [98.0, 7.0], [96.0, 9.5], [102.0, 6.0], [100.0, 7.0], [104.0, 7.0], [106.0, 12.0], [110.0, 11.0], [108.0, 7.0], [114.0, 9.0], [112.0, 8.0], [116.0, 10.0], [118.0, 10.0], [120.0, 11.5], [122.0, 10.0], [124.0, 10.0], [126.0, 9.0], [130.0, 9.0], [134.0, 13.0], [132.0, 12.0], [128.0, 8.0], [142.0, 7.0], [136.0, 10.0], [138.0, 8.0], [140.0, 8.0], [146.0, 8.0], [150.0, 8.0], [148.0, 8.0], [144.0, 9.0], [156.0, 8.0], [154.0, 8.0], [152.0, 6.0], [158.0, 8.0], [164.0, 9.0], [166.0, 9.0], [162.0, 8.0], [160.0, 8.0], [168.0, 9.0], [174.0, 9.0], [170.0, 8.0], [172.0, 7.0], [176.0, 8.0], [178.0, 9.0], [180.0, 10.0], [182.0, 10.0], [186.0, 11.0], [184.0, 10.0], [190.0, 8.0], [188.0, 10.0], [192.0, 11.0], [196.0, 10.0], [198.0, 9.0], [194.0, 10.0], [202.0, 10.0], [206.0, 9.0], [200.0, 9.0], [204.0, 8.0], [212.0, 8.0], [210.0, 7.0], [208.0, 9.0], [214.0, 10.0], [218.0, 8.0], [222.0, 8.0], [216.0, 9.0], [220.0, 12.0], [230.0, 10.0], [228.0, 11.0], [224.0, 9.0], [226.0, 19.0], [232.0, 55.0], [238.0, 13.0], [236.0, 32.0], [234.0, 10.0], [242.0, 40.0], [240.0, 49.5], [246.0, 115.0], [248.0, 22.5], [250.0, 45.5], [260.0, 31.5], [262.0, 45.0], [258.0, 13.5], [264.0, 81.0], [256.0, 68.5], [274.0, 96.0], [300.0, 63.5], [298.0, 97.0], [296.0, 102.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 300.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 54.4, "minX": 1.74705306E12, "maxY": 204.1, "series": [{"data": [[1.74705456E12, 158.0], [1.74705426E12, 166.53333333333333], [1.74705306E12, 117.9], [1.74705396E12, 164.76666666666668], [1.74705336E12, 155.2], [1.74705366E12, 162.46666666666667], [1.74705468E12, 120.6], [1.74705438E12, 203.2], [1.74705324E12, 203.5], [1.74705474E12, 119.36666666666666], [1.74705444E12, 200.1], [1.74705414E12, 120.23333333333333], [1.74705384E12, 202.43333333333334], [1.74705354E12, 120.66666666666667], [1.74705312E12, 193.13333333333333], [1.74705486E12, 54.4], [1.74705342E12, 136.13333333333333], [1.7470536E12, 130.3], [1.74705462E12, 141.33333333333334], [1.74705432E12, 189.76666666666668], [1.74705402E12, 138.86666666666667], [1.7470533E12, 184.26666666666668], [1.74705372E12, 191.13333333333333], [1.74705408E12, 126.13333333333334], [1.74705378E12, 204.1], [1.74705348E12, 119.76666666666667], [1.74705318E12, 203.33333333333334], [1.7470548E12, 132.7], [1.7470545E12, 186.1], [1.7470542E12, 139.13333333333333], [1.7470539E12, 190.2]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74705486E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 54.4, "minX": 1.74705306E12, "maxY": 204.1, "series": [{"data": [[1.74705456E12, 158.0], [1.74705426E12, 165.63333333333333], [1.74705306E12, 117.9], [1.74705396E12, 164.76666666666668], [1.74705336E12, 155.2], [1.74705366E12, 162.46666666666667], [1.74705468E12, 120.5], [1.74705438E12, 203.2], [1.74705324E12, 203.5], [1.74705474E12, 119.46666666666667], [1.74705444E12, 200.1], [1.74705414E12, 120.0], [1.74705384E12, 202.33333333333334], [1.74705354E12, 120.7], [1.74705312E12, 193.13333333333333], [1.74705486E12, 54.4], [1.74705342E12, 136.13333333333333], [1.7470536E12, 130.3], [1.74705462E12, 141.33333333333334], [1.74705432E12, 190.66666666666666], [1.74705402E12, 138.86666666666667], [1.7470533E12, 184.26666666666668], [1.74705372E12, 191.13333333333333], [1.74705408E12, 125.56666666666666], [1.74705378E12, 204.1], [1.74705348E12, 119.73333333333333], [1.74705318E12, 203.33333333333334], [1.7470548E12, 132.7], [1.7470545E12, 186.1], [1.7470542E12, 139.93333333333334], [1.7470539E12, 190.3]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74705486E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 54.4, "minX": 1.74705306E12, "maxY": 204.1, "series": [{"data": [[1.74705456E12, 158.0], [1.74705426E12, 165.63333333333333], [1.74705306E12, 117.9], [1.74705396E12, 164.76666666666668], [1.74705336E12, 155.2], [1.74705366E12, 162.46666666666667], [1.74705468E12, 120.5], [1.74705438E12, 203.2], [1.74705324E12, 203.5], [1.74705474E12, 119.46666666666667], [1.74705444E12, 200.1], [1.74705414E12, 120.0], [1.74705384E12, 202.33333333333334], [1.74705354E12, 120.7], [1.74705312E12, 193.13333333333333], [1.74705486E12, 54.4], [1.74705342E12, 136.13333333333333], [1.7470536E12, 130.3], [1.74705462E12, 141.33333333333334], [1.74705432E12, 190.66666666666666], [1.74705402E12, 138.86666666666667], [1.7470533E12, 184.26666666666668], [1.74705372E12, 191.13333333333333], [1.74705408E12, 125.56666666666666], [1.74705378E12, 204.1], [1.74705348E12, 119.73333333333333], [1.74705318E12, 203.33333333333334], [1.7470548E12, 132.7], [1.7470545E12, 186.1], [1.7470542E12, 139.93333333333334], [1.7470539E12, 190.3]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74705486E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 54.4, "minX": 1.74705306E12, "maxY": 204.1, "series": [{"data": [[1.74705456E12, 158.0], [1.74705426E12, 165.63333333333333], [1.74705306E12, 117.9], [1.74705396E12, 164.76666666666668], [1.74705336E12, 155.2], [1.74705366E12, 162.46666666666667], [1.74705468E12, 120.5], [1.74705438E12, 203.2], [1.74705324E12, 203.5], [1.74705474E12, 119.46666666666667], [1.74705444E12, 200.1], [1.74705414E12, 120.0], [1.74705384E12, 202.33333333333334], [1.74705354E12, 120.7], [1.74705312E12, 193.13333333333333], [1.74705486E12, 54.4], [1.74705342E12, 136.13333333333333], [1.7470536E12, 130.3], [1.74705462E12, 141.33333333333334], [1.74705432E12, 190.66666666666666], [1.74705402E12, 138.86666666666667], [1.7470533E12, 184.26666666666668], [1.74705372E12, 191.13333333333333], [1.74705408E12, 125.56666666666666], [1.74705378E12, 204.1], [1.74705348E12, 119.73333333333333], [1.74705318E12, 203.33333333333334], [1.7470548E12, 132.7], [1.7470545E12, 186.1], [1.7470542E12, 139.93333333333334], [1.7470539E12, 190.3]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74705486E12, "title": "Total Transactions Per Second"}},
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

