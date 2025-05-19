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
        data: {"result": {"minY": 2008.0, "minX": 0.0, "maxY": 29275.0, "series": [{"data": [[0.0, 2008.0], [0.1, 2008.0], [0.2, 3280.0], [0.3, 3315.0], [0.4, 3322.0], [0.5, 3333.0], [0.6, 3333.0], [0.7, 3352.0], [0.8, 3391.0], [0.9, 3416.0], [1.0, 3416.0], [1.1, 3423.0], [1.2, 3428.0], [1.3, 3433.0], [1.4, 3453.0], [1.5, 3461.0], [1.6, 3464.0], [1.7, 3465.0], [1.8, 3471.0], [1.9, 3479.0], [2.0, 3482.0], [2.1, 3483.0], [2.2, 3485.0], [2.3, 3487.0], [2.4, 3493.0], [2.5, 3493.0], [2.6, 3507.0], [2.7, 3530.0], [2.8, 3550.0], [2.9, 3571.0], [3.0, 3585.0], [3.1, 3590.0], [3.2, 3591.0], [3.3, 3595.0], [3.4, 3598.0], [3.5, 3601.0], [3.6, 3601.0], [3.7, 3604.0], [3.8, 3605.0], [3.9, 3606.0], [4.0, 3610.0], [4.1, 3611.0], [4.2, 3612.0], [4.3, 3613.0], [4.4, 3615.0], [4.5, 3615.0], [4.6, 3623.0], [4.7, 3623.0], [4.8, 3626.0], [4.9, 3628.0], [5.0, 3646.0], [5.1, 3646.0], [5.2, 3648.0], [5.3, 3649.0], [5.4, 3651.0], [5.5, 3656.0], [5.6, 3666.0], [5.7, 3672.0], [5.8, 3675.0], [5.9, 3676.0], [6.0, 3683.0], [6.1, 3685.0], [6.2, 3686.0], [6.3, 3689.0], [6.4, 3690.0], [6.5, 3691.0], [6.6, 3693.0], [6.7, 3693.0], [6.8, 3695.0], [6.9, 3696.0], [7.0, 3697.0], [7.1, 3697.0], [7.2, 3697.0], [7.3, 3698.0], [7.4, 3700.0], [7.5, 3700.0], [7.6, 3703.0], [7.7, 3704.0], [7.8, 3705.0], [7.9, 3705.0], [8.0, 3705.0], [8.1, 3706.0], [8.2, 3706.0], [8.3, 3706.0], [8.4, 3706.0], [8.5, 3706.0], [8.6, 3707.0], [8.7, 3707.0], [8.8, 3707.0], [8.9, 3707.0], [9.0, 3708.0], [9.1, 3708.0], [9.2, 3708.0], [9.3, 3708.0], [9.4, 3708.0], [9.5, 3708.0], [9.6, 3708.0], [9.7, 3708.0], [9.8, 3709.0], [9.9, 3709.0], [10.0, 3710.0], [10.1, 3710.0], [10.2, 3710.0], [10.3, 3711.0], [10.4, 3711.0], [10.5, 3711.0], [10.6, 3711.0], [10.7, 3712.0], [10.8, 3712.0], [10.9, 3712.0], [11.0, 3712.0], [11.1, 3712.0], [11.2, 3712.0], [11.3, 3713.0], [11.4, 3713.0], [11.5, 3713.0], [11.6, 3713.0], [11.7, 3714.0], [11.8, 3714.0], [11.9, 3714.0], [12.0, 3714.0], [12.1, 3714.0], [12.2, 3714.0], [12.3, 3715.0], [12.4, 3715.0], [12.5, 3715.0], [12.6, 3715.0], [12.7, 3715.0], [12.8, 3715.0], [12.9, 3715.0], [13.0, 3715.0], [13.1, 3715.0], [13.2, 3716.0], [13.3, 3716.0], [13.4, 3716.0], [13.5, 3716.0], [13.6, 3716.0], [13.7, 3716.0], [13.8, 3716.0], [13.9, 3716.0], [14.0, 3716.0], [14.1, 3717.0], [14.2, 3717.0], [14.3, 3717.0], [14.4, 3717.0], [14.5, 3717.0], [14.6, 3717.0], [14.7, 3717.0], [14.8, 3717.0], [14.9, 3717.0], [15.0, 3717.0], [15.1, 3717.0], [15.2, 3717.0], [15.3, 3717.0], [15.4, 3717.0], [15.5, 3717.0], [15.6, 3718.0], [15.7, 3718.0], [15.8, 3718.0], [15.9, 3718.0], [16.0, 3718.0], [16.1, 3718.0], [16.2, 3718.0], [16.3, 3718.0], [16.4, 3719.0], [16.5, 3719.0], [16.6, 3719.0], [16.7, 3719.0], [16.8, 3719.0], [16.9, 3719.0], [17.0, 3719.0], [17.1, 3719.0], [17.2, 3719.0], [17.3, 3719.0], [17.4, 3720.0], [17.5, 3720.0], [17.6, 3720.0], [17.7, 3720.0], [17.8, 3720.0], [17.9, 3720.0], [18.0, 3720.0], [18.1, 3720.0], [18.2, 3720.0], [18.3, 3720.0], [18.4, 3720.0], [18.5, 3720.0], [18.6, 3720.0], [18.7, 3720.0], [18.8, 3720.0], [18.9, 3721.0], [19.0, 3721.0], [19.1, 3721.0], [19.2, 3721.0], [19.3, 3721.0], [19.4, 3721.0], [19.5, 3721.0], [19.6, 3721.0], [19.7, 3721.0], [19.8, 3721.0], [19.9, 3721.0], [20.0, 3721.0], [20.1, 3721.0], [20.2, 3721.0], [20.3, 3722.0], [20.4, 3722.0], [20.5, 3722.0], [20.6, 3722.0], [20.7, 3723.0], [20.8, 3723.0], [20.9, 3723.0], [21.0, 3723.0], [21.1, 3723.0], [21.2, 3723.0], [21.3, 3723.0], [21.4, 3723.0], [21.5, 3724.0], [21.6, 3724.0], [21.7, 3724.0], [21.8, 3724.0], [21.9, 3724.0], [22.0, 3724.0], [22.1, 3724.0], [22.2, 3724.0], [22.3, 3724.0], [22.4, 3724.0], [22.5, 3724.0], [22.6, 3725.0], [22.7, 3725.0], [22.8, 3725.0], [22.9, 3725.0], [23.0, 3725.0], [23.1, 3725.0], [23.2, 3725.0], [23.3, 3725.0], [23.4, 3726.0], [23.5, 3726.0], [23.6, 3726.0], [23.7, 3726.0], [23.8, 3726.0], [23.9, 3726.0], [24.0, 3726.0], [24.1, 3726.0], [24.2, 3726.0], [24.3, 3726.0], [24.4, 3726.0], [24.5, 3726.0], [24.6, 3726.0], [24.7, 3726.0], [24.8, 3726.0], [24.9, 3727.0], [25.0, 3727.0], [25.1, 3727.0], [25.2, 3727.0], [25.3, 3727.0], [25.4, 3727.0], [25.5, 3727.0], [25.6, 3727.0], [25.7, 3727.0], [25.8, 3727.0], [25.9, 3727.0], [26.0, 3727.0], [26.1, 3727.0], [26.2, 3727.0], [26.3, 3728.0], [26.4, 3728.0], [26.5, 3728.0], [26.6, 3728.0], [26.7, 3728.0], [26.8, 3728.0], [26.9, 3728.0], [27.0, 3728.0], [27.1, 3728.0], [27.2, 3728.0], [27.3, 3728.0], [27.4, 3728.0], [27.5, 3728.0], [27.6, 3728.0], [27.7, 3728.0], [27.8, 3729.0], [27.9, 3729.0], [28.0, 3729.0], [28.1, 3729.0], [28.2, 3729.0], [28.3, 3729.0], [28.4, 3729.0], [28.5, 3729.0], [28.6, 3729.0], [28.7, 3729.0], [28.8, 3730.0], [28.9, 3730.0], [29.0, 3730.0], [29.1, 3730.0], [29.2, 3730.0], [29.3, 3730.0], [29.4, 3730.0], [29.5, 3730.0], [29.6, 3730.0], [29.7, 3731.0], [29.8, 3731.0], [29.9, 3731.0], [30.0, 3731.0], [30.1, 3731.0], [30.2, 3731.0], [30.3, 3731.0], [30.4, 3731.0], [30.5, 3731.0], [30.6, 3731.0], [30.7, 3732.0], [30.8, 3732.0], [30.9, 3732.0], [31.0, 3732.0], [31.1, 3732.0], [31.2, 3732.0], [31.3, 3732.0], [31.4, 3732.0], [31.5, 3732.0], [31.6, 3732.0], [31.7, 3732.0], [31.8, 3732.0], [31.9, 3732.0], [32.0, 3732.0], [32.1, 3732.0], [32.2, 3732.0], [32.3, 3733.0], [32.4, 3733.0], [32.5, 3733.0], [32.6, 3733.0], [32.7, 3733.0], [32.8, 3733.0], [32.9, 3733.0], [33.0, 3733.0], [33.1, 3733.0], [33.2, 3734.0], [33.3, 3734.0], [33.4, 3734.0], [33.5, 3734.0], [33.6, 3734.0], [33.7, 3734.0], [33.8, 3734.0], [33.9, 3734.0], [34.0, 3734.0], [34.1, 3734.0], [34.2, 3734.0], [34.3, 3734.0], [34.4, 3734.0], [34.5, 3734.0], [34.6, 3735.0], [34.7, 3735.0], [34.8, 3735.0], [34.9, 3735.0], [35.0, 3735.0], [35.1, 3735.0], [35.2, 3736.0], [35.3, 3736.0], [35.4, 3736.0], [35.5, 3736.0], [35.6, 3736.0], [35.7, 3736.0], [35.8, 3736.0], [35.9, 3736.0], [36.0, 3736.0], [36.1, 3736.0], [36.2, 3736.0], [36.3, 3736.0], [36.4, 3736.0], [36.5, 3736.0], [36.6, 3736.0], [36.7, 3736.0], [36.8, 3736.0], [36.9, 3737.0], [37.0, 3737.0], [37.1, 3737.0], [37.2, 3737.0], [37.3, 3737.0], [37.4, 3737.0], [37.5, 3737.0], [37.6, 3737.0], [37.7, 3737.0], [37.8, 3737.0], [37.9, 3737.0], [38.0, 3738.0], [38.1, 3738.0], [38.2, 3738.0], [38.3, 3738.0], [38.4, 3738.0], [38.5, 3738.0], [38.6, 3738.0], [38.7, 3738.0], [38.8, 3738.0], [38.9, 3738.0], [39.0, 3738.0], [39.1, 3738.0], [39.2, 3738.0], [39.3, 3738.0], [39.4, 3738.0], [39.5, 3738.0], [39.6, 3738.0], [39.7, 3739.0], [39.8, 3739.0], [39.9, 3739.0], [40.0, 3739.0], [40.1, 3739.0], [40.2, 3739.0], [40.3, 3739.0], [40.4, 3739.0], [40.5, 3739.0], [40.6, 3739.0], [40.7, 3739.0], [40.8, 3739.0], [40.9, 3739.0], [41.0, 3739.0], [41.1, 3739.0], [41.2, 3739.0], [41.3, 3740.0], [41.4, 3740.0], [41.5, 3740.0], [41.6, 3740.0], [41.7, 3740.0], [41.8, 3740.0], [41.9, 3740.0], [42.0, 3740.0], [42.1, 3740.0], [42.2, 3740.0], [42.3, 3740.0], [42.4, 3740.0], [42.5, 3740.0], [42.6, 3740.0], [42.7, 3741.0], [42.8, 3741.0], [42.9, 3741.0], [43.0, 3741.0], [43.1, 3741.0], [43.2, 3741.0], [43.3, 3741.0], [43.4, 3741.0], [43.5, 3741.0], [43.6, 3741.0], [43.7, 3741.0], [43.8, 3741.0], [43.9, 3741.0], [44.0, 3742.0], [44.1, 3742.0], [44.2, 3742.0], [44.3, 3742.0], [44.4, 3742.0], [44.5, 3742.0], [44.6, 3742.0], [44.7, 3743.0], [44.8, 3743.0], [44.9, 3743.0], [45.0, 3743.0], [45.1, 3743.0], [45.2, 3743.0], [45.3, 3743.0], [45.4, 3743.0], [45.5, 3743.0], [45.6, 3743.0], [45.7, 3743.0], [45.8, 3743.0], [45.9, 3743.0], [46.0, 3743.0], [46.1, 3743.0], [46.2, 3743.0], [46.3, 3743.0], [46.4, 3743.0], [46.5, 3743.0], [46.6, 3743.0], [46.7, 3743.0], [46.8, 3743.0], [46.9, 3744.0], [47.0, 3744.0], [47.1, 3744.0], [47.2, 3744.0], [47.3, 3744.0], [47.4, 3745.0], [47.5, 3745.0], [47.6, 3745.0], [47.7, 3745.0], [47.8, 3745.0], [47.9, 3745.0], [48.0, 3745.0], [48.1, 3745.0], [48.2, 3745.0], [48.3, 3745.0], [48.4, 3745.0], [48.5, 3745.0], [48.6, 3746.0], [48.7, 3746.0], [48.8, 3746.0], [48.9, 3746.0], [49.0, 3746.0], [49.1, 3746.0], [49.2, 3746.0], [49.3, 3746.0], [49.4, 3746.0], [49.5, 3746.0], [49.6, 3746.0], [49.7, 3746.0], [49.8, 3747.0], [49.9, 3747.0], [50.0, 3747.0], [50.1, 3747.0], [50.2, 3747.0], [50.3, 3747.0], [50.4, 3747.0], [50.5, 3747.0], [50.6, 3747.0], [50.7, 3747.0], [50.8, 3747.0], [50.9, 3747.0], [51.0, 3748.0], [51.1, 3748.0], [51.2, 3748.0], [51.3, 3748.0], [51.4, 3748.0], [51.5, 3748.0], [51.6, 3748.0], [51.7, 3748.0], [51.8, 3748.0], [51.9, 3748.0], [52.0, 3748.0], [52.1, 3748.0], [52.2, 3748.0], [52.3, 3749.0], [52.4, 3749.0], [52.5, 3749.0], [52.6, 3749.0], [52.7, 3750.0], [52.8, 3750.0], [52.9, 3750.0], [53.0, 3750.0], [53.1, 3750.0], [53.2, 3750.0], [53.3, 3750.0], [53.4, 3750.0], [53.5, 3750.0], [53.6, 3750.0], [53.7, 3750.0], [53.8, 3751.0], [53.9, 3751.0], [54.0, 3751.0], [54.1, 3751.0], [54.2, 3751.0], [54.3, 3751.0], [54.4, 3751.0], [54.5, 3751.0], [54.6, 3751.0], [54.7, 3751.0], [54.8, 3752.0], [54.9, 3752.0], [55.0, 3752.0], [55.1, 3752.0], [55.2, 3752.0], [55.3, 3752.0], [55.4, 3752.0], [55.5, 3752.0], [55.6, 3752.0], [55.7, 3752.0], [55.8, 3752.0], [55.9, 3752.0], [56.0, 3752.0], [56.1, 3752.0], [56.2, 3752.0], [56.3, 3753.0], [56.4, 3753.0], [56.5, 3753.0], [56.6, 3753.0], [56.7, 3753.0], [56.8, 3754.0], [56.9, 3754.0], [57.0, 3754.0], [57.1, 3754.0], [57.2, 3754.0], [57.3, 3754.0], [57.4, 3754.0], [57.5, 3754.0], [57.6, 3754.0], [57.7, 3755.0], [57.8, 3755.0], [57.9, 3755.0], [58.0, 3755.0], [58.1, 3755.0], [58.2, 3755.0], [58.3, 3755.0], [58.4, 3755.0], [58.5, 3755.0], [58.6, 3755.0], [58.7, 3756.0], [58.8, 3756.0], [58.9, 3756.0], [59.0, 3756.0], [59.1, 3756.0], [59.2, 3756.0], [59.3, 3757.0], [59.4, 3757.0], [59.5, 3757.0], [59.6, 3757.0], [59.7, 3758.0], [59.8, 3758.0], [59.9, 3758.0], [60.0, 3758.0], [60.1, 3758.0], [60.2, 3758.0], [60.3, 3758.0], [60.4, 3758.0], [60.5, 3758.0], [60.6, 3758.0], [60.7, 3759.0], [60.8, 3759.0], [60.9, 3759.0], [61.0, 3759.0], [61.1, 3759.0], [61.2, 3759.0], [61.3, 3759.0], [61.4, 3759.0], [61.5, 3759.0], [61.6, 3760.0], [61.7, 3760.0], [61.8, 3760.0], [61.9, 3760.0], [62.0, 3760.0], [62.1, 3760.0], [62.2, 3760.0], [62.3, 3760.0], [62.4, 3760.0], [62.5, 3760.0], [62.6, 3761.0], [62.7, 3761.0], [62.8, 3761.0], [62.9, 3761.0], [63.0, 3761.0], [63.1, 3761.0], [63.2, 3761.0], [63.3, 3762.0], [63.4, 3762.0], [63.5, 3762.0], [63.6, 3763.0], [63.7, 3763.0], [63.8, 3763.0], [63.9, 3763.0], [64.0, 3763.0], [64.1, 3763.0], [64.2, 3764.0], [64.3, 3764.0], [64.4, 3764.0], [64.5, 3764.0], [64.6, 3764.0], [64.7, 3765.0], [64.8, 3765.0], [64.9, 3765.0], [65.0, 3765.0], [65.1, 3766.0], [65.2, 3766.0], [65.3, 3766.0], [65.4, 3766.0], [65.5, 3766.0], [65.6, 3766.0], [65.7, 3767.0], [65.8, 3767.0], [65.9, 3767.0], [66.0, 3767.0], [66.1, 3767.0], [66.2, 3767.0], [66.3, 3767.0], [66.4, 3767.0], [66.5, 3768.0], [66.6, 3768.0], [66.7, 3768.0], [66.8, 3768.0], [66.9, 3768.0], [67.0, 3769.0], [67.1, 3770.0], [67.2, 3771.0], [67.3, 3771.0], [67.4, 3771.0], [67.5, 3771.0], [67.6, 3771.0], [67.7, 3771.0], [67.8, 3772.0], [67.9, 3772.0], [68.0, 3772.0], [68.1, 3773.0], [68.2, 3773.0], [68.3, 3773.0], [68.4, 3773.0], [68.5, 3774.0], [68.6, 3774.0], [68.7, 3774.0], [68.8, 3774.0], [68.9, 3774.0], [69.0, 3775.0], [69.1, 3775.0], [69.2, 3775.0], [69.3, 3776.0], [69.4, 3777.0], [69.5, 3777.0], [69.6, 3778.0], [69.7, 3778.0], [69.8, 3778.0], [69.9, 3778.0], [70.0, 3779.0], [70.1, 3779.0], [70.2, 3779.0], [70.3, 3779.0], [70.4, 3780.0], [70.5, 3780.0], [70.6, 3780.0], [70.7, 3780.0], [70.8, 3781.0], [70.9, 3781.0], [71.0, 3782.0], [71.1, 3782.0], [71.2, 3782.0], [71.3, 3782.0], [71.4, 3782.0], [71.5, 3782.0], [71.6, 3783.0], [71.7, 3783.0], [71.8, 3784.0], [71.9, 3785.0], [72.0, 3786.0], [72.1, 3786.0], [72.2, 3786.0], [72.3, 3786.0], [72.4, 3787.0], [72.5, 3788.0], [72.6, 3789.0], [72.7, 3789.0], [72.8, 3789.0], [72.9, 3790.0], [73.0, 3790.0], [73.1, 3791.0], [73.2, 3792.0], [73.3, 3793.0], [73.4, 3793.0], [73.5, 3793.0], [73.6, 3793.0], [73.7, 3793.0], [73.8, 3794.0], [73.9, 3795.0], [74.0, 3795.0], [74.1, 3796.0], [74.2, 3796.0], [74.3, 3796.0], [74.4, 3796.0], [74.5, 3796.0], [74.6, 3797.0], [74.7, 3797.0], [74.8, 3797.0], [74.9, 3799.0], [75.0, 3800.0], [75.1, 3801.0], [75.2, 3801.0], [75.3, 3804.0], [75.4, 3805.0], [75.5, 3805.0], [75.6, 3806.0], [75.7, 3807.0], [75.8, 3812.0], [75.9, 3813.0], [76.0, 3816.0], [76.1, 3816.0], [76.2, 3816.0], [76.3, 3816.0], [76.4, 3817.0], [76.5, 3818.0], [76.6, 3819.0], [76.7, 3819.0], [76.8, 3821.0], [76.9, 3822.0], [77.0, 3823.0], [77.1, 3823.0], [77.2, 3826.0], [77.3, 3826.0], [77.4, 3826.0], [77.5, 3828.0], [77.6, 3828.0], [77.7, 3829.0], [77.8, 3830.0], [77.9, 3831.0], [78.0, 3832.0], [78.1, 3833.0], [78.2, 3834.0], [78.3, 3836.0], [78.4, 3840.0], [78.5, 3840.0], [78.6, 3844.0], [78.7, 3852.0], [78.8, 3870.0], [78.9, 3885.0], [79.0, 3929.0], [79.1, 3979.0], [79.2, 4646.0], [79.3, 5050.0], [79.4, 5055.0], [79.5, 5062.0], [79.6, 5070.0], [79.7, 5081.0], [79.8, 5087.0], [79.9, 5108.0], [80.0, 5108.0], [80.1, 5150.0], [80.2, 5160.0], [80.3, 5165.0], [80.4, 5176.0], [80.5, 5186.0], [80.6, 5188.0], [80.7, 5216.0], [80.8, 5225.0], [80.9, 5243.0], [81.0, 5244.0], [81.1, 5249.0], [81.2, 5261.0], [81.3, 5261.0], [81.4, 5267.0], [81.5, 5275.0], [81.6, 5275.0], [81.7, 5282.0], [81.8, 5284.0], [81.9, 5285.0], [82.0, 5288.0], [82.1, 5297.0], [82.2, 5323.0], [82.3, 5324.0], [82.4, 5329.0], [82.5, 5338.0], [82.6, 5358.0], [82.7, 5376.0], [82.8, 5376.0], [82.9, 5377.0], [83.0, 5382.0], [83.1, 5384.0], [83.2, 5394.0], [83.3, 5395.0], [83.4, 5397.0], [83.5, 5400.0], [83.6, 5856.0], [83.7, 6830.0], [83.8, 6832.0], [83.9, 6843.0], [84.0, 6865.0], [84.1, 6884.0], [84.2, 6914.0], [84.3, 6937.0], [84.4, 6941.0], [84.5, 6958.0], [84.6, 6981.0], [84.7, 6989.0], [84.8, 7120.0], [84.9, 7123.0], [85.0, 7137.0], [85.1, 7148.0], [85.2, 7212.0], [85.3, 7219.0], [85.4, 7298.0], [85.5, 7305.0], [85.6, 7329.0], [85.7, 7386.0], [85.8, 8138.0], [85.9, 9070.0], [86.0, 9098.0], [86.1, 9106.0], [86.2, 9109.0], [86.3, 9131.0], [86.4, 9131.0], [86.5, 9141.0], [86.6, 9150.0], [86.7, 9150.0], [86.8, 9153.0], [86.9, 9160.0], [87.0, 9165.0], [87.1, 9176.0], [87.2, 9184.0], [87.3, 9187.0], [87.4, 9197.0], [87.5, 9202.0], [87.6, 9206.0], [87.7, 9213.0], [87.8, 9216.0], [87.9, 9217.0], [88.0, 9224.0], [88.1, 9225.0], [88.2, 9230.0], [88.3, 9230.0], [88.4, 9233.0], [88.5, 9238.0], [88.6, 9238.0], [88.7, 9239.0], [88.8, 9240.0], [88.9, 9240.0], [89.0, 9241.0], [89.1, 9245.0], [89.2, 9246.0], [89.3, 9248.0], [89.4, 9248.0], [89.5, 9252.0], [89.6, 9253.0], [89.7, 9254.0], [89.8, 9254.0], [89.9, 9257.0], [90.0, 9272.0], [90.1, 9273.0], [90.2, 9279.0], [90.3, 9283.0], [90.4, 9361.0], [90.5, 9449.0], [90.6, 10388.0], [90.7, 11093.0], [90.8, 11139.0], [90.9, 11165.0], [91.0, 11211.0], [91.1, 11673.0], [91.2, 12940.0], [91.3, 12941.0], [91.4, 12962.0], [91.5, 12966.0], [91.6, 12969.0], [91.7, 12969.0], [91.8, 12975.0], [91.9, 13027.0], [92.0, 13037.0], [92.1, 13039.0], [92.2, 13048.0], [92.3, 13113.0], [92.4, 14218.0], [92.5, 14735.0], [92.6, 14740.0], [92.7, 14765.0], [92.8, 14767.0], [92.9, 14767.0], [93.0, 14774.0], [93.1, 14788.0], [93.2, 14788.0], [93.3, 14814.0], [93.4, 14814.0], [93.5, 14818.0], [93.6, 14836.0], [93.7, 14848.0], [93.8, 14877.0], [93.9, 14883.0], [94.0, 14946.0], [94.1, 15773.0], [94.2, 16722.0], [94.3, 17413.0], [94.4, 18321.0], [94.5, 18333.0], [94.6, 18334.0], [94.7, 18340.0], [94.8, 18354.0], [94.9, 18384.0], [95.0, 18385.0], [95.1, 18421.0], [95.2, 18486.0], [95.3, 18507.0], [95.4, 18532.0], [95.5, 18533.0], [95.6, 18535.0], [95.7, 18544.0], [95.8, 18545.0], [95.9, 20167.0], [96.0, 20192.0], [96.1, 20217.0], [96.2, 20263.0], [96.3, 20267.0], [96.4, 20296.0], [96.5, 20305.0], [96.6, 20307.0], [96.7, 20344.0], [96.8, 20366.0], [96.9, 21653.0], [97.0, 22272.0], [97.1, 22278.0], [97.2, 22305.0], [97.3, 22321.0], [97.4, 22324.0], [97.5, 23666.0], [97.6, 23870.0], [97.7, 23899.0], [97.8, 23942.0], [97.9, 23951.0], [98.0, 23960.0], [98.1, 23976.0], [98.2, 24041.0], [98.3, 24057.0], [98.4, 25130.0], [98.5, 25650.0], [98.6, 25652.0], [98.7, 25671.0], [98.8, 25687.0], [98.9, 25703.0], [99.0, 25704.0], [99.1, 25709.0], [99.2, 25834.0], [99.3, 26197.0], [99.4, 27462.0], [99.5, 28022.0], [99.6, 28317.0], [99.7, 29247.0], [99.8, 29255.0], [99.9, 29275.0], [100.0, 29275.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 2.0, "minX": 2000.0, "maxY": 1332.0, "series": [{"data": [[2000.0, 2.0], [3300.0, 12.0], [3200.0, 2.0], [3400.0, 34.0], [3500.0, 18.0], [3700.0, 1332.0], [3600.0, 76.0], [3800.0, 80.0], [3900.0, 4.0], [4600.0, 2.0], [5000.0, 12.0], [5100.0, 14.0], [5300.0, 26.0], [5200.0, 30.0], [5400.0, 2.0], [5800.0, 2.0], [6800.0, 10.0], [6900.0, 12.0], [7100.0, 8.0], [7300.0, 6.0], [7200.0, 6.0], [8100.0, 2.0], [9200.0, 58.0], [9100.0, 26.0], [9000.0, 4.0], [9300.0, 2.0], [9400.0, 2.0], [10300.0, 2.0], [11100.0, 4.0], [11000.0, 2.0], [11200.0, 2.0], [11600.0, 2.0], [13000.0, 8.0], [13100.0, 2.0], [12900.0, 14.0], [14200.0, 2.0], [14700.0, 16.0], [14800.0, 12.0], [14900.0, 2.0], [15700.0, 2.0], [16700.0, 2.0], [17400.0, 2.0], [18400.0, 4.0], [18300.0, 14.0], [18500.0, 12.0], [20100.0, 4.0], [20200.0, 8.0], [20300.0, 8.0], [21600.0, 2.0], [22200.0, 4.0], [22300.0, 6.0], [23600.0, 2.0], [24000.0, 4.0], [23900.0, 8.0], [23800.0, 4.0], [25100.0, 2.0], [25700.0, 6.0], [25600.0, 8.0], [25800.0, 2.0], [26100.0, 2.0], [27400.0, 2.0], [28000.0, 2.0], [28300.0, 2.0], [29200.0, 6.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 29200.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 1970.0, "minX": 2.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1970.0, "series": [{"data": [], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 1970.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 988.5, "minX": 1.74703368E12, "maxY": 1000.0, "series": [{"data": [[1.7470347E12, 1000.0], [1.747035E12, 1000.0], [1.74703368E12, 1000.0], [1.7470353E12, 1000.0], [1.74703428E12, 1000.0], [1.74703398E12, 1000.0], [1.74703458E12, 1000.0], [1.74703488E12, 1000.0], [1.74703452E12, 1000.0], [1.74703422E12, 1000.0], [1.74703482E12, 1000.0], [1.74703512E12, 1000.0], [1.7470338E12, 1000.0], [1.74703542E12, 1000.0], [1.7470344E12, 1000.0], [1.7470341E12, 1000.0], [1.74703404E12, 1000.0], [1.74703374E12, 1000.0], [1.74703434E12, 1000.0], [1.74703464E12, 1000.0], [1.74703494E12, 1000.0], [1.74703524E12, 1000.0], [1.74703392E12, 1000.0], [1.74703554E12, 988.5], [1.74703518E12, 1000.0], [1.74703548E12, 999.1515151515152], [1.74703416E12, 1000.0], [1.74703386E12, 1000.0], [1.74703446E12, 1000.0], [1.74703476E12, 1000.0], [1.74703506E12, 1000.0], [1.74703536E12, 1000.0]], "isOverall": false, "label": "LoadTest", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74703554E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 5238.565979381447, "minX": 985.0, "maxY": 29275.0, "series": [{"data": [[991.0, 26197.0], [990.0, 27462.0], [989.0, 28022.0], [988.0, 28317.0], [987.0, 29247.0], [986.0, 29275.0], [985.0, 29255.0], [1000.0, 5238.565979381447], [999.0, 25704.0], [998.0, 25650.0], [997.0, 25652.0], [996.0, 25687.0], [995.0, 25834.0], [994.0, 25709.0], [993.0, 25703.0], [992.0, 25671.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[999.8781725888325, 5568.318781725888]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1000.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 60.9, "minX": 1.74703368E12, "maxY": 473.46666666666664, "series": [{"data": [[1.7470347E12, 443.76666666666665], [1.747035E12, 442.8666666666667], [1.74703368E12, 96.06666666666666], [1.7470353E12, 454.76666666666665], [1.74703428E12, 445.1333333333333], [1.74703398E12, 445.9], [1.74703458E12, 444.4], [1.74703488E12, 443.93333333333334], [1.74703452E12, 444.6333333333333], [1.74703422E12, 446.23333333333335], [1.74703482E12, 444.73333333333335], [1.74703512E12, 473.46666666666664], [1.7470338E12, 445.6], [1.74703542E12, 444.26666666666665], [1.7470344E12, 443.56666666666666], [1.7470341E12, 444.0], [1.74703404E12, 444.43333333333334], [1.74703374E12, 445.3333333333333], [1.74703434E12, 444.46666666666664], [1.74703464E12, 445.23333333333335], [1.74703494E12, 444.1333333333333], [1.74703524E12, 470.4], [1.74703392E12, 444.7], [1.74703554E12, 110.96666666666667], [1.74703518E12, 469.3], [1.74703548E12, 458.4], [1.74703416E12, 445.2], [1.74703386E12, 460.03333333333336], [1.74703446E12, 445.73333333333335], [1.74703476E12, 443.73333333333335], [1.74703506E12, 458.8], [1.74703536E12, 443.3666666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.7470347E12, 278.4], [1.747035E12, 278.4], [1.74703368E12, 60.9], [1.7470353E12, 287.1], [1.74703428E12, 278.4], [1.74703398E12, 278.4], [1.74703458E12, 278.4], [1.74703488E12, 278.4], [1.74703452E12, 278.4], [1.74703422E12, 278.4], [1.74703482E12, 278.4], [1.74703512E12, 295.8], [1.7470338E12, 278.4], [1.74703542E12, 278.4], [1.7470344E12, 278.4], [1.7470341E12, 278.4], [1.74703404E12, 278.4], [1.74703374E12, 278.4], [1.74703434E12, 278.4], [1.74703464E12, 278.4], [1.74703494E12, 278.4], [1.74703524E12, 295.8], [1.74703392E12, 278.4], [1.74703554E12, 69.6], [1.74703518E12, 295.8], [1.74703548E12, 287.1], [1.74703416E12, 278.4], [1.74703386E12, 287.1], [1.74703446E12, 278.4], [1.74703476E12, 278.4], [1.74703506E12, 287.1], [1.74703536E12, 278.4]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74703554E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 3501.5714285714284, "minX": 1.74703368E12, "maxY": 27930.75, "series": [{"data": [[1.7470347E12, 3743.2500000000014], [1.747035E12, 3758.34375], [1.74703368E12, 3501.5714285714284], [1.7470353E12, 9202.21212121212], [1.74703428E12, 3726.093749999999], [1.74703398E12, 3750.2812499999995], [1.74703458E12, 3748.28125], [1.74703488E12, 3734.5625000000005], [1.74703452E12, 3755.875], [1.74703422E12, 3745.59375], [1.74703482E12, 3755.96875], [1.74703512E12, 3510.617647058823], [1.7470338E12, 3729.0937500000005], [1.74703542E12, 16681.874999999996], [1.7470344E12, 3747.2187500000005], [1.7470341E12, 3764.15625], [1.74703404E12, 3748.1250000000005], [1.74703374E12, 3735.46875], [1.74703434E12, 3761.28125], [1.74703464E12, 3744.7187500000005], [1.74703494E12, 3755.2499999999995], [1.74703524E12, 6562.088235294117], [1.74703392E12, 3723.9687499999995], [1.74703554E12, 27930.75], [1.74703518E12, 5212.676470588234], [1.74703548E12, 22918.424242424244], [1.74703416E12, 3740.937499999999], [1.74703386E12, 3717.9393939393935], [1.74703446E12, 3755.0937500000005], [1.74703476E12, 3748.0625], [1.74703506E12, 3648.454545454545], [1.74703536E12, 11335.937500000004]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74703554E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 3501.0, "minX": 1.74703368E12, "maxY": 27930.75, "series": [{"data": [[1.7470347E12, 3743.218750000001], [1.747035E12, 3758.3124999999995], [1.74703368E12, 3501.0], [1.7470353E12, 9202.151515151514], [1.74703428E12, 3726.0312500000005], [1.74703398E12, 3750.2187499999995], [1.74703458E12, 3748.2499999999995], [1.74703488E12, 3734.5625000000005], [1.74703452E12, 3755.84375], [1.74703422E12, 3745.59375], [1.74703482E12, 3755.9374999999995], [1.74703512E12, 3510.5588235294126], [1.7470338E12, 3729.0625], [1.74703542E12, 16681.874999999996], [1.7470344E12, 3747.1875], [1.7470341E12, 3764.093749999999], [1.74703404E12, 3747.9999999999986], [1.74703374E12, 3735.343749999999], [1.74703434E12, 3761.21875], [1.74703464E12, 3744.7187500000005], [1.74703494E12, 3755.2499999999995], [1.74703524E12, 6562.05882352941], [1.74703392E12, 3723.9062499999995], [1.74703554E12, 27930.75], [1.74703518E12, 5212.647058823529], [1.74703548E12, 22918.424242424244], [1.74703416E12, 3740.8749999999986], [1.74703386E12, 3717.8181818181815], [1.74703446E12, 3755.0625000000005], [1.74703476E12, 3748.0312499999995], [1.74703506E12, 3648.454545454545], [1.74703536E12, 11335.90625]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74703554E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.74703368E12, "maxY": 5.285714285714285, "series": [{"data": [[1.7470347E12, 0.03125], [1.747035E12, 0.0625], [1.74703368E12, 5.285714285714285], [1.7470353E12, 0.06060606060606063], [1.74703428E12, 0.03125], [1.74703398E12, 0.09375000000000003], [1.74703458E12, 0.03125000000000002], [1.74703488E12, 0.0], [1.74703452E12, 0.03125000000000002], [1.74703422E12, 0.0625], [1.74703482E12, 0.09374999999999999], [1.74703512E12, 0.0], [1.7470338E12, 0.09375], [1.74703542E12, 0.09375], [1.7470344E12, 0.06250000000000001], [1.7470341E12, 0.09375000000000003], [1.74703404E12, 0.0], [1.74703374E12, 0.03125], [1.74703434E12, 0.06250000000000001], [1.74703464E12, 0.03125], [1.74703494E12, 0.09375], [1.74703524E12, 0.058823529411764705], [1.74703392E12, 0.0], [1.74703554E12, 0.375], [1.74703518E12, 0.11764705882352944], [1.74703548E12, 0.21212121212121215], [1.74703416E12, 0.06250000000000004], [1.74703386E12, 0.030303030303030304], [1.74703446E12, 0.03125000000000001], [1.74703476E12, 0.03125], [1.74703506E12, 0.06060606060606061], [1.74703536E12, 0.3125000000000001]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74703554E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 2008.0, "minX": 1.74703368E12, "maxY": 29275.0, "series": [{"data": [[1.7470347E12, 3826.0], [1.747035E12, 3929.0], [1.74703368E12, 3778.0], [1.7470353E12, 9361.0], [1.74703428E12, 3796.0], [1.74703398E12, 3816.0], [1.74703458E12, 3830.0], [1.74703488E12, 3786.0], [1.74703452E12, 3840.0], [1.74703422E12, 3833.0], [1.74703482E12, 3844.0], [1.74703512E12, 3740.0], [1.7470338E12, 3774.0], [1.74703542E12, 18545.0], [1.7470344E12, 3796.0], [1.7470341E12, 3870.0], [1.74703404E12, 3812.0], [1.74703374E12, 3796.0], [1.74703434E12, 3852.0], [1.74703464E12, 3823.0], [1.74703494E12, 3979.0], [1.74703524E12, 9202.0], [1.74703392E12, 3765.0], [1.74703554E12, 29275.0], [1.74703518E12, 5856.0], [1.74703548E12, 25834.0], [1.74703416E12, 3823.0], [1.74703386E12, 3756.0], [1.74703446E12, 3797.0], [1.74703476E12, 3840.0], [1.74703506E12, 3807.0], [1.74703536E12, 14788.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.7470347E12, 3773.0], [1.747035E12, 3825.0], [1.74703368E12, 3778.0], [1.7470353E12, 9261.5], [1.74703428E12, 3782.0], [1.74703398E12, 3779.0], [1.74703458E12, 3763.0], [1.74703488E12, 3770.0], [1.74703452E12, 3796.5], [1.74703422E12, 3797.5], [1.74703482E12, 3808.0], [1.74703512E12, 3623.0], [1.7470338E12, 3754.0], [1.74703542E12, 18534.0], [1.7470344E12, 3782.0], [1.7470341E12, 3822.5], [1.74703404E12, 3794.0], [1.74703374E12, 3756.0], [1.74703434E12, 3824.5], [1.74703464E12, 3791.5], [1.74703494E12, 3811.0], [1.74703524E12, 7334.7], [1.74703392E12, 3757.5], [1.74703554E12, 29275.0], [1.74703518E12, 5395.2], [1.74703548E12, 25703.3], [1.74703416E12, 3771.0], [1.74703386E12, 3737.3], [1.74703446E12, 3777.5], [1.74703476E12, 3793.5], [1.74703506E12, 3778.5], [1.74703536E12, 13080.5]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.7470347E12, 3826.0], [1.747035E12, 3929.0], [1.74703368E12, 3778.0], [1.7470353E12, 9361.0], [1.74703428E12, 3796.0], [1.74703398E12, 3816.0], [1.74703458E12, 3830.0], [1.74703488E12, 3786.0], [1.74703452E12, 3840.0], [1.74703422E12, 3833.0], [1.74703482E12, 3844.0], [1.74703512E12, 3740.0], [1.7470338E12, 3774.0], [1.74703542E12, 18545.0], [1.7470344E12, 3796.0], [1.7470341E12, 3870.0], [1.74703404E12, 3812.0], [1.74703374E12, 3796.0], [1.74703434E12, 3852.0], [1.74703464E12, 3823.0], [1.74703494E12, 3979.0], [1.74703524E12, 9202.0], [1.74703392E12, 3765.0], [1.74703554E12, 29275.0], [1.74703518E12, 5856.0], [1.74703548E12, 25834.0], [1.74703416E12, 3823.0], [1.74703386E12, 3756.0], [1.74703446E12, 3797.0], [1.74703476E12, 3840.0], [1.74703506E12, 3807.0], [1.74703536E12, 14788.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.7470347E12, 3795.0], [1.747035E12, 3885.0], [1.74703368E12, 3778.0], [1.7470353E12, 9279.0], [1.74703428E12, 3789.0], [1.74703398E12, 3791.0], [1.74703458E12, 3828.0], [1.74703488E12, 3779.0], [1.74703452E12, 3829.0], [1.74703422E12, 3826.0], [1.74703482E12, 3836.0], [1.74703512E12, 3648.0], [1.7470338E12, 3758.0], [1.74703542E12, 18544.0], [1.7470344E12, 3782.0], [1.7470341E12, 3832.0], [1.74703404E12, 3805.0], [1.74703374E12, 3783.0], [1.74703434E12, 3831.0], [1.74703464E12, 3822.0], [1.74703494E12, 3817.0], [1.74703524E12, 8138.0], [1.74703392E12, 3764.0], [1.74703554E12, 29275.0], [1.74703518E12, 5400.0], [1.74703548E12, 25709.0], [1.74703416E12, 3818.0], [1.74703386E12, 3748.0], [1.74703446E12, 3780.0], [1.74703476E12, 3816.0], [1.74703506E12, 3800.0], [1.74703536E12, 14218.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.7470347E12, 3709.0], [1.747035E12, 3707.0], [1.74703368E12, 2008.0], [1.7470353E12, 9070.0], [1.74703428E12, 3550.0], [1.74703398E12, 3716.0], [1.74703458E12, 3720.0], [1.74703488E12, 3676.0], [1.74703452E12, 3723.0], [1.74703422E12, 3712.0], [1.74703482E12, 3714.0], [1.74703512E12, 3280.0], [1.7470338E12, 3697.0], [1.74703542E12, 14735.0], [1.7470344E12, 3724.0], [1.7470341E12, 3719.0], [1.74703404E12, 3711.0], [1.74703374E12, 3708.0], [1.74703434E12, 3683.0], [1.74703464E12, 3715.0], [1.74703494E12, 3707.0], [1.74703524E12, 5108.0], [1.74703392E12, 3696.0], [1.74703554E12, 25671.0], [1.74703518E12, 3606.0], [1.74703548E12, 20167.0], [1.74703416E12, 3706.0], [1.74703386E12, 3675.0], [1.74703446E12, 3736.0], [1.74703476E12, 3685.0], [1.74703506E12, 3315.0], [1.74703536E12, 9206.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.7470347E12, 3737.0], [1.747035E12, 3745.0], [1.74703368E12, 3747.0], [1.7470353E12, 9225.0], [1.74703428E12, 3741.0], [1.74703398E12, 3744.5], [1.74703458E12, 3744.0], [1.74703488E12, 3732.5], [1.74703452E12, 3749.0], [1.74703422E12, 3740.0], [1.74703482E12, 3744.5], [1.74703512E12, 3500.0], [1.7470338E12, 3728.5], [1.74703542E12, 17067.5], [1.7470344E12, 3742.0], [1.7470341E12, 3754.5], [1.74703404E12, 3741.5], [1.74703374E12, 3732.0], [1.74703434E12, 3750.0], [1.74703464E12, 3735.5], [1.74703494E12, 3745.0], [1.74703524E12, 6925.5], [1.74703392E12, 3722.0], [1.74703554E12, 28169.5], [1.74703518E12, 5283.0], [1.74703548E12, 23666.0], [1.74703416E12, 3736.5], [1.74703386E12, 3718.0], [1.74703446E12, 3750.5], [1.74703476E12, 3735.0], [1.74703506E12, 3686.0], [1.74703536E12, 11188.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74703554E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 3747.0, "minX": 2.0, "maxY": 3747.0, "series": [{"data": [[2.0, 3747.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 3747.0, "minX": 2.0, "maxY": 3747.0, "series": [{"data": [[2.0, 3747.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.3, "minX": 1.74703368E12, "maxY": 1.2, "series": [{"data": [[1.7470347E12, 1.0666666666666667], [1.747035E12, 1.0666666666666667], [1.74703368E12, 0.3], [1.7470353E12, 1.1], [1.74703428E12, 1.0666666666666667], [1.74703398E12, 1.0666666666666667], [1.74703458E12, 1.0666666666666667], [1.74703488E12, 1.0666666666666667], [1.74703452E12, 1.0666666666666667], [1.74703422E12, 1.0666666666666667], [1.74703482E12, 1.0666666666666667], [1.74703512E12, 1.1666666666666667], [1.7470338E12, 1.0666666666666667], [1.74703542E12, 1.2], [1.7470344E12, 1.0666666666666667], [1.7470341E12, 1.0666666666666667], [1.74703404E12, 1.0666666666666667], [1.74703374E12, 1.0666666666666667], [1.74703434E12, 1.0666666666666667], [1.74703464E12, 1.0666666666666667], [1.74703494E12, 1.0666666666666667], [1.74703524E12, 1.2], [1.74703392E12, 1.0666666666666667], [1.74703518E12, 1.1333333333333333], [1.74703548E12, 0.9666666666666667], [1.74703416E12, 1.0666666666666667], [1.74703386E12, 1.1], [1.74703446E12, 1.0666666666666667], [1.74703476E12, 1.0666666666666667], [1.74703506E12, 1.1], [1.74703536E12, 1.1666666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74703548E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.23333333333333334, "minX": 1.74703368E12, "maxY": 1.1333333333333333, "series": [{"data": [[1.7470347E12, 1.0666666666666667], [1.747035E12, 1.0666666666666667], [1.74703368E12, 0.23333333333333334], [1.7470353E12, 1.1], [1.74703428E12, 1.0666666666666667], [1.74703398E12, 1.0666666666666667], [1.74703458E12, 1.0666666666666667], [1.74703488E12, 1.0666666666666667], [1.74703452E12, 1.0666666666666667], [1.74703422E12, 1.0666666666666667], [1.74703482E12, 1.0666666666666667], [1.74703512E12, 1.1333333333333333], [1.7470338E12, 1.0666666666666667], [1.74703542E12, 1.0666666666666667], [1.7470344E12, 1.0666666666666667], [1.7470341E12, 1.0666666666666667], [1.74703404E12, 1.0666666666666667], [1.74703374E12, 1.0666666666666667], [1.74703434E12, 1.0666666666666667], [1.74703464E12, 1.0666666666666667], [1.74703494E12, 1.0666666666666667], [1.74703524E12, 1.1333333333333333], [1.74703392E12, 1.0666666666666667], [1.74703554E12, 0.26666666666666666], [1.74703518E12, 1.1333333333333333], [1.74703548E12, 1.1], [1.74703416E12, 1.0666666666666667], [1.74703386E12, 1.1], [1.74703446E12, 1.0666666666666667], [1.74703476E12, 1.0666666666666667], [1.74703506E12, 1.1], [1.74703536E12, 1.0666666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74703554E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.23333333333333334, "minX": 1.74703368E12, "maxY": 1.1333333333333333, "series": [{"data": [[1.7470347E12, 1.0666666666666667], [1.747035E12, 1.0666666666666667], [1.74703368E12, 0.23333333333333334], [1.7470353E12, 1.1], [1.74703428E12, 1.0666666666666667], [1.74703398E12, 1.0666666666666667], [1.74703458E12, 1.0666666666666667], [1.74703488E12, 1.0666666666666667], [1.74703452E12, 1.0666666666666667], [1.74703422E12, 1.0666666666666667], [1.74703482E12, 1.0666666666666667], [1.74703512E12, 1.1333333333333333], [1.7470338E12, 1.0666666666666667], [1.74703542E12, 1.0666666666666667], [1.7470344E12, 1.0666666666666667], [1.7470341E12, 1.0666666666666667], [1.74703404E12, 1.0666666666666667], [1.74703374E12, 1.0666666666666667], [1.74703434E12, 1.0666666666666667], [1.74703464E12, 1.0666666666666667], [1.74703494E12, 1.0666666666666667], [1.74703524E12, 1.1333333333333333], [1.74703392E12, 1.0666666666666667], [1.74703554E12, 0.26666666666666666], [1.74703518E12, 1.1333333333333333], [1.74703548E12, 1.1], [1.74703416E12, 1.0666666666666667], [1.74703386E12, 1.1], [1.74703446E12, 1.0666666666666667], [1.74703476E12, 1.0666666666666667], [1.74703506E12, 1.1], [1.74703536E12, 1.0666666666666667]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74703554E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.23333333333333334, "minX": 1.74703368E12, "maxY": 1.1333333333333333, "series": [{"data": [[1.7470347E12, 1.0666666666666667], [1.747035E12, 1.0666666666666667], [1.74703368E12, 0.23333333333333334], [1.7470353E12, 1.1], [1.74703428E12, 1.0666666666666667], [1.74703398E12, 1.0666666666666667], [1.74703458E12, 1.0666666666666667], [1.74703488E12, 1.0666666666666667], [1.74703452E12, 1.0666666666666667], [1.74703422E12, 1.0666666666666667], [1.74703482E12, 1.0666666666666667], [1.74703512E12, 1.1333333333333333], [1.7470338E12, 1.0666666666666667], [1.74703542E12, 1.0666666666666667], [1.7470344E12, 1.0666666666666667], [1.7470341E12, 1.0666666666666667], [1.74703404E12, 1.0666666666666667], [1.74703374E12, 1.0666666666666667], [1.74703434E12, 1.0666666666666667], [1.74703464E12, 1.0666666666666667], [1.74703494E12, 1.0666666666666667], [1.74703524E12, 1.1333333333333333], [1.74703392E12, 1.0666666666666667], [1.74703554E12, 0.26666666666666666], [1.74703518E12, 1.1333333333333333], [1.74703548E12, 1.1], [1.74703416E12, 1.0666666666666667], [1.74703386E12, 1.1], [1.74703446E12, 1.0666666666666667], [1.74703476E12, 1.0666666666666667], [1.74703506E12, 1.1], [1.74703536E12, 1.0666666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74703554E12, "title": "Total Transactions Per Second"}},
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

