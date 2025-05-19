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
        data: {"result": {"minY": 1055.0, "minX": 0.0, "maxY": 5745.0, "series": [{"data": [[0.0, 1055.0], [0.1, 2002.0], [0.2, 2047.0], [0.3, 2048.0], [0.4, 2049.0], [0.5, 2049.0], [0.6, 2049.0], [0.7, 2049.0], [0.8, 2050.0], [0.9, 2050.0], [1.0, 2051.0], [1.1, 2051.0], [1.2, 2051.0], [1.3, 2052.0], [1.4, 2053.0], [1.5, 2096.0], [1.6, 2096.0], [1.7, 2096.0], [1.8, 2096.0], [1.9, 2097.0], [2.0, 2097.0], [2.1, 2097.0], [2.2, 2098.0], [2.3, 2098.0], [2.4, 2098.0], [2.5, 2098.0], [2.6, 2099.0], [2.7, 2099.0], [2.8, 2099.0], [2.9, 2099.0], [3.0, 2099.0], [3.1, 2099.0], [3.2, 2099.0], [3.3, 2099.0], [3.4, 2099.0], [3.5, 2099.0], [3.6, 2100.0], [3.7, 2100.0], [3.8, 2100.0], [3.9, 2100.0], [4.0, 2101.0], [4.1, 2101.0], [4.2, 2101.0], [4.3, 2101.0], [4.4, 2101.0], [4.5, 2101.0], [4.6, 2102.0], [4.7, 2102.0], [4.8, 2102.0], [4.9, 2103.0], [5.0, 2103.0], [5.1, 2103.0], [5.2, 2146.0], [5.3, 2146.0], [5.4, 2146.0], [5.5, 2146.0], [5.6, 2147.0], [5.7, 2147.0], [5.8, 2147.0], [5.9, 2147.0], [6.0, 2147.0], [6.1, 2147.0], [6.2, 2147.0], [6.3, 2147.0], [6.4, 2148.0], [6.5, 2148.0], [6.6, 2148.0], [6.7, 2148.0], [6.8, 2148.0], [6.9, 2148.0], [7.0, 2148.0], [7.1, 2148.0], [7.2, 2148.0], [7.3, 2148.0], [7.4, 2148.0], [7.5, 2149.0], [7.6, 2149.0], [7.7, 2149.0], [7.8, 2149.0], [7.9, 2149.0], [8.0, 2149.0], [8.1, 2149.0], [8.2, 2149.0], [8.3, 2149.0], [8.4, 2149.0], [8.5, 2149.0], [8.6, 2149.0], [8.7, 2149.0], [8.8, 2149.0], [8.9, 2149.0], [9.0, 2149.0], [9.1, 2149.0], [9.2, 2149.0], [9.3, 2150.0], [9.4, 2150.0], [9.5, 2150.0], [9.6, 2150.0], [9.7, 2150.0], [9.8, 2150.0], [9.9, 2150.0], [10.0, 2150.0], [10.1, 2150.0], [10.2, 2150.0], [10.3, 2150.0], [10.4, 2150.0], [10.5, 2150.0], [10.6, 2150.0], [10.7, 2150.0], [10.8, 2150.0], [10.9, 2151.0], [11.0, 2151.0], [11.1, 2151.0], [11.2, 2151.0], [11.3, 2151.0], [11.4, 2151.0], [11.5, 2151.0], [11.6, 2151.0], [11.7, 2151.0], [11.8, 2151.0], [11.9, 2152.0], [12.0, 2152.0], [12.1, 2152.0], [12.2, 2152.0], [12.3, 2152.0], [12.4, 2152.0], [12.5, 2153.0], [12.6, 2153.0], [12.7, 2153.0], [12.8, 2193.0], [12.9, 2194.0], [13.0, 2195.0], [13.1, 2195.0], [13.2, 2196.0], [13.3, 2196.0], [13.4, 2196.0], [13.5, 2196.0], [13.6, 2196.0], [13.7, 2196.0], [13.8, 2196.0], [13.9, 2197.0], [14.0, 2197.0], [14.1, 2197.0], [14.2, 2197.0], [14.3, 2197.0], [14.4, 2197.0], [14.5, 2197.0], [14.6, 2197.0], [14.7, 2197.0], [14.8, 2197.0], [14.9, 2197.0], [15.0, 2198.0], [15.1, 2198.0], [15.2, 2198.0], [15.3, 2198.0], [15.4, 2198.0], [15.5, 2198.0], [15.6, 2198.0], [15.7, 2198.0], [15.8, 2198.0], [15.9, 2198.0], [16.0, 2198.0], [16.1, 2198.0], [16.2, 2198.0], [16.3, 2198.0], [16.4, 2198.0], [16.5, 2198.0], [16.6, 2198.0], [16.7, 2198.0], [16.8, 2198.0], [16.9, 2199.0], [17.0, 2199.0], [17.1, 2199.0], [17.2, 2199.0], [17.3, 2199.0], [17.4, 2199.0], [17.5, 2199.0], [17.6, 2199.0], [17.7, 2199.0], [17.8, 2199.0], [17.9, 2199.0], [18.0, 2199.0], [18.1, 2199.0], [18.2, 2199.0], [18.3, 2199.0], [18.4, 2199.0], [18.5, 2199.0], [18.6, 2199.0], [18.7, 2199.0], [18.8, 2199.0], [18.9, 2199.0], [19.0, 2199.0], [19.1, 2199.0], [19.2, 2199.0], [19.3, 2199.0], [19.4, 2199.0], [19.5, 2199.0], [19.6, 2200.0], [19.7, 2200.0], [19.8, 2200.0], [19.9, 2200.0], [20.0, 2200.0], [20.1, 2200.0], [20.2, 2200.0], [20.3, 2200.0], [20.4, 2200.0], [20.5, 2200.0], [20.6, 2200.0], [20.7, 2200.0], [20.8, 2200.0], [20.9, 2200.0], [21.0, 2200.0], [21.1, 2200.0], [21.2, 2200.0], [21.3, 2200.0], [21.4, 2200.0], [21.5, 2200.0], [21.6, 2201.0], [21.7, 2201.0], [21.8, 2201.0], [21.9, 2201.0], [22.0, 2201.0], [22.1, 2201.0], [22.2, 2201.0], [22.3, 2201.0], [22.4, 2201.0], [22.5, 2201.0], [22.6, 2201.0], [22.7, 2201.0], [22.8, 2201.0], [22.9, 2201.0], [23.0, 2201.0], [23.1, 2201.0], [23.2, 2201.0], [23.3, 2201.0], [23.4, 2201.0], [23.5, 2202.0], [23.6, 2202.0], [23.7, 2202.0], [23.8, 2202.0], [23.9, 2202.0], [24.0, 2202.0], [24.1, 2202.0], [24.2, 2202.0], [24.3, 2202.0], [24.4, 2203.0], [24.5, 2203.0], [24.6, 2203.0], [24.7, 2204.0], [24.8, 2204.0], [24.9, 2244.0], [25.0, 2244.0], [25.1, 2245.0], [25.2, 2245.0], [25.3, 2246.0], [25.4, 2246.0], [25.5, 2246.0], [25.6, 2246.0], [25.7, 2246.0], [25.8, 2247.0], [25.9, 2247.0], [26.0, 2247.0], [26.1, 2247.0], [26.2, 2247.0], [26.3, 2247.0], [26.4, 2247.0], [26.5, 2247.0], [26.6, 2247.0], [26.7, 2247.0], [26.8, 2247.0], [26.9, 2247.0], [27.0, 2247.0], [27.1, 2247.0], [27.2, 2248.0], [27.3, 2248.0], [27.4, 2248.0], [27.5, 2248.0], [27.6, 2248.0], [27.7, 2248.0], [27.8, 2248.0], [27.9, 2248.0], [28.0, 2248.0], [28.1, 2248.0], [28.2, 2248.0], [28.3, 2248.0], [28.4, 2248.0], [28.5, 2248.0], [28.6, 2248.0], [28.7, 2248.0], [28.8, 2249.0], [28.9, 2249.0], [29.0, 2249.0], [29.1, 2249.0], [29.2, 2249.0], [29.3, 2249.0], [29.4, 2249.0], [29.5, 2249.0], [29.6, 2249.0], [29.7, 2249.0], [29.8, 2249.0], [29.9, 2249.0], [30.0, 2249.0], [30.1, 2249.0], [30.2, 2249.0], [30.3, 2249.0], [30.4, 2249.0], [30.5, 2249.0], [30.6, 2249.0], [30.7, 2249.0], [30.8, 2249.0], [30.9, 2250.0], [31.0, 2250.0], [31.1, 2250.0], [31.2, 2250.0], [31.3, 2250.0], [31.4, 2250.0], [31.5, 2250.0], [31.6, 2250.0], [31.7, 2250.0], [31.8, 2250.0], [31.9, 2250.0], [32.0, 2250.0], [32.1, 2250.0], [32.2, 2250.0], [32.3, 2250.0], [32.4, 2251.0], [32.5, 2251.0], [32.6, 2251.0], [32.7, 2251.0], [32.8, 2251.0], [32.9, 2251.0], [33.0, 2251.0], [33.1, 2251.0], [33.2, 2251.0], [33.3, 2251.0], [33.4, 2252.0], [33.5, 2252.0], [33.6, 2252.0], [33.7, 2252.0], [33.8, 2252.0], [33.9, 2252.0], [34.0, 2252.0], [34.1, 2252.0], [34.2, 2253.0], [34.3, 2253.0], [34.4, 2253.0], [34.5, 2253.0], [34.6, 2254.0], [34.7, 2293.0], [34.8, 2294.0], [34.9, 2294.0], [35.0, 2295.0], [35.1, 2295.0], [35.2, 2295.0], [35.3, 2296.0], [35.4, 2296.0], [35.5, 2296.0], [35.6, 2296.0], [35.7, 2296.0], [35.8, 2296.0], [35.9, 2296.0], [36.0, 2296.0], [36.1, 2297.0], [36.2, 2297.0], [36.3, 2297.0], [36.4, 2297.0], [36.5, 2297.0], [36.6, 2297.0], [36.7, 2297.0], [36.8, 2297.0], [36.9, 2297.0], [37.0, 2297.0], [37.1, 2297.0], [37.2, 2297.0], [37.3, 2298.0], [37.4, 2298.0], [37.5, 2298.0], [37.6, 2298.0], [37.7, 2298.0], [37.8, 2298.0], [37.9, 2298.0], [38.0, 2298.0], [38.1, 2298.0], [38.2, 2298.0], [38.3, 2298.0], [38.4, 2298.0], [38.5, 2298.0], [38.6, 2299.0], [38.7, 2299.0], [38.8, 2299.0], [38.9, 2299.0], [39.0, 2299.0], [39.1, 2299.0], [39.2, 2299.0], [39.3, 2299.0], [39.4, 2299.0], [39.5, 2299.0], [39.6, 2299.0], [39.7, 2299.0], [39.8, 2299.0], [39.9, 2299.0], [40.0, 2299.0], [40.1, 2299.0], [40.2, 2299.0], [40.3, 2299.0], [40.4, 2299.0], [40.5, 2299.0], [40.6, 2299.0], [40.7, 2299.0], [40.8, 2299.0], [40.9, 2299.0], [41.0, 2300.0], [41.1, 2300.0], [41.2, 2300.0], [41.3, 2300.0], [41.4, 2300.0], [41.5, 2300.0], [41.6, 2300.0], [41.7, 2300.0], [41.8, 2300.0], [41.9, 2300.0], [42.0, 2300.0], [42.1, 2300.0], [42.2, 2300.0], [42.3, 2300.0], [42.4, 2300.0], [42.5, 2301.0], [42.6, 2301.0], [42.7, 2301.0], [42.8, 2301.0], [42.9, 2301.0], [43.0, 2301.0], [43.1, 2301.0], [43.2, 2302.0], [43.3, 2302.0], [43.4, 2302.0], [43.5, 2303.0], [43.6, 2303.0], [43.7, 2342.0], [43.8, 2343.0], [43.9, 2344.0], [44.0, 2344.0], [44.1, 2345.0], [44.2, 2345.0], [44.3, 2346.0], [44.4, 2346.0], [44.5, 2347.0], [44.6, 2347.0], [44.7, 2347.0], [44.8, 2347.0], [44.9, 2347.0], [45.0, 2347.0], [45.1, 2347.0], [45.2, 2347.0], [45.3, 2347.0], [45.4, 2348.0], [45.5, 2348.0], [45.6, 2348.0], [45.7, 2348.0], [45.8, 2348.0], [45.9, 2348.0], [46.0, 2348.0], [46.1, 2348.0], [46.2, 2348.0], [46.3, 2348.0], [46.4, 2348.0], [46.5, 2348.0], [46.6, 2348.0], [46.7, 2348.0], [46.8, 2349.0], [46.9, 2349.0], [47.0, 2349.0], [47.1, 2349.0], [47.2, 2349.0], [47.3, 2349.0], [47.4, 2349.0], [47.5, 2349.0], [47.6, 2349.0], [47.7, 2349.0], [47.8, 2350.0], [47.9, 2350.0], [48.0, 2350.0], [48.1, 2350.0], [48.2, 2350.0], [48.3, 2350.0], [48.4, 2350.0], [48.5, 2350.0], [48.6, 2350.0], [48.7, 2350.0], [48.8, 2350.0], [48.9, 2351.0], [49.0, 2351.0], [49.1, 2351.0], [49.2, 2351.0], [49.3, 2351.0], [49.4, 2351.0], [49.5, 2351.0], [49.6, 2351.0], [49.7, 2351.0], [49.8, 2351.0], [49.9, 2352.0], [50.0, 2352.0], [50.1, 2352.0], [50.2, 2391.0], [50.3, 2395.0], [50.4, 2395.0], [50.5, 2395.0], [50.6, 2395.0], [50.7, 2396.0], [50.8, 2396.0], [50.9, 2396.0], [51.0, 2397.0], [51.1, 2397.0], [51.2, 2397.0], [51.3, 2397.0], [51.4, 2397.0], [51.5, 2398.0], [51.6, 2398.0], [51.7, 2398.0], [51.8, 2398.0], [51.9, 2398.0], [52.0, 2398.0], [52.1, 2398.0], [52.2, 2399.0], [52.3, 2399.0], [52.4, 2399.0], [52.5, 2399.0], [52.6, 2399.0], [52.7, 2399.0], [52.8, 2399.0], [52.9, 2399.0], [53.0, 2400.0], [53.1, 2400.0], [53.2, 2400.0], [53.3, 2400.0], [53.4, 2400.0], [53.5, 2400.0], [53.6, 2401.0], [53.7, 2401.0], [53.8, 2401.0], [53.9, 2401.0], [54.0, 2401.0], [54.1, 2401.0], [54.2, 2402.0], [54.3, 2402.0], [54.4, 2402.0], [54.5, 2403.0], [54.6, 2404.0], [54.7, 2445.0], [54.8, 2446.0], [54.9, 2446.0], [55.0, 2446.0], [55.1, 2446.0], [55.2, 2447.0], [55.3, 2447.0], [55.4, 2447.0], [55.5, 2447.0], [55.6, 2447.0], [55.7, 2448.0], [55.8, 2448.0], [55.9, 2448.0], [56.0, 2448.0], [56.1, 2448.0], [56.2, 2448.0], [56.3, 2448.0], [56.4, 2448.0], [56.5, 2448.0], [56.6, 2448.0], [56.7, 2449.0], [56.8, 2449.0], [56.9, 2449.0], [57.0, 2449.0], [57.1, 2450.0], [57.2, 2450.0], [57.3, 2450.0], [57.4, 2450.0], [57.5, 2450.0], [57.6, 2450.0], [57.7, 2450.0], [57.8, 2450.0], [57.9, 2451.0], [58.0, 2451.0], [58.1, 2452.0], [58.2, 2452.0], [58.3, 2453.0], [58.4, 2453.0], [58.5, 2453.0], [58.6, 2494.0], [58.7, 2494.0], [58.8, 2495.0], [58.9, 2495.0], [59.0, 2496.0], [59.1, 2496.0], [59.2, 2496.0], [59.3, 2497.0], [59.4, 2497.0], [59.5, 2497.0], [59.6, 2498.0], [59.7, 2498.0], [59.8, 2498.0], [59.9, 2498.0], [60.0, 2498.0], [60.1, 2498.0], [60.2, 2498.0], [60.3, 2498.0], [60.4, 2498.0], [60.5, 2498.0], [60.6, 2498.0], [60.7, 2499.0], [60.8, 2499.0], [60.9, 2499.0], [61.0, 2499.0], [61.1, 2499.0], [61.2, 2499.0], [61.3, 2499.0], [61.4, 2499.0], [61.5, 2500.0], [61.6, 2500.0], [61.7, 2500.0], [61.8, 2500.0], [61.9, 2500.0], [62.0, 2500.0], [62.1, 2501.0], [62.2, 2501.0], [62.3, 2502.0], [62.4, 2502.0], [62.5, 2503.0], [62.6, 2544.0], [62.7, 2545.0], [62.8, 2546.0], [62.9, 2546.0], [63.0, 2547.0], [63.1, 2547.0], [63.2, 2547.0], [63.3, 2548.0], [63.4, 2548.0], [63.5, 2548.0], [63.6, 2548.0], [63.7, 2548.0], [63.8, 2548.0], [63.9, 2549.0], [64.0, 2549.0], [64.1, 2550.0], [64.2, 2550.0], [64.3, 2550.0], [64.4, 2550.0], [64.5, 2551.0], [64.6, 2551.0], [64.7, 2551.0], [64.8, 2551.0], [64.9, 2552.0], [65.0, 2552.0], [65.1, 2552.0], [65.2, 2553.0], [65.3, 2553.0], [65.4, 2554.0], [65.5, 2596.0], [65.6, 2598.0], [65.7, 2598.0], [65.8, 2598.0], [65.9, 2599.0], [66.0, 2599.0], [66.1, 2599.0], [66.2, 2600.0], [66.3, 2600.0], [66.4, 2600.0], [66.5, 2601.0], [66.6, 2601.0], [66.7, 2602.0], [66.8, 2603.0], [66.9, 2604.0], [67.0, 2643.0], [67.1, 2646.0], [67.2, 2646.0], [67.3, 2647.0], [67.4, 2647.0], [67.5, 2648.0], [67.6, 2648.0], [67.7, 2648.0], [67.8, 2649.0], [67.9, 2649.0], [68.0, 2649.0], [68.1, 2649.0], [68.2, 2649.0], [68.3, 2650.0], [68.4, 2650.0], [68.5, 2650.0], [68.6, 2651.0], [68.7, 2695.0], [68.8, 2696.0], [68.9, 2696.0], [69.0, 2697.0], [69.1, 2698.0], [69.2, 2698.0], [69.3, 2699.0], [69.4, 2699.0], [69.5, 2700.0], [69.6, 2701.0], [69.7, 2748.0], [69.8, 2749.0], [69.9, 2750.0], [70.0, 2750.0], [70.1, 2751.0], [70.2, 2796.0], [70.3, 2796.0], [70.4, 2797.0], [70.5, 2798.0], [70.6, 2799.0], [70.7, 2799.0], [70.8, 2800.0], [70.9, 2801.0], [71.0, 2848.0], [71.1, 2899.0], [71.2, 2900.0], [71.3, 2901.0], [71.4, 2948.0], [71.5, 3288.0], [71.6, 3715.0], [71.7, 3948.0], [71.8, 3998.0], [71.9, 4196.0], [72.0, 4197.0], [72.1, 4200.0], [72.2, 4202.0], [72.3, 4248.0], [72.4, 4249.0], [72.5, 4250.0], [72.6, 4252.0], [72.7, 4297.0], [72.8, 4299.0], [72.9, 4300.0], [73.0, 4300.0], [73.1, 4301.0], [73.2, 4345.0], [73.3, 4345.0], [73.4, 4346.0], [73.5, 4347.0], [73.6, 4347.0], [73.7, 4347.0], [73.8, 4347.0], [73.9, 4347.0], [74.0, 4347.0], [74.1, 4348.0], [74.2, 4348.0], [74.3, 4348.0], [74.4, 4349.0], [74.5, 4349.0], [74.6, 4350.0], [74.7, 4350.0], [74.8, 4350.0], [74.9, 4350.0], [75.0, 4396.0], [75.1, 4396.0], [75.2, 4396.0], [75.3, 4397.0], [75.4, 4398.0], [75.5, 4398.0], [75.6, 4398.0], [75.7, 4400.0], [75.8, 4401.0], [75.9, 4401.0], [76.0, 4402.0], [76.1, 4403.0], [76.2, 4445.0], [76.3, 4446.0], [76.4, 4447.0], [76.5, 4447.0], [76.6, 4447.0], [76.7, 4448.0], [76.8, 4448.0], [76.9, 4449.0], [77.0, 4449.0], [77.1, 4449.0], [77.2, 4450.0], [77.3, 4450.0], [77.4, 4450.0], [77.5, 4450.0], [77.6, 4452.0], [77.7, 4495.0], [77.8, 4495.0], [77.9, 4497.0], [78.0, 4497.0], [78.1, 4497.0], [78.2, 4498.0], [78.3, 4498.0], [78.4, 4498.0], [78.5, 4499.0], [78.6, 4499.0], [78.7, 4499.0], [78.8, 4500.0], [78.9, 4500.0], [79.0, 4500.0], [79.1, 4500.0], [79.2, 4501.0], [79.3, 4501.0], [79.4, 4502.0], [79.5, 4502.0], [79.6, 4545.0], [79.7, 4545.0], [79.8, 4545.0], [79.9, 4546.0], [80.0, 4546.0], [80.1, 4547.0], [80.2, 4547.0], [80.3, 4547.0], [80.4, 4547.0], [80.5, 4547.0], [80.6, 4548.0], [80.7, 4548.0], [80.8, 4548.0], [80.9, 4548.0], [81.0, 4549.0], [81.1, 4549.0], [81.2, 4549.0], [81.3, 4550.0], [81.4, 4550.0], [81.5, 4550.0], [81.6, 4551.0], [81.7, 4551.0], [81.8, 4552.0], [81.9, 4594.0], [82.0, 4595.0], [82.1, 4596.0], [82.2, 4597.0], [82.3, 4597.0], [82.4, 4597.0], [82.5, 4598.0], [82.6, 4598.0], [82.7, 4599.0], [82.8, 4599.0], [82.9, 4599.0], [83.0, 4600.0], [83.1, 4600.0], [83.2, 4601.0], [83.3, 4602.0], [83.4, 4646.0], [83.5, 4646.0], [83.6, 4646.0], [83.7, 4647.0], [83.8, 4647.0], [83.9, 4648.0], [84.0, 4649.0], [84.1, 4650.0], [84.2, 4650.0], [84.3, 4694.0], [84.4, 4695.0], [84.5, 4696.0], [84.6, 4696.0], [84.7, 4697.0], [84.8, 4697.0], [84.9, 4697.0], [85.0, 4697.0], [85.1, 4698.0], [85.2, 4699.0], [85.3, 4699.0], [85.4, 4699.0], [85.5, 4699.0], [85.6, 4700.0], [85.7, 4700.0], [85.8, 4700.0], [85.9, 4701.0], [86.0, 4702.0], [86.1, 4702.0], [86.2, 4745.0], [86.3, 4746.0], [86.4, 4746.0], [86.5, 4747.0], [86.6, 4747.0], [86.7, 4747.0], [86.8, 4748.0], [86.9, 4748.0], [87.0, 4748.0], [87.1, 4750.0], [87.2, 4751.0], [87.3, 4755.0], [87.4, 4795.0], [87.5, 4796.0], [87.6, 4797.0], [87.7, 4797.0], [87.8, 4797.0], [87.9, 4797.0], [88.0, 4798.0], [88.1, 4798.0], [88.2, 4798.0], [88.3, 4799.0], [88.4, 4799.0], [88.5, 4799.0], [88.6, 4800.0], [88.7, 4844.0], [88.8, 4846.0], [88.9, 4846.0], [89.0, 4847.0], [89.1, 4848.0], [89.2, 4848.0], [89.3, 4848.0], [89.4, 4849.0], [89.5, 4850.0], [89.6, 4850.0], [89.7, 4850.0], [89.8, 4851.0], [89.9, 4851.0], [90.0, 4896.0], [90.1, 4898.0], [90.2, 4899.0], [90.3, 4900.0], [90.4, 4900.0], [90.5, 4921.0], [90.6, 4945.0], [90.7, 4947.0], [90.8, 4947.0], [90.9, 4948.0], [91.0, 4948.0], [91.1, 4950.0], [91.2, 4951.0], [91.3, 4952.0], [91.4, 4995.0], [91.5, 4997.0], [91.6, 4997.0], [91.7, 4997.0], [91.8, 4998.0], [91.9, 4998.0], [92.0, 4999.0], [92.1, 4999.0], [92.2, 4999.0], [92.3, 5000.0], [92.4, 5002.0], [92.5, 5002.0], [92.6, 5046.0], [92.7, 5048.0], [92.8, 5048.0], [92.9, 5048.0], [93.0, 5049.0], [93.1, 5050.0], [93.2, 5094.0], [93.3, 5097.0], [93.4, 5097.0], [93.5, 5098.0], [93.6, 5098.0], [93.7, 5098.0], [93.8, 5100.0], [93.9, 5100.0], [94.0, 5100.0], [94.1, 5101.0], [94.2, 5101.0], [94.3, 5102.0], [94.4, 5146.0], [94.5, 5146.0], [94.6, 5146.0], [94.7, 5147.0], [94.8, 5147.0], [94.9, 5147.0], [95.0, 5149.0], [95.1, 5149.0], [95.2, 5149.0], [95.3, 5151.0], [95.4, 5151.0], [95.5, 5152.0], [95.6, 5194.0], [95.7, 5196.0], [95.8, 5198.0], [95.9, 5199.0], [96.0, 5200.0], [96.1, 5201.0], [96.2, 5202.0], [96.3, 5244.0], [96.4, 5245.0], [96.5, 5246.0], [96.6, 5247.0], [96.7, 5248.0], [96.8, 5248.0], [96.9, 5249.0], [97.0, 5250.0], [97.1, 5251.0], [97.2, 5255.0], [97.3, 5297.0], [97.4, 5298.0], [97.5, 5299.0], [97.6, 5343.0], [97.7, 5346.0], [97.8, 5348.0], [97.9, 5349.0], [98.0, 5351.0], [98.1, 5396.0], [98.2, 5398.0], [98.3, 5399.0], [98.4, 5403.0], [98.5, 5446.0], [98.6, 5449.0], [98.7, 5451.0], [98.8, 5498.0], [98.9, 5498.0], [99.0, 5499.0], [99.1, 5547.0], [99.2, 5548.0], [99.3, 5550.0], [99.4, 5551.0], [99.5, 5597.0], [99.6, 5597.0], [99.7, 5647.0], [99.8, 5650.0], [99.9, 5698.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 2.0, "minX": 1000.0, "maxY": 664.0, "series": [{"data": [[1000.0, 2.0], [2000.0, 108.0], [2100.0, 494.0], [2300.0, 370.0], [2200.0, 664.0], [2400.0, 262.0], [2500.0, 146.0], [2600.0, 102.0], [2700.0, 40.0], [2800.0, 12.0], [2900.0, 12.0], [3200.0, 2.0], [3700.0, 2.0], [3800.0, 2.0], [3900.0, 4.0], [4200.0, 26.0], [4300.0, 88.0], [4100.0, 6.0], [4600.0, 80.0], [4400.0, 96.0], [4500.0, 130.0], [4700.0, 92.0], [4800.0, 52.0], [5100.0, 68.0], [5000.0, 48.0], [4900.0, 62.0], [5200.0, 48.0], [5300.0, 24.0], [5400.0, 22.0], [5500.0, 20.0], [5600.0, 8.0], [5700.0, 2.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 5700.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 2.0, "minX": 1.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 3086.0, "series": [{"data": [], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 2.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 3086.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 6.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 999.5526315789475, "minX": 1.74706104E12, "maxY": 1000.0, "series": [{"data": [[1.74706134E12, 1000.0], [1.74706164E12, 1000.0], [1.74706284E12, 999.5526315789475], [1.74706254E12, 1000.0], [1.74706272E12, 1000.0], [1.74706242E12, 1000.0], [1.74706212E12, 1000.0], [1.74706104E12, 1000.0], [1.74706182E12, 1000.0], [1.74706266E12, 1000.0], [1.74706236E12, 1000.0], [1.74706206E12, 1000.0], [1.74706224E12, 1000.0], [1.74706194E12, 1000.0], [1.74706122E12, 1000.0], [1.74706152E12, 1000.0], [1.74706248E12, 1000.0], [1.74706218E12, 1000.0], [1.74706188E12, 1000.0], [1.74706128E12, 1000.0], [1.7470611E12, 1000.0], [1.7470614E12, 1000.0], [1.7470617E12, 1000.0], [1.74706278E12, 1000.0], [1.747062E12, 1000.0], [1.74706116E12, 1000.0], [1.74706146E12, 1000.0], [1.74706176E12, 1000.0], [1.74706158E12, 1000.0], [1.7470626E12, 1000.0], [1.7470623E12, 1000.0]], "isOverall": false, "label": "LoadTest", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74706284E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 3012.7744653272803, "minX": 994.0, "maxY": 5597.0, "series": [{"data": [[1000.0, 3012.7744653272803], [998.0, 5597.0], [996.0, 3288.0], [995.0, 5489.0], [994.0, 4348.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[999.9890109890108, 3017.0866192630856]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1000.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 165.3, "minX": 1.74706104E12, "maxY": 978.0, "series": [{"data": [[1.74706134E12, 838.7666666666667], [1.74706164E12, 942.9], [1.74706284E12, 889.3666666666667], [1.74706254E12, 872.2], [1.74706272E12, 925.7], [1.74706242E12, 891.0666666666667], [1.74706212E12, 943.6666666666666], [1.74706104E12, 337.46666666666664], [1.74706182E12, 872.6], [1.74706266E12, 941.8333333333334], [1.74706236E12, 907.5333333333333], [1.74706206E12, 925.8666666666667], [1.74706224E12, 927.3333333333334], [1.74706194E12, 926.7666666666667], [1.74706122E12, 944.0], [1.74706152E12, 890.1333333333333], [1.74706248E12, 890.1666666666666], [1.74706218E12, 925.2], [1.74706188E12, 942.7666666666667], [1.74706128E12, 926.6333333333333], [1.7470611E12, 945.2333333333333], [1.7470614E12, 873.5666666666667], [1.7470617E12, 925.3666666666667], [1.74706278E12, 907.8666666666667], [1.747062E12, 888.4333333333333], [1.74706116E12, 978.0], [1.74706146E12, 927.3666666666667], [1.74706176E12, 910.0666666666667], [1.74706158E12, 959.7333333333333], [1.7470626E12, 854.1666666666666], [1.7470623E12, 926.4666666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.74706134E12, 408.9], [1.74706164E12, 461.1], [1.74706284E12, 304.5], [1.74706254E12, 426.3], [1.74706272E12, 452.4], [1.74706242E12, 435.0], [1.74706212E12, 461.1], [1.74706104E12, 165.3], [1.74706182E12, 426.3], [1.74706266E12, 461.1], [1.74706236E12, 443.7], [1.74706206E12, 452.4], [1.74706224E12, 452.4], [1.74706194E12, 452.4], [1.74706122E12, 461.1], [1.74706152E12, 435.0], [1.74706248E12, 435.0], [1.74706218E12, 452.4], [1.74706188E12, 461.1], [1.74706128E12, 452.4], [1.7470611E12, 461.1], [1.7470614E12, 426.3], [1.7470617E12, 452.4], [1.74706278E12, 443.7], [1.747062E12, 435.0], [1.74706116E12, 478.5], [1.74706146E12, 452.4], [1.74706176E12, 443.7], [1.74706158E12, 469.8], [1.7470626E12, 417.6], [1.7470623E12, 452.4]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74706284E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 2137.947368421053, "minX": 1.74706104E12, "maxY": 5074.157894736841, "series": [{"data": [[1.74706134E12, 2523.553191489362], [1.74706164E12, 2261.358490566038], [1.74706284E12, 5074.157894736841], [1.74706254E12, 4895.306122448983], [1.74706272E12, 4596.0961538461515], [1.74706242E12, 4860.299999999998], [1.74706212E12, 2278.4905660377362], [1.74706104E12, 2137.947368421053], [1.74706182E12, 2467.5102040816314], [1.74706266E12, 4507.6415094339645], [1.74706236E12, 4560.019607843136], [1.74706206E12, 2322.634615384615], [1.74706224E12, 2305.2307692307695], [1.74706194E12, 2313.288461538463], [1.74706122E12, 2242.566037735849], [1.74706152E12, 2372.800000000001], [1.74706248E12, 4750.259999999999], [1.74706218E12, 2275.6923076923094], [1.74706188E12, 2241.396226415094], [1.74706128E12, 2331.9230769230767], [1.7470611E12, 2262.3773584905653], [1.7470614E12, 2478.8979591836737], [1.7470617E12, 2309.8076923076937], [1.74706278E12, 4787.254901960783], [1.747062E12, 2379.9199999999996], [1.74706116E12, 2199.218181818182], [1.74706146E12, 2306.7307692307695], [1.74706176E12, 2356.666666666668], [1.74706158E12, 2232.407407407407], [1.7470626E12, 4993.125000000002], [1.7470623E12, 2312.211538461539]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74706284E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 2137.789473684211, "minX": 1.74706104E12, "maxY": 4993.125000000002, "series": [{"data": [[1.74706134E12, 2523.4893617021285], [1.74706164E12, 2261.33962264151], [1.74706284E12, 4728.736842105262], [1.74706254E12, 4895.26530612245], [1.74706272E12, 4596.0961538461515], [1.74706242E12, 4860.280000000001], [1.74706212E12, 2278.4339622641505], [1.74706104E12, 2137.789473684211], [1.74706182E12, 2467.448979591838], [1.74706266E12, 4507.622641509436], [1.74706236E12, 4560.000000000001], [1.74706206E12, 2322.6153846153857], [1.74706224E12, 2305.211538461538], [1.74706194E12, 2313.250000000001], [1.74706122E12, 2242.54716981132], [1.74706152E12, 2372.7400000000002], [1.74706248E12, 4750.199999999999], [1.74706218E12, 2275.6923076923094], [1.74706188E12, 2241.3584905660377], [1.74706128E12, 2331.903846153846], [1.7470611E12, 2262.283018867926], [1.7470614E12, 2478.8163265306102], [1.7470617E12, 2309.75], [1.74706278E12, 4787.235294117646], [1.747062E12, 2379.9199999999996], [1.74706116E12, 2199.145454545454], [1.74706146E12, 2306.711538461539], [1.74706176E12, 2356.666666666668], [1.74706158E12, 2232.3703703703704], [1.7470626E12, 4993.125000000002], [1.7470623E12, 2312.192307692307]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74706284E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.74706104E12, "maxY": 2.8421052631578947, "series": [{"data": [[1.74706134E12, 0.04255319148936171], [1.74706164E12, 0.018867924528301883], [1.74706284E12, 0.07894736842105265], [1.74706254E12, 0.06122448979591837], [1.74706272E12, 0.07692307692307696], [1.74706242E12, 0.08], [1.74706212E12, 0.037735849056603814], [1.74706104E12, 2.8421052631578947], [1.74706182E12, 0.02040816326530612], [1.74706266E12, 0.03773584905660378], [1.74706236E12, 0.05882352941176473], [1.74706206E12, 0.0], [1.74706224E12, 0.019230769230769232], [1.74706194E12, 0.038461538461538464], [1.74706122E12, 0.018867924528301886], [1.74706152E12, 0.04000000000000001], [1.74706248E12, 0.06], [1.74706218E12, 0.038461538461538464], [1.74706188E12, 0.018867924528301886], [1.74706128E12, 0.019230769230769232], [1.7470611E12, 0.03773584905660377], [1.7470614E12, 0.04081632653061225], [1.7470617E12, 0.019230769230769225], [1.74706278E12, 0.05882352941176472], [1.747062E12, 0.02], [1.74706116E12, 0.018181818181818184], [1.74706146E12, 0.038461538461538464], [1.74706176E12, 0.058823529411764705], [1.74706158E12, 0.018518518518518514], [1.7470626E12, 0.08333333333333334], [1.7470623E12, 0.057692307692307696]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74706284E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 1055.0, "minX": 1.74706104E12, "maxY": 5745.0, "series": [{"data": [[1.74706134E12, 2997.0], [1.74706164E12, 2449.0], [1.74706284E12, 5745.0], [1.74706254E12, 5547.0], [1.74706272E12, 5251.0], [1.74706242E12, 5595.0], [1.74706212E12, 2500.0], [1.74706104E12, 2352.0], [1.74706182E12, 2801.0], [1.74706266E12, 5050.0], [1.74706236E12, 5248.0], [1.74706206E12, 2848.0], [1.74706224E12, 2900.0], [1.74706194E12, 2648.0], [1.74706122E12, 2797.0], [1.74706152E12, 2948.0], [1.74706248E12, 5194.0], [1.74706218E12, 2550.0], [1.74706188E12, 2548.0], [1.74706128E12, 2899.0], [1.7470611E12, 2548.0], [1.7470614E12, 2900.0], [1.7470617E12, 2698.0], [1.74706278E12, 5248.0], [1.747062E12, 2796.0], [1.74706116E12, 2498.0], [1.74706146E12, 2651.0], [1.74706176E12, 2750.0], [1.74706158E12, 2498.0], [1.7470626E12, 5500.0], [1.7470623E12, 2697.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.74706134E12, 2749.0], [1.74706164E12, 2364.2], [1.74706284E12, 5650.0], [1.74706254E12, 5251.0], [1.74706272E12, 5023.0], [1.74706242E12, 5348.9], [1.74706212E12, 2449.2], [1.74706104E12, 2348.0], [1.74706182E12, 2698.0], [1.74706266E12, 4760.2], [1.74706236E12, 5149.0], [1.74706206E12, 2600.5], [1.74706224E12, 2523.0], [1.74706194E12, 2500.5], [1.74706122E12, 2413.7], [1.74706152E12, 2691.0000000000005], [1.74706248E12, 5099.9], [1.74706218E12, 2474.0], [1.74706188E12, 2444.9], [1.74706128E12, 2699.5], [1.7470611E12, 2447.3], [1.7470614E12, 2650.0], [1.7470617E12, 2500.0], [1.74706278E12, 5133.2], [1.747062E12, 2641.5000000000005], [1.74706116E12, 2347.0], [1.74706146E12, 2525.0], [1.74706176E12, 2584.5], [1.74706158E12, 2353.9000000000005], [1.7470626E12, 5350.0], [1.7470623E12, 2551.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.74706134E12, 2997.0], [1.74706164E12, 2449.0], [1.74706284E12, 5745.0], [1.74706254E12, 5547.0], [1.74706272E12, 5251.0], [1.74706242E12, 5595.0], [1.74706212E12, 2500.0], [1.74706104E12, 2352.0], [1.74706182E12, 2801.0], [1.74706266E12, 5050.0], [1.74706236E12, 5248.0], [1.74706206E12, 2848.0], [1.74706224E12, 2900.0], [1.74706194E12, 2648.0], [1.74706122E12, 2797.0], [1.74706152E12, 2948.0], [1.74706248E12, 5194.0], [1.74706218E12, 2550.0], [1.74706188E12, 2548.0], [1.74706128E12, 2899.0], [1.7470611E12, 2548.0], [1.7470614E12, 2900.0], [1.7470617E12, 2698.0], [1.74706278E12, 5248.0], [1.747062E12, 2796.0], [1.74706116E12, 2498.0], [1.74706146E12, 2651.0], [1.74706176E12, 2750.0], [1.74706158E12, 2498.0], [1.7470626E12, 5500.0], [1.7470623E12, 2697.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.74706134E12, 2860.5], [1.74706164E12, 2447.0], [1.74706284E12, 5698.0], [1.74706254E12, 5402.099999999999], [1.74706272E12, 5244.0], [1.74706242E12, 5498.0], [1.74706212E12, 2495.0], [1.74706104E12, 2352.0], [1.74706182E12, 2796.1], [1.74706266E12, 4902.0], [1.74706236E12, 5199.0], [1.74706206E12, 2699.0], [1.74706224E12, 2700.0], [1.74706194E12, 2551.0], [1.74706122E12, 2548.0], [1.74706152E12, 2748.0], [1.74706248E12, 5101.0], [1.74706218E12, 2499.0], [1.74706188E12, 2450.0], [1.74706128E12, 2796.0], [1.7470611E12, 2450.0], [1.7470614E12, 2799.05], [1.7470617E12, 2650.0], [1.74706278E12, 5200.0], [1.747062E12, 2749.0], [1.74706116E12, 2399.0], [1.74706146E12, 2648.0], [1.74706176E12, 2695.0], [1.74706158E12, 2447.0], [1.7470626E12, 5409.45], [1.7470623E12, 2598.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.74706134E12, 2301.0], [1.74706164E12, 2100.0], [1.74706284E12, 4396.0], [1.74706254E12, 4401.0], [1.74706272E12, 4145.0], [1.74706242E12, 4345.0], [1.74706212E12, 2099.0], [1.74706104E12, 1055.0], [1.74706182E12, 2197.0], [1.74706266E12, 4249.0], [1.74706236E12, 2547.0], [1.74706206E12, 2051.0], [1.74706224E12, 2048.0], [1.74706194E12, 2099.0], [1.74706122E12, 2097.0], [1.74706152E12, 2049.0], [1.74706248E12, 4350.0], [1.74706218E12, 2053.0], [1.74706188E12, 2051.0], [1.74706128E12, 2101.0], [1.7470611E12, 2051.0], [1.7470614E12, 2101.0], [1.7470617E12, 2049.0], [1.74706278E12, 4398.0], [1.747062E12, 2052.0], [1.74706116E12, 2002.0], [1.74706146E12, 2097.0], [1.74706176E12, 2050.0], [1.74706158E12, 2047.0], [1.7470626E12, 4449.0], [1.7470623E12, 2051.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.74706134E12, 2453.0], [1.74706164E12, 2248.0], [1.74706284E12, 5398.0], [1.74706254E12, 4850.0], [1.74706272E12, 4547.5], [1.74706242E12, 4850.5], [1.74706212E12, 2251.0], [1.74706104E12, 2198.0], [1.74706182E12, 2499.0], [1.74706266E12, 4497.0], [1.74706236E12, 4552.0], [1.74706206E12, 2297.5], [1.74706224E12, 2250.5], [1.74706194E12, 2273.0], [1.74706122E12, 2201.0], [1.74706152E12, 2300.5], [1.74706248E12, 4722.5], [1.74706218E12, 2250.5], [1.74706188E12, 2248.0], [1.74706128E12, 2297.0], [1.7470611E12, 2249.0], [1.7470614E12, 2499.0], [1.7470617E12, 2252.0], [1.74706278E12, 4748.0], [1.747062E12, 2346.0], [1.74706116E12, 2199.0], [1.74706146E12, 2250.0], [1.74706176E12, 2348.0], [1.74706158E12, 2202.0], [1.7470626E12, 5145.0], [1.7470623E12, 2296.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74706284E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 2352.0, "minX": 2.0, "maxY": 4348.0, "series": [{"data": [[2.0, 2352.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[6.0, 4348.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 6.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 2.0, "maxY": 2352.0, "series": [{"data": [[2.0, 2352.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[6.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 6.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.7, "minX": 1.74706104E12, "maxY": 1.8333333333333333, "series": [{"data": [[1.74706134E12, 1.5666666666666667], [1.74706164E12, 1.7666666666666666], [1.74706284E12, 1.1333333333333333], [1.74706254E12, 1.6333333333333333], [1.74706272E12, 1.7333333333333334], [1.74706242E12, 1.6666666666666667], [1.74706212E12, 1.7666666666666666], [1.74706104E12, 0.7], [1.74706182E12, 1.6333333333333333], [1.74706266E12, 1.7666666666666666], [1.74706236E12, 1.7333333333333334], [1.74706206E12, 1.7333333333333334], [1.74706224E12, 1.7333333333333334], [1.74706194E12, 1.7333333333333334], [1.74706122E12, 1.7666666666666666], [1.74706152E12, 1.6666666666666667], [1.74706248E12, 1.6666666666666667], [1.74706218E12, 1.7333333333333334], [1.74706188E12, 1.7666666666666666], [1.74706128E12, 1.7333333333333334], [1.7470611E12, 1.7666666666666666], [1.7470614E12, 1.6333333333333333], [1.7470617E12, 1.7333333333333334], [1.74706278E12, 1.7], [1.747062E12, 1.6666666666666667], [1.74706116E12, 1.8333333333333333], [1.74706146E12, 1.7333333333333334], [1.74706176E12, 1.7], [1.74706158E12, 1.8], [1.7470626E12, 1.6], [1.7470623E12, 1.7666666666666666]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74706284E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.1, "minX": 1.74706104E12, "maxY": 1.8333333333333333, "series": [{"data": [[1.74706134E12, 1.5666666666666667], [1.74706164E12, 1.7666666666666666], [1.74706284E12, 1.1666666666666667], [1.74706254E12, 1.6333333333333333], [1.74706272E12, 1.7333333333333334], [1.74706242E12, 1.6666666666666667], [1.74706212E12, 1.7666666666666666], [1.74706104E12, 0.6333333333333333], [1.74706182E12, 1.6333333333333333], [1.74706266E12, 1.7666666666666666], [1.74706236E12, 1.7], [1.74706206E12, 1.7333333333333334], [1.74706224E12, 1.7333333333333334], [1.74706194E12, 1.7333333333333334], [1.74706122E12, 1.7666666666666666], [1.74706152E12, 1.6666666666666667], [1.74706248E12, 1.6666666666666667], [1.74706218E12, 1.7333333333333334], [1.74706188E12, 1.7666666666666666], [1.74706128E12, 1.7333333333333334], [1.7470611E12, 1.7666666666666666], [1.7470614E12, 1.6333333333333333], [1.7470617E12, 1.7333333333333334], [1.74706278E12, 1.7], [1.747062E12, 1.6666666666666667], [1.74706116E12, 1.8333333333333333], [1.74706146E12, 1.7333333333333334], [1.74706176E12, 1.7], [1.74706158E12, 1.8], [1.7470626E12, 1.6], [1.7470623E12, 1.7333333333333334]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.74706284E12, 0.1]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74706284E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.1, "minX": 1.74706104E12, "maxY": 1.8333333333333333, "series": [{"data": [[1.74706134E12, 1.5666666666666667], [1.74706164E12, 1.7666666666666666], [1.74706284E12, 1.1666666666666667], [1.74706254E12, 1.6333333333333333], [1.74706272E12, 1.7333333333333334], [1.74706242E12, 1.6666666666666667], [1.74706212E12, 1.7666666666666666], [1.74706104E12, 0.6333333333333333], [1.74706182E12, 1.6333333333333333], [1.74706266E12, 1.7666666666666666], [1.74706236E12, 1.7], [1.74706206E12, 1.7333333333333334], [1.74706224E12, 1.7333333333333334], [1.74706194E12, 1.7333333333333334], [1.74706122E12, 1.7666666666666666], [1.74706152E12, 1.6666666666666667], [1.74706248E12, 1.6666666666666667], [1.74706218E12, 1.7333333333333334], [1.74706188E12, 1.7666666666666666], [1.74706128E12, 1.7333333333333334], [1.7470611E12, 1.7666666666666666], [1.7470614E12, 1.6333333333333333], [1.7470617E12, 1.7333333333333334], [1.74706278E12, 1.7], [1.747062E12, 1.6666666666666667], [1.74706116E12, 1.8333333333333333], [1.74706146E12, 1.7333333333333334], [1.74706176E12, 1.7], [1.74706158E12, 1.8], [1.7470626E12, 1.6], [1.7470623E12, 1.7333333333333334]], "isOverall": false, "label": "HTTP Request-success", "isController": false}, {"data": [[1.74706284E12, 0.1]], "isOverall": false, "label": "HTTP Request-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74706284E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.1, "minX": 1.74706104E12, "maxY": 1.8333333333333333, "series": [{"data": [[1.74706134E12, 1.5666666666666667], [1.74706164E12, 1.7666666666666666], [1.74706284E12, 1.1666666666666667], [1.74706254E12, 1.6333333333333333], [1.74706272E12, 1.7333333333333334], [1.74706242E12, 1.6666666666666667], [1.74706212E12, 1.7666666666666666], [1.74706104E12, 0.6333333333333333], [1.74706182E12, 1.6333333333333333], [1.74706266E12, 1.7666666666666666], [1.74706236E12, 1.7], [1.74706206E12, 1.7333333333333334], [1.74706224E12, 1.7333333333333334], [1.74706194E12, 1.7333333333333334], [1.74706122E12, 1.7666666666666666], [1.74706152E12, 1.6666666666666667], [1.74706248E12, 1.6666666666666667], [1.74706218E12, 1.7333333333333334], [1.74706188E12, 1.7666666666666666], [1.74706128E12, 1.7333333333333334], [1.7470611E12, 1.7666666666666666], [1.7470614E12, 1.6333333333333333], [1.7470617E12, 1.7333333333333334], [1.74706278E12, 1.7], [1.747062E12, 1.6666666666666667], [1.74706116E12, 1.8333333333333333], [1.74706146E12, 1.7333333333333334], [1.74706176E12, 1.7], [1.74706158E12, 1.8], [1.7470626E12, 1.6], [1.7470623E12, 1.7333333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.74706284E12, 0.1]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74706284E12, "title": "Total Transactions Per Second"}},
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

