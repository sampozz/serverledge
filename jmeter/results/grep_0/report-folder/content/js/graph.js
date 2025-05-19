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
        data: {"result": {"minY": 896.0, "minX": 0.0, "maxY": 7197.0, "series": [{"data": [[0.0, 896.0], [0.1, 899.0], [0.2, 900.0], [0.3, 900.0], [0.4, 900.0], [0.5, 901.0], [0.6, 901.0], [0.7, 901.0], [0.8, 901.0], [0.9, 902.0], [1.0, 902.0], [1.1, 902.0], [1.2, 902.0], [1.3, 902.0], [1.4, 902.0], [1.5, 903.0], [1.6, 911.0], [1.7, 915.0], [1.8, 926.0], [1.9, 941.0], [2.0, 946.0], [2.1, 947.0], [2.2, 947.0], [2.3, 947.0], [2.4, 947.0], [2.5, 947.0], [2.6, 948.0], [2.7, 948.0], [2.8, 948.0], [2.9, 948.0], [3.0, 948.0], [3.1, 948.0], [3.2, 948.0], [3.3, 948.0], [3.4, 948.0], [3.5, 948.0], [3.6, 948.0], [3.7, 948.0], [3.8, 948.0], [3.9, 948.0], [4.0, 948.0], [4.1, 949.0], [4.2, 949.0], [4.3, 949.0], [4.4, 949.0], [4.5, 949.0], [4.6, 949.0], [4.7, 949.0], [4.8, 949.0], [4.9, 949.0], [5.0, 949.0], [5.1, 949.0], [5.2, 949.0], [5.3, 949.0], [5.4, 949.0], [5.5, 949.0], [5.6, 949.0], [5.7, 949.0], [5.8, 949.0], [5.9, 949.0], [6.0, 949.0], [6.1, 949.0], [6.2, 949.0], [6.3, 949.0], [6.4, 949.0], [6.5, 949.0], [6.6, 949.0], [6.7, 949.0], [6.8, 949.0], [6.9, 950.0], [7.0, 950.0], [7.1, 950.0], [7.2, 950.0], [7.3, 950.0], [7.4, 950.0], [7.5, 950.0], [7.6, 950.0], [7.7, 950.0], [7.8, 950.0], [7.9, 950.0], [8.0, 950.0], [8.1, 950.0], [8.2, 950.0], [8.3, 950.0], [8.4, 950.0], [8.5, 950.0], [8.6, 950.0], [8.7, 950.0], [8.8, 950.0], [8.9, 950.0], [9.0, 950.0], [9.1, 950.0], [9.2, 950.0], [9.3, 950.0], [9.4, 950.0], [9.5, 950.0], [9.6, 950.0], [9.7, 950.0], [9.8, 950.0], [9.9, 950.0], [10.0, 950.0], [10.1, 950.0], [10.2, 950.0], [10.3, 950.0], [10.4, 950.0], [10.5, 950.0], [10.6, 950.0], [10.7, 950.0], [10.8, 950.0], [10.9, 951.0], [11.0, 951.0], [11.1, 951.0], [11.2, 951.0], [11.3, 951.0], [11.4, 951.0], [11.5, 951.0], [11.6, 951.0], [11.7, 951.0], [11.8, 951.0], [11.9, 951.0], [12.0, 951.0], [12.1, 951.0], [12.2, 951.0], [12.3, 951.0], [12.4, 951.0], [12.5, 951.0], [12.6, 951.0], [12.7, 952.0], [12.8, 952.0], [12.9, 952.0], [13.0, 952.0], [13.1, 952.0], [13.2, 952.0], [13.3, 952.0], [13.4, 952.0], [13.5, 952.0], [13.6, 952.0], [13.7, 952.0], [13.8, 952.0], [13.9, 952.0], [14.0, 952.0], [14.1, 952.0], [14.2, 952.0], [14.3, 952.0], [14.4, 953.0], [14.5, 953.0], [14.6, 953.0], [14.7, 953.0], [14.8, 960.0], [14.9, 974.0], [15.0, 992.0], [15.1, 995.0], [15.2, 995.0], [15.3, 995.0], [15.4, 995.0], [15.5, 995.0], [15.6, 996.0], [15.7, 996.0], [15.8, 996.0], [15.9, 996.0], [16.0, 996.0], [16.1, 996.0], [16.2, 996.0], [16.3, 996.0], [16.4, 996.0], [16.5, 996.0], [16.6, 997.0], [16.7, 997.0], [16.8, 997.0], [16.9, 997.0], [17.0, 997.0], [17.1, 997.0], [17.2, 997.0], [17.3, 997.0], [17.4, 997.0], [17.5, 997.0], [17.6, 997.0], [17.7, 997.0], [17.8, 997.0], [17.9, 997.0], [18.0, 997.0], [18.1, 997.0], [18.2, 997.0], [18.3, 997.0], [18.4, 997.0], [18.5, 997.0], [18.6, 997.0], [18.7, 997.0], [18.8, 997.0], [18.9, 997.0], [19.0, 997.0], [19.1, 997.0], [19.2, 997.0], [19.3, 997.0], [19.4, 998.0], [19.5, 998.0], [19.6, 998.0], [19.7, 998.0], [19.8, 998.0], [19.9, 998.0], [20.0, 998.0], [20.1, 998.0], [20.2, 998.0], [20.3, 998.0], [20.4, 998.0], [20.5, 998.0], [20.6, 998.0], [20.7, 998.0], [20.8, 998.0], [20.9, 998.0], [21.0, 998.0], [21.1, 998.0], [21.2, 998.0], [21.3, 998.0], [21.4, 998.0], [21.5, 998.0], [21.6, 998.0], [21.7, 998.0], [21.8, 998.0], [21.9, 998.0], [22.0, 998.0], [22.1, 998.0], [22.2, 998.0], [22.3, 998.0], [22.4, 999.0], [22.5, 999.0], [22.6, 999.0], [22.7, 999.0], [22.8, 999.0], [22.9, 999.0], [23.0, 999.0], [23.1, 999.0], [23.2, 999.0], [23.3, 999.0], [23.4, 999.0], [23.5, 999.0], [23.6, 999.0], [23.7, 999.0], [23.8, 999.0], [23.9, 999.0], [24.0, 999.0], [24.1, 999.0], [24.2, 999.0], [24.3, 999.0], [24.4, 999.0], [24.5, 999.0], [24.6, 999.0], [24.7, 999.0], [24.8, 999.0], [24.9, 999.0], [25.0, 999.0], [25.1, 999.0], [25.2, 999.0], [25.3, 999.0], [25.4, 999.0], [25.5, 999.0], [25.6, 999.0], [25.7, 999.0], [25.8, 1000.0], [25.9, 1000.0], [26.0, 1000.0], [26.1, 1000.0], [26.2, 1000.0], [26.3, 1000.0], [26.4, 1000.0], [26.5, 1000.0], [26.6, 1000.0], [26.7, 1000.0], [26.8, 1000.0], [26.9, 1000.0], [27.0, 1000.0], [27.1, 1000.0], [27.2, 1000.0], [27.3, 1000.0], [27.4, 1000.0], [27.5, 1000.0], [27.6, 1000.0], [27.7, 1000.0], [27.8, 1000.0], [27.9, 1000.0], [28.0, 1000.0], [28.1, 1000.0], [28.2, 1000.0], [28.3, 1000.0], [28.4, 1000.0], [28.5, 1000.0], [28.6, 1000.0], [28.7, 1001.0], [28.8, 1001.0], [28.9, 1001.0], [29.0, 1001.0], [29.1, 1001.0], [29.2, 1001.0], [29.3, 1001.0], [29.4, 1001.0], [29.5, 1001.0], [29.6, 1001.0], [29.7, 1001.0], [29.8, 1001.0], [29.9, 1001.0], [30.0, 1001.0], [30.1, 1002.0], [30.2, 1002.0], [30.3, 1002.0], [30.4, 1002.0], [30.5, 1003.0], [30.6, 1004.0], [30.7, 1044.0], [30.8, 1046.0], [30.9, 1046.0], [31.0, 1046.0], [31.1, 1046.0], [31.2, 1046.0], [31.3, 1046.0], [31.4, 1046.0], [31.5, 1046.0], [31.6, 1046.0], [31.7, 1047.0], [31.8, 1047.0], [31.9, 1047.0], [32.0, 1047.0], [32.1, 1047.0], [32.2, 1047.0], [32.3, 1047.0], [32.4, 1047.0], [32.5, 1047.0], [32.6, 1047.0], [32.7, 1047.0], [32.8, 1047.0], [32.9, 1047.0], [33.0, 1047.0], [33.1, 1047.0], [33.2, 1047.0], [33.3, 1048.0], [33.4, 1048.0], [33.5, 1048.0], [33.6, 1048.0], [33.7, 1048.0], [33.8, 1048.0], [33.9, 1048.0], [34.0, 1048.0], [34.1, 1048.0], [34.2, 1048.0], [34.3, 1048.0], [34.4, 1048.0], [34.5, 1048.0], [34.6, 1048.0], [34.7, 1048.0], [34.8, 1048.0], [34.9, 1048.0], [35.0, 1048.0], [35.1, 1048.0], [35.2, 1048.0], [35.3, 1049.0], [35.4, 1049.0], [35.5, 1049.0], [35.6, 1049.0], [35.7, 1049.0], [35.8, 1049.0], [35.9, 1049.0], [36.0, 1049.0], [36.1, 1049.0], [36.2, 1049.0], [36.3, 1049.0], [36.4, 1049.0], [36.5, 1049.0], [36.6, 1049.0], [36.7, 1049.0], [36.8, 1050.0], [36.9, 1050.0], [37.0, 1050.0], [37.1, 1050.0], [37.2, 1050.0], [37.3, 1050.0], [37.4, 1050.0], [37.5, 1050.0], [37.6, 1050.0], [37.7, 1050.0], [37.8, 1050.0], [37.9, 1050.0], [38.0, 1050.0], [38.1, 1051.0], [38.2, 1051.0], [38.3, 1051.0], [38.4, 1051.0], [38.5, 1051.0], [38.6, 1051.0], [38.7, 1051.0], [38.8, 1051.0], [38.9, 1051.0], [39.0, 1052.0], [39.1, 1061.0], [39.2, 1070.0], [39.3, 1095.0], [39.4, 1096.0], [39.5, 1097.0], [39.6, 1097.0], [39.7, 1097.0], [39.8, 1097.0], [39.9, 1097.0], [40.0, 1097.0], [40.1, 1098.0], [40.2, 1098.0], [40.3, 1098.0], [40.4, 1098.0], [40.5, 1099.0], [40.6, 1099.0], [40.7, 1099.0], [40.8, 1099.0], [40.9, 1101.0], [41.0, 1102.0], [41.1, 1146.0], [41.2, 1171.0], [41.3, 1174.0], [41.4, 1255.0], [41.5, 1265.0], [41.6, 1287.0], [41.7, 1334.0], [41.8, 1385.0], [41.9, 1414.0], [42.0, 1423.0], [42.1, 1487.0], [42.2, 1550.0], [42.3, 1672.0], [42.4, 1741.0], [42.5, 1849.0], [42.6, 1850.0], [42.7, 1853.0], [42.8, 1898.0], [42.9, 1898.0], [43.0, 1898.0], [43.1, 1898.0], [43.2, 1898.0], [43.3, 1899.0], [43.4, 1899.0], [43.5, 1899.0], [43.6, 1900.0], [43.7, 1900.0], [43.8, 1900.0], [43.9, 1901.0], [44.0, 1901.0], [44.1, 1901.0], [44.2, 1901.0], [44.3, 1901.0], [44.4, 1902.0], [44.5, 1902.0], [44.6, 1902.0], [44.7, 1902.0], [44.8, 1945.0], [44.9, 1946.0], [45.0, 1947.0], [45.1, 1947.0], [45.2, 1947.0], [45.3, 1947.0], [45.4, 1947.0], [45.5, 1948.0], [45.6, 1948.0], [45.7, 1948.0], [45.8, 1948.0], [45.9, 1948.0], [46.0, 1948.0], [46.1, 1949.0], [46.2, 1949.0], [46.3, 1949.0], [46.4, 1949.0], [46.5, 1949.0], [46.6, 1949.0], [46.7, 1950.0], [46.8, 1950.0], [46.9, 1950.0], [47.0, 1950.0], [47.1, 1950.0], [47.2, 1950.0], [47.3, 1950.0], [47.4, 1951.0], [47.5, 1951.0], [47.6, 1951.0], [47.7, 1951.0], [47.8, 1951.0], [47.9, 1952.0], [48.0, 1952.0], [48.1, 1953.0], [48.2, 1992.0], [48.3, 1996.0], [48.4, 1996.0], [48.5, 1996.0], [48.6, 1996.0], [48.7, 1997.0], [48.8, 1997.0], [48.9, 1997.0], [49.0, 1997.0], [49.1, 1998.0], [49.2, 1998.0], [49.3, 1998.0], [49.4, 1998.0], [49.5, 1998.0], [49.6, 1998.0], [49.7, 1998.0], [49.8, 1998.0], [49.9, 1998.0], [50.0, 1999.0], [50.1, 1999.0], [50.2, 1999.0], [50.3, 1999.0], [50.4, 1999.0], [50.5, 2000.0], [50.6, 2000.0], [50.7, 2000.0], [50.8, 2000.0], [50.9, 2001.0], [51.0, 2001.0], [51.1, 2001.0], [51.2, 2002.0], [51.3, 2002.0], [51.4, 2002.0], [51.5, 2046.0], [51.6, 2047.0], [51.7, 2047.0], [51.8, 2047.0], [51.9, 2047.0], [52.0, 2047.0], [52.1, 2048.0], [52.2, 2048.0], [52.3, 2048.0], [52.4, 2048.0], [52.5, 2048.0], [52.6, 2048.0], [52.7, 2049.0], [52.8, 2049.0], [52.9, 2049.0], [53.0, 2049.0], [53.1, 2050.0], [53.2, 2050.0], [53.3, 2050.0], [53.4, 2052.0], [53.5, 2098.0], [53.6, 2098.0], [53.7, 2099.0], [53.8, 2101.0], [53.9, 2101.0], [54.0, 2147.0], [54.1, 2149.0], [54.2, 2149.0], [54.3, 2800.0], [54.4, 2848.0], [54.5, 2850.0], [54.6, 2850.0], [54.7, 2852.0], [54.8, 2896.0], [54.9, 2897.0], [55.0, 2897.0], [55.1, 2898.0], [55.2, 2898.0], [55.3, 2898.0], [55.4, 2899.0], [55.5, 2899.0], [55.6, 2899.0], [55.7, 2900.0], [55.8, 2900.0], [55.9, 2900.0], [56.0, 2900.0], [56.1, 2900.0], [56.2, 2900.0], [56.3, 2902.0], [56.4, 2902.0], [56.5, 2902.0], [56.6, 2902.0], [56.7, 2902.0], [56.8, 2945.0], [56.9, 2946.0], [57.0, 2946.0], [57.1, 2947.0], [57.2, 2947.0], [57.3, 2947.0], [57.4, 2948.0], [57.5, 2948.0], [57.6, 2948.0], [57.7, 2948.0], [57.8, 2948.0], [57.9, 2948.0], [58.0, 2948.0], [58.1, 2949.0], [58.2, 2949.0], [58.3, 2949.0], [58.4, 2949.0], [58.5, 2950.0], [58.6, 2950.0], [58.7, 2950.0], [58.8, 2950.0], [58.9, 2950.0], [59.0, 2951.0], [59.1, 2951.0], [59.2, 2951.0], [59.3, 2952.0], [59.4, 2952.0], [59.5, 2953.0], [59.6, 2996.0], [59.7, 2996.0], [59.8, 2998.0], [59.9, 2998.0], [60.0, 2998.0], [60.1, 2998.0], [60.2, 2998.0], [60.3, 2998.0], [60.4, 2998.0], [60.5, 2998.0], [60.6, 2998.0], [60.7, 2999.0], [60.8, 2999.0], [60.9, 3000.0], [61.0, 3000.0], [61.1, 3000.0], [61.2, 3000.0], [61.3, 3000.0], [61.4, 3001.0], [61.5, 3001.0], [61.6, 3001.0], [61.7, 3001.0], [61.8, 3002.0], [61.9, 3002.0], [62.0, 3003.0], [62.1, 3044.0], [62.2, 3046.0], [62.3, 3047.0], [62.4, 3047.0], [62.5, 3048.0], [62.6, 3048.0], [62.7, 3048.0], [62.8, 3048.0], [62.9, 3049.0], [63.0, 3049.0], [63.1, 3049.0], [63.2, 3049.0], [63.3, 3049.0], [63.4, 3049.0], [63.5, 3050.0], [63.6, 3051.0], [63.7, 3052.0], [63.8, 3053.0], [63.9, 3096.0], [64.0, 3098.0], [64.1, 3098.0], [64.2, 3098.0], [64.3, 3099.0], [64.4, 3101.0], [64.5, 3102.0], [64.6, 3146.0], [64.7, 3147.0], [64.8, 3148.0], [64.9, 3198.0], [65.0, 3849.0], [65.1, 3850.0], [65.2, 3852.0], [65.3, 3897.0], [65.4, 3897.0], [65.5, 3897.0], [65.6, 3899.0], [65.7, 3899.0], [65.8, 3900.0], [65.9, 3901.0], [66.0, 3901.0], [66.1, 3946.0], [66.2, 3947.0], [66.3, 3947.0], [66.4, 3949.0], [66.5, 3949.0], [66.6, 3949.0], [66.7, 3950.0], [66.8, 3950.0], [66.9, 3951.0], [67.0, 3996.0], [67.1, 3997.0], [67.2, 3997.0], [67.3, 3998.0], [67.4, 3998.0], [67.5, 3998.0], [67.6, 3999.0], [67.7, 3999.0], [67.8, 3999.0], [67.9, 3999.0], [68.0, 4000.0], [68.1, 4000.0], [68.2, 4000.0], [68.3, 4001.0], [68.4, 4001.0], [68.5, 4001.0], [68.6, 4001.0], [68.7, 4003.0], [68.8, 4046.0], [68.9, 4047.0], [69.0, 4047.0], [69.1, 4047.0], [69.2, 4048.0], [69.3, 4048.0], [69.4, 4049.0], [69.5, 4050.0], [69.6, 4050.0], [69.7, 4052.0], [69.8, 4096.0], [69.9, 4097.0], [70.0, 4098.0], [70.1, 4098.0], [70.2, 4099.0], [70.3, 4099.0], [70.4, 4100.0], [70.5, 4147.0], [70.6, 4149.0], [70.7, 4149.0], [70.8, 4196.0], [70.9, 4198.0], [71.0, 4749.0], [71.1, 4752.0], [71.2, 4797.0], [71.3, 4798.0], [71.4, 4799.0], [71.5, 4799.0], [71.6, 4800.0], [71.7, 4800.0], [71.8, 4801.0], [71.9, 4801.0], [72.0, 4801.0], [72.1, 4848.0], [72.2, 4848.0], [72.3, 4848.0], [72.4, 4848.0], [72.5, 4849.0], [72.6, 4849.0], [72.7, 4850.0], [72.8, 4850.0], [72.9, 4850.0], [73.0, 4851.0], [73.1, 4852.0], [73.2, 4852.0], [73.3, 4893.0], [73.4, 4895.0], [73.5, 4896.0], [73.6, 4897.0], [73.7, 4898.0], [73.8, 4898.0], [73.9, 4898.0], [74.0, 4898.0], [74.1, 4899.0], [74.2, 4899.0], [74.3, 4899.0], [74.4, 4899.0], [74.5, 4899.0], [74.6, 4900.0], [74.7, 4900.0], [74.8, 4900.0], [74.9, 4901.0], [75.0, 4901.0], [75.1, 4946.0], [75.2, 4947.0], [75.3, 4947.0], [75.4, 4947.0], [75.5, 4948.0], [75.6, 4948.0], [75.7, 4948.0], [75.8, 4948.0], [75.9, 4948.0], [76.0, 4949.0], [76.1, 4949.0], [76.2, 4949.0], [76.3, 4950.0], [76.4, 4950.0], [76.5, 4951.0], [76.6, 4951.0], [76.7, 4952.0], [76.8, 4995.0], [76.9, 4995.0], [77.0, 4996.0], [77.1, 4996.0], [77.2, 4996.0], [77.3, 4997.0], [77.4, 4997.0], [77.5, 4997.0], [77.6, 4997.0], [77.7, 4997.0], [77.8, 4998.0], [77.9, 4998.0], [78.0, 4998.0], [78.1, 4998.0], [78.2, 4999.0], [78.3, 4999.0], [78.4, 4999.0], [78.5, 4999.0], [78.6, 4999.0], [78.7, 5000.0], [78.8, 5000.0], [78.9, 5000.0], [79.0, 5001.0], [79.1, 5001.0], [79.2, 5002.0], [79.3, 5047.0], [79.4, 5047.0], [79.5, 5048.0], [79.6, 5049.0], [79.7, 5049.0], [79.8, 5050.0], [79.9, 5050.0], [80.0, 5051.0], [80.1, 5095.0], [80.2, 5097.0], [80.3, 5097.0], [80.4, 5098.0], [80.5, 5098.0], [80.6, 5099.0], [80.7, 5099.0], [80.8, 5099.0], [80.9, 5100.0], [81.0, 5145.0], [81.1, 5146.0], [81.2, 5148.0], [81.3, 5148.0], [81.4, 5149.0], [81.5, 5152.0], [81.6, 5202.0], [81.7, 5245.0], [81.8, 5249.0], [81.9, 5250.0], [82.0, 5299.0], [82.1, 5800.0], [82.2, 5801.0], [82.3, 5801.0], [82.4, 5846.0], [82.5, 5847.0], [82.6, 5848.0], [82.7, 5849.0], [82.8, 5851.0], [82.9, 5895.0], [83.0, 5896.0], [83.1, 5898.0], [83.2, 5898.0], [83.3, 5899.0], [83.4, 5899.0], [83.5, 5899.0], [83.6, 5899.0], [83.7, 5899.0], [83.8, 5900.0], [83.9, 5900.0], [84.0, 5901.0], [84.1, 5902.0], [84.2, 5902.0], [84.3, 5914.0], [84.4, 5943.0], [84.5, 5946.0], [84.6, 5946.0], [84.7, 5947.0], [84.8, 5947.0], [84.9, 5948.0], [85.0, 5948.0], [85.1, 5948.0], [85.2, 5949.0], [85.3, 5949.0], [85.4, 5950.0], [85.5, 5950.0], [85.6, 5950.0], [85.7, 5951.0], [85.8, 5952.0], [85.9, 5957.0], [86.0, 5994.0], [86.1, 5996.0], [86.2, 5997.0], [86.3, 5998.0], [86.4, 5998.0], [86.5, 5998.0], [86.6, 5998.0], [86.7, 5999.0], [86.8, 5999.0], [86.9, 5999.0], [87.0, 6000.0], [87.1, 6000.0], [87.2, 6002.0], [87.3, 6018.0], [87.4, 6044.0], [87.5, 6045.0], [87.6, 6045.0], [87.7, 6046.0], [87.8, 6046.0], [87.9, 6047.0], [88.0, 6047.0], [88.1, 6048.0], [88.2, 6048.0], [88.3, 6048.0], [88.4, 6049.0], [88.5, 6049.0], [88.6, 6050.0], [88.7, 6050.0], [88.8, 6051.0], [88.9, 6053.0], [89.0, 6096.0], [89.1, 6096.0], [89.2, 6097.0], [89.3, 6097.0], [89.4, 6097.0], [89.5, 6098.0], [89.6, 6098.0], [89.7, 6099.0], [89.8, 6099.0], [89.9, 6099.0], [90.0, 6100.0], [90.1, 6100.0], [90.2, 6100.0], [90.3, 6101.0], [90.4, 6101.0], [90.5, 6141.0], [90.6, 6146.0], [90.7, 6146.0], [90.8, 6147.0], [90.9, 6148.0], [91.0, 6148.0], [91.1, 6149.0], [91.2, 6149.0], [91.3, 6150.0], [91.4, 6150.0], [91.5, 6150.0], [91.6, 6184.0], [91.7, 6196.0], [91.8, 6197.0], [91.9, 6198.0], [92.0, 6200.0], [92.1, 6202.0], [92.2, 6243.0], [92.3, 6272.0], [92.4, 6276.0], [92.5, 6310.0], [92.6, 6399.0], [92.7, 6496.0], [92.8, 6549.0], [92.9, 6551.0], [93.0, 6694.0], [93.1, 6794.0], [93.2, 6799.0], [93.3, 6800.0], [93.4, 6802.0], [93.5, 6846.0], [93.6, 6846.0], [93.7, 6846.0], [93.8, 6847.0], [93.9, 6848.0], [94.0, 6848.0], [94.1, 6848.0], [94.2, 6848.0], [94.3, 6849.0], [94.4, 6849.0], [94.5, 6850.0], [94.6, 6850.0], [94.7, 6894.0], [94.8, 6895.0], [94.9, 6897.0], [95.0, 6897.0], [95.1, 6897.0], [95.2, 6898.0], [95.3, 6898.0], [95.4, 6898.0], [95.5, 6898.0], [95.6, 6899.0], [95.7, 6899.0], [95.8, 6899.0], [95.9, 6900.0], [96.0, 6900.0], [96.1, 6901.0], [96.2, 6901.0], [96.3, 6903.0], [96.4, 6944.0], [96.5, 6945.0], [96.6, 6947.0], [96.7, 6948.0], [96.8, 6948.0], [96.9, 6948.0], [97.0, 6948.0], [97.1, 6949.0], [97.2, 6949.0], [97.3, 6949.0], [97.4, 6949.0], [97.5, 6950.0], [97.6, 6950.0], [97.7, 6951.0], [97.8, 6951.0], [97.9, 6952.0], [98.0, 6994.0], [98.1, 6995.0], [98.2, 6996.0], [98.3, 6997.0], [98.4, 6998.0], [98.5, 6998.0], [98.6, 6998.0], [98.7, 6999.0], [98.8, 6999.0], [98.9, 7000.0], [99.0, 7001.0], [99.1, 7045.0], [99.2, 7046.0], [99.3, 7047.0], [99.4, 7047.0], [99.5, 7048.0], [99.6, 7095.0], [99.7, 7098.0], [99.8, 7098.0], [99.9, 7195.0], [100.0, 7197.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 2.0, "minX": 800.0, "maxY": 838.0, "series": [{"data": [[800.0, 4.0], [900.0, 838.0], [1000.0, 494.0], [1100.0, 18.0], [1200.0, 10.0], [1300.0, 6.0], [1400.0, 10.0], [1500.0, 2.0], [1600.0, 4.0], [1700.0, 2.0], [1800.0, 36.0], [1900.0, 226.0], [2000.0, 108.0], [2100.0, 18.0], [2800.0, 44.0], [2900.0, 172.0], [3000.0, 112.0], [3100.0, 20.0], [3800.0, 28.0], [3900.0, 70.0], [4000.0, 80.0], [4100.0, 20.0], [4800.0, 98.0], [4700.0, 18.0], [4900.0, 134.0], [5000.0, 72.0], [5100.0, 24.0], [5200.0, 16.0], [5300.0, 2.0], [5800.0, 54.0], [6000.0, 98.0], [5900.0, 106.0], [6100.0, 66.0], [6200.0, 16.0], [6300.0, 4.0], [6500.0, 6.0], [6600.0, 4.0], [6400.0, 4.0], [6800.0, 84.0], [6900.0, 100.0], [6700.0, 8.0], [7000.0, 30.0], [7100.0, 6.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 7100.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 1380.0, "minX": 1.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1892.0, "series": [{"data": [], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 1380.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 1892.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1000.0, "minX": 1.74703656E12, "maxY": 1000.0, "series": [{"data": [[1.74703662E12, 1000.0], [1.7470368E12, 1000.0], [1.74703812E12, 1000.0], [1.74703782E12, 1000.0], [1.74703752E12, 1000.0], [1.74703722E12, 1000.0], [1.74703692E12, 1000.0], [1.74703824E12, 1000.0], [1.74703794E12, 1000.0], [1.74703764E12, 1000.0], [1.74703734E12, 1000.0], [1.74703704E12, 1000.0], [1.74703674E12, 1000.0], [1.74703836E12, 1000.0], [1.74703806E12, 1000.0], [1.74703776E12, 1000.0], [1.74703746E12, 1000.0], [1.74703716E12, 1000.0], [1.74703656E12, 1000.0], [1.74703686E12, 1000.0], [1.74703818E12, 1000.0], [1.74703788E12, 1000.0], [1.74703758E12, 1000.0], [1.74703728E12, 1000.0], [1.74703698E12, 1000.0], [1.74703668E12, 1000.0], [1.7470383E12, 1000.0], [1.747038E12, 1000.0], [1.7470377E12, 1000.0], [1.7470374E12, 1000.0], [1.7470371E12, 1000.0]], "isOverall": false, "label": "LoadTest", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74703836E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 2918.660757946214, "minX": 1000.0, "maxY": 2918.660757946214, "series": [{"data": [[1000.0, 2918.660757946214]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[1000.0, 2918.660757946214]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1000.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 104.4, "minX": 1.74703656E12, "maxY": 1088.5666666666666, "series": [{"data": [[1.74703662E12, 994.1666666666666], [1.7470368E12, 1069.6333333333334], [1.74703812E12, 1049.9], [1.74703782E12, 816.6333333333333], [1.74703752E12, 1088.2333333333333], [1.74703722E12, 976.6333333333333], [1.74703692E12, 1069.4333333333334], [1.74703824E12, 1049.5333333333333], [1.74703794E12, 1085.4666666666667], [1.74703764E12, 1012.0], [1.74703734E12, 1068.0333333333333], [1.74703704E12, 976.4666666666667], [1.74703674E12, 1068.5333333333333], [1.74703836E12, 284.0], [1.74703806E12, 1084.3], [1.74703776E12, 213.1], [1.74703746E12, 1068.5666666666666], [1.74703716E12, 905.8333333333334], [1.74703656E12, 692.6333333333333], [1.74703686E12, 1088.5666666666666], [1.74703818E12, 1066.0], [1.74703788E12, 1065.5333333333333], [1.74703758E12, 1088.2666666666667], [1.74703728E12, 1082.4], [1.74703698E12, 266.96666666666664], [1.74703668E12, 1083.7], [1.7470383E12, 1085.7666666666667], [1.747038E12, 1067.6333333333334], [1.7470377E12, 603.6], [1.7470374E12, 1067.5333333333333], [1.7470371E12, 958.6333333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.74703662E12, 487.2], [1.7470368E12, 522.0], [1.74703812E12, 513.3], [1.74703782E12, 400.2], [1.74703752E12, 530.7], [1.74703722E12, 478.5], [1.74703692E12, 522.0], [1.74703824E12, 513.3], [1.74703794E12, 530.7], [1.74703764E12, 495.9], [1.74703734E12, 522.0], [1.74703704E12, 478.5], [1.74703674E12, 522.0], [1.74703836E12, 139.2], [1.74703806E12, 530.7], [1.74703776E12, 104.4], [1.74703746E12, 522.0], [1.74703716E12, 443.7], [1.74703656E12, 339.3], [1.74703686E12, 530.7], [1.74703818E12, 522.0], [1.74703788E12, 522.0], [1.74703758E12, 530.7], [1.74703728E12, 530.7], [1.74703698E12, 130.5], [1.74703668E12, 530.7], [1.7470383E12, 530.7], [1.747038E12, 522.0], [1.7470377E12, 295.8], [1.7470374E12, 522.0], [1.7470371E12, 469.8]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74703836E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 980.9090909090908, "minX": 1.74703656E12, "maxY": 6933.500000000001, "series": [{"data": [[1.74703662E12, 994.9821428571427], [1.7470368E12, 2990.1166666666672], [1.74703812E12, 6026.796610169495], [1.74703782E12, 992.260869565217], [1.74703752E12, 2442.1967213114754], [1.74703722E12, 980.9090909090908], [1.74703692E12, 1983.966666666667], [1.74703824E12, 5344.52542372881], [1.74703794E12, 5054.163934426231], [1.74703764E12, 981.6315789473686], [1.74703734E12, 4215.433333333333], [1.74703704E12, 997.8909090909091], [1.74703674E12, 3002.5166666666664], [1.74703836E12, 1376.6875], [1.74703806E12, 6417.918032786887], [1.74703776E12, 990.4166666666666], [1.74703746E12, 4109.4666666666635], [1.74703716E12, 1016.1764705882355], [1.74703656E12, 1019.9487179487179], [1.74703686E12, 2067.147540983607], [1.74703818E12, 6118.133333333332], [1.74703788E12, 993.5166666666672], [1.74703758E12, 1586.7049180327865], [1.74703728E12, 995.983606557377], [1.74703698E12, 1354.2666666666669], [1.74703668E12, 1118.229508196721], [1.7470383E12, 4694.590163934427], [1.747038E12, 6933.500000000001], [1.7470377E12, 991.1470588235294], [1.7470374E12, 4942.933333333334], [1.7470371E12, 999.5370370370371]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74703836E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 980.890909090909, "minX": 1.74703656E12, "maxY": 6933.449999999998, "series": [{"data": [[1.74703662E12, 994.9642857142856], [1.7470368E12, 2990.083333333333], [1.74703812E12, 6026.796610169495], [1.74703782E12, 992.260869565217], [1.74703752E12, 2442.1803278688517], [1.74703722E12, 980.890909090909], [1.74703692E12, 1983.9500000000005], [1.74703824E12, 5344.457627118644], [1.74703794E12, 5054.131147540982], [1.74703764E12, 981.5789473684212], [1.74703734E12, 4215.4], [1.74703704E12, 997.8727272727272], [1.74703674E12, 3002.483333333332], [1.74703836E12, 1376.6875], [1.74703806E12, 6417.9016393442635], [1.74703776E12, 990.4166666666666], [1.74703746E12, 4109.416666666666], [1.74703716E12, 1016.1372549019607], [1.74703656E12, 1019.7948717948716], [1.74703686E12, 2067.06557377049], [1.74703818E12, 6118.049999999999], [1.74703788E12, 993.5166666666672], [1.74703758E12, 1586.7049180327865], [1.74703728E12, 995.9508196721312], [1.74703698E12, 1354.2666666666669], [1.74703668E12, 1118.1967213114756], [1.7470383E12, 4694.55737704918], [1.747038E12, 6933.449999999998], [1.7470377E12, 991.1470588235294], [1.7470374E12, 4942.9000000000015], [1.7470371E12, 999.5185185185185]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74703836E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.74703656E12, "maxY": 0.7692307692307689, "series": [{"data": [[1.74703662E12, 0.03571428571428572], [1.7470368E12, 0.05], [1.74703812E12, 0.05084745762711865], [1.74703782E12, 0.0], [1.74703752E12, 0.049180327868852486], [1.74703722E12, 0.018181818181818202], [1.74703692E12, 0.016666666666666684], [1.74703824E12, 0.03389830508474577], [1.74703794E12, 0.0655737704918033], [1.74703764E12, 0.035087719298245626], [1.74703734E12, 0.03333333333333334], [1.74703704E12, 0.018181818181818184], [1.74703674E12, 0.033333333333333354], [1.74703836E12, 0.0], [1.74703806E12, 0.03278688524590165], [1.74703776E12, 0.0], [1.74703746E12, 0.01666666666666667], [1.74703716E12, 0.019607843137254905], [1.74703656E12, 0.7692307692307689], [1.74703686E12, 0.03278688524590165], [1.74703818E12, 0.11666666666666664], [1.74703788E12, 0.01666666666666667], [1.74703758E12, 0.14754098360655737], [1.74703728E12, 0.0], [1.74703698E12, 0.06666666666666667], [1.74703668E12, 0.016393442622950824], [1.7470383E12, 0.0], [1.747038E12, 0.11666666666666664], [1.7470377E12, 0.02941176470588237], [1.7470374E12, 0.05], [1.7470371E12, 0.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74703836E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 896.0, "minX": 1.74703656E12, "maxY": 7197.0, "series": [{"data": [[1.74703662E12, 1051.0], [1.7470368E12, 3997.0], [1.74703812E12, 6298.0], [1.74703782E12, 1099.0], [1.74703752E12, 4099.0], [1.74703722E12, 1098.0], [1.74703692E12, 2149.0], [1.74703824E12, 6489.0], [1.74703794E12, 7048.0], [1.74703764E12, 1099.0], [1.74703734E12, 5147.0], [1.74703704E12, 1095.0], [1.74703674E12, 3198.0], [1.74703836E12, 2948.0], [1.74703806E12, 7197.0], [1.74703776E12, 1097.0], [1.74703746E12, 4948.0], [1.74703716E12, 1146.0], [1.74703656E12, 1550.0], [1.74703686E12, 2950.0], [1.74703818E12, 6694.0], [1.74703788E12, 1097.0], [1.74703758E12, 2164.0], [1.74703728E12, 1098.0], [1.74703698E12, 2002.0], [1.74703668E12, 2949.0], [1.7470383E12, 5301.0], [1.747038E12, 7098.0], [1.7470377E12, 1296.0], [1.7470374E12, 5097.0], [1.7470371E12, 1198.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.74703662E12, 1049.0], [1.7470368E12, 3049.9], [1.74703812E12, 6196.0], [1.74703782E12, 1048.0], [1.74703752E12, 3049.0], [1.74703722E12, 1049.0], [1.74703692E12, 2097.8], [1.74703824E12, 6099.0], [1.74703794E12, 7000.4], [1.74703764E12, 1049.0], [1.74703734E12, 5001.9], [1.74703704E12, 1050.0], [1.74703674E12, 3097.8], [1.74703836E12, 2848.0], [1.74703806E12, 6998.0], [1.74703776E12, 1071.5], [1.74703746E12, 4848.0], [1.74703716E12, 1097.7], [1.74703656E12, 1097.0], [1.74703686E12, 2132.9], [1.74703818E12, 6486.3], [1.74703788E12, 1049.0], [1.74703758E12, 2000.7], [1.74703728E12, 1050.7], [1.74703698E12, 1947.0], [1.74703668E12, 1133.0000000000002], [1.7470383E12, 5148.0], [1.747038E12, 7002.7], [1.7470377E12, 1048.1], [1.7470374E12, 5000.0], [1.7470371E12, 1049.1]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.74703662E12, 1051.0], [1.7470368E12, 3997.0], [1.74703812E12, 6298.0], [1.74703782E12, 1099.0], [1.74703752E12, 4099.0], [1.74703722E12, 1098.0], [1.74703692E12, 2149.0], [1.74703824E12, 6489.0], [1.74703794E12, 7048.0], [1.74703764E12, 1099.0], [1.74703734E12, 5147.0], [1.74703704E12, 1095.0], [1.74703674E12, 3198.0], [1.74703836E12, 2948.0], [1.74703806E12, 7197.0], [1.74703776E12, 1097.0], [1.74703746E12, 4948.0], [1.74703716E12, 1146.0], [1.74703656E12, 1550.0], [1.74703686E12, 2950.0], [1.74703818E12, 6694.0], [1.74703788E12, 1097.0], [1.74703758E12, 2164.0], [1.74703728E12, 1098.0], [1.74703698E12, 2002.0], [1.74703668E12, 2949.0], [1.7470383E12, 5301.0], [1.747038E12, 7098.0], [1.7470377E12, 1296.0], [1.7470374E12, 5097.0], [1.7470371E12, 1198.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.74703662E12, 1050.0], [1.7470368E12, 3099.5499999999993], [1.74703812E12, 6202.0], [1.74703782E12, 1067.4499999999998], [1.74703752E12, 3098.85], [1.74703722E12, 1052.0], [1.74703692E12, 2101.0], [1.74703824E12, 6150.0], [1.74703794E12, 7046.85], [1.74703764E12, 1051.0], [1.74703734E12, 5098.9], [1.74703704E12, 1051.0], [1.74703674E12, 3101.0], [1.74703836E12, 2948.0], [1.74703806E12, 7099.7], [1.74703776E12, 1097.0], [1.74703746E12, 4849.95], [1.74703716E12, 1100.0], [1.74703656E12, 1101.0], [1.74703686E12, 2947.7], [1.74703818E12, 6550.9], [1.74703788E12, 1050.95], [1.74703758E12, 2047.85], [1.74703728E12, 1090.2499999999998], [1.74703698E12, 2002.0], [1.74703668E12, 2754.099999999995], [1.7470383E12, 5248.85], [1.747038E12, 7050.8], [1.7470377E12, 1097.0], [1.7470374E12, 5046.95], [1.7470371E12, 1098.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.74703662E12, 926.0], [1.7470368E12, 2850.0], [1.74703812E12, 5801.0], [1.74703782E12, 902.0], [1.74703752E12, 1898.0], [1.74703722E12, 899.0], [1.74703692E12, 1847.0], [1.74703824E12, 4848.0], [1.74703794E12, 948.0], [1.74703764E12, 901.0], [1.74703734E12, 2048.0], [1.74703704E12, 947.0], [1.74703674E12, 2898.0], [1.74703836E12, 902.0], [1.74703806E12, 5847.0], [1.74703776E12, 902.0], [1.74703746E12, 3850.0], [1.74703716E12, 915.0], [1.74703656E12, 896.0], [1.74703686E12, 1853.0], [1.74703818E12, 5800.0], [1.74703788E12, 900.0], [1.74703758E12, 900.0], [1.74703728E12, 901.0], [1.74703698E12, 902.0], [1.74703668E12, 902.0], [1.7470383E12, 2900.0], [1.747038E12, 6799.0], [1.7470377E12, 900.0], [1.7470374E12, 4799.0], [1.7470371E12, 902.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.74703662E12, 999.0], [1.7470368E12, 2949.5], [1.74703812E12, 5999.0], [1.74703782E12, 997.0], [1.74703752E12, 2098.0], [1.74703722E12, 995.0], [1.74703692E12, 1994.0], [1.74703824E12, 5099.0], [1.74703794E12, 5899.0], [1.74703764E12, 997.0], [1.74703734E12, 4025.0], [1.74703704E12, 999.0], [1.74703674E12, 2998.5], [1.74703836E12, 1047.0], [1.74703806E12, 6147.0], [1.74703776E12, 997.0], [1.74703746E12, 4001.0], [1.74703716E12, 1000.0], [1.74703656E12, 999.0], [1.74703686E12, 1998.0], [1.74703818E12, 6097.5], [1.74703788E12, 997.0], [1.74703758E12, 1741.0], [1.74703728E12, 998.0], [1.74703698E12, 998.0], [1.74703668E12, 998.0], [1.7470383E12, 4896.0], [1.747038E12, 6946.0], [1.7470377E12, 996.0], [1.7470374E12, 4949.0], [1.7470371E12, 999.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74703836E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 1945.0, "minX": 2.0, "maxY": 1999.0, "series": [{"data": [[2.0, 1999.0], [4.0, 1945.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 4.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 1945.0, "minX": 2.0, "maxY": 1999.0, "series": [{"data": [[2.0, 1999.0], [4.0, 1945.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 4.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.36666666666666664, "minX": 1.74703656E12, "maxY": 2.2333333333333334, "series": [{"data": [[1.74703662E12, 1.9], [1.7470368E12, 2.0], [1.74703812E12, 1.9666666666666666], [1.74703782E12, 1.5666666666666667], [1.74703752E12, 2.0], [1.74703722E12, 1.8666666666666667], [1.74703692E12, 2.0], [1.74703824E12, 1.9333333333333333], [1.74703794E12, 2.2333333333333334], [1.74703764E12, 1.8666666666666667], [1.74703734E12, 2.066666666666667], [1.74703704E12, 1.8333333333333333], [1.74703674E12, 2.0], [1.74703836E12, 0.4666666666666667], [1.74703806E12, 2.0], [1.74703776E12, 0.36666666666666664], [1.74703746E12, 1.9333333333333333], [1.74703716E12, 1.6666666666666667], [1.74703656E12, 1.3], [1.74703686E12, 2.0], [1.74703818E12, 2.0], [1.74703788E12, 2.0], [1.74703758E12, 2.0], [1.74703728E12, 2.1], [1.74703698E12, 0.4666666666666667], [1.74703668E12, 2.1], [1.7470383E12, 1.9333333333333333], [1.747038E12, 2.0], [1.7470377E12, 1.1666666666666667], [1.7470374E12, 2.0], [1.7470371E12, 1.8]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74703836E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.4, "minX": 1.74703656E12, "maxY": 2.033333333333333, "series": [{"data": [[1.74703662E12, 1.8666666666666667], [1.7470368E12, 2.0], [1.74703812E12, 1.9666666666666666], [1.74703782E12, 1.5333333333333334], [1.74703752E12, 2.033333333333333], [1.74703722E12, 1.8333333333333333], [1.74703692E12, 2.0], [1.74703824E12, 1.9666666666666666], [1.74703794E12, 2.033333333333333], [1.74703764E12, 1.9], [1.74703734E12, 2.0], [1.74703704E12, 1.8333333333333333], [1.74703674E12, 2.0], [1.74703836E12, 0.5333333333333333], [1.74703806E12, 2.033333333333333], [1.74703776E12, 0.4], [1.74703746E12, 2.0], [1.74703716E12, 1.7], [1.74703656E12, 1.3], [1.74703686E12, 2.033333333333333], [1.74703818E12, 2.0], [1.74703788E12, 2.0], [1.74703758E12, 2.033333333333333], [1.74703728E12, 2.033333333333333], [1.74703698E12, 0.5], [1.74703668E12, 2.033333333333333], [1.7470383E12, 2.033333333333333], [1.747038E12, 2.0], [1.7470377E12, 1.1333333333333333], [1.7470374E12, 2.0], [1.7470371E12, 1.8]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74703836E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.4, "minX": 1.74703656E12, "maxY": 2.033333333333333, "series": [{"data": [[1.74703662E12, 1.8666666666666667], [1.7470368E12, 2.0], [1.74703812E12, 1.9666666666666666], [1.74703782E12, 1.5333333333333334], [1.74703752E12, 2.033333333333333], [1.74703722E12, 1.8333333333333333], [1.74703692E12, 2.0], [1.74703824E12, 1.9666666666666666], [1.74703794E12, 2.033333333333333], [1.74703764E12, 1.9], [1.74703734E12, 2.0], [1.74703704E12, 1.8333333333333333], [1.74703674E12, 2.0], [1.74703836E12, 0.5333333333333333], [1.74703806E12, 2.033333333333333], [1.74703776E12, 0.4], [1.74703746E12, 2.0], [1.74703716E12, 1.7], [1.74703656E12, 1.3], [1.74703686E12, 2.033333333333333], [1.74703818E12, 2.0], [1.74703788E12, 2.0], [1.74703758E12, 2.033333333333333], [1.74703728E12, 2.033333333333333], [1.74703698E12, 0.5], [1.74703668E12, 2.033333333333333], [1.7470383E12, 2.033333333333333], [1.747038E12, 2.0], [1.7470377E12, 1.1333333333333333], [1.7470374E12, 2.0], [1.7470371E12, 1.8]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74703836E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.4, "minX": 1.74703656E12, "maxY": 2.033333333333333, "series": [{"data": [[1.74703662E12, 1.8666666666666667], [1.7470368E12, 2.0], [1.74703812E12, 1.9666666666666666], [1.74703782E12, 1.5333333333333334], [1.74703752E12, 2.033333333333333], [1.74703722E12, 1.8333333333333333], [1.74703692E12, 2.0], [1.74703824E12, 1.9666666666666666], [1.74703794E12, 2.033333333333333], [1.74703764E12, 1.9], [1.74703734E12, 2.0], [1.74703704E12, 1.8333333333333333], [1.74703674E12, 2.0], [1.74703836E12, 0.5333333333333333], [1.74703806E12, 2.033333333333333], [1.74703776E12, 0.4], [1.74703746E12, 2.0], [1.74703716E12, 1.7], [1.74703656E12, 1.3], [1.74703686E12, 2.033333333333333], [1.74703818E12, 2.0], [1.74703788E12, 2.0], [1.74703758E12, 2.033333333333333], [1.74703728E12, 2.033333333333333], [1.74703698E12, 0.5], [1.74703668E12, 2.033333333333333], [1.7470383E12, 2.033333333333333], [1.747038E12, 2.0], [1.7470377E12, 1.1333333333333333], [1.7470374E12, 2.0], [1.7470371E12, 1.8]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74703836E12, "title": "Total Transactions Per Second"}},
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

