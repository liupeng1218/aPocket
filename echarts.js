
/**
 * grid: 直角坐标系内绘图网格
 * title: 主标题
 * titleSubtext: 副标题
 * titleLeft: 主标题离容器左侧的距离
 * titleTop: 主标题离容器上侧的距离
 * textColor: 主标题文字的颜色
 * 
 * tooltip: 提示框组件 *
 * tooltip.trigger: 触发类型，可选，'item'，数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。'axis'，坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。*
 * tooltip.axisPointer: 坐标轴指示器，坐标轴触发有效 *
 * 
 * axisPointerType: 类型，可选，'line' 直线指示器，'shadow' 阴影指示器，为''不显示
 * 
 * containLabel: grid区域是否包含坐标轴的刻度标签
 * legendData: 图例的数据数组
 * legendLeft: 图例组件离容器左侧的距离,值可以是具体像素，也可以是'left','center','right'
 * legendTop: 图例组件离容器上侧的距离,值可以是具体像素，也可以是'top', 'middle', 'bottom'
 * legendOrient: 图例列表的布局朝向，可选，'horizontal'，'vertical'
 * BarColor: 调色盘颜色列表，系列颜色
 * gridLeft: grid组件离容器左侧的距离，值可以是像素值，也可以是百分比
 * gridRight: grid组件离容器右侧的距离
 * gridBottom: grid组件离容器下侧的距离
 * xAxisType: x轴坐标轴类型，可选，'value' 数值轴，适用于连续数据；'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据
 * xAxisData: 类目数据，在类目轴（type: 'category'）中有效
 * axisTick_AlignWithLabel: 坐标轴刻度与标签对齐
 * yAxisType: y轴坐标轴类型
 * yAxisData: 类型为'category'时，设置类目数据
 * 
 * series: 系列列表。每个系列通过 type 决定自己的图表类型
 * series.name: 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列
 * series.data: 系列中的数据内容数组
 * series.barwidth: 柱条的宽度，不设时自适应 
 */

/**************************柱状图************************/
   

function bar(dom,title='bar',{
	titleLeft = '',
	legendData = [],
	legendLeft = '',
	legendTop = '',
	legendOrient = '',
	BarColor = ['#3398DB'],
	axisPointerType = 'shadow',
	gridLeft = '3%',
	gridRight = '4%',
	gridBottom = '3%',
	xAxisType = 'category',
	xAxisData=[],
	axisTick_AlignWithLabel = true, 
	yAxis,
	series
}){
	var yAxis = yAxis.map(function(n){
		return n
	})
	var series = series.map(function(n){
		return n
	})

	
	dom.setOption({
		title: {
            text: title,
            left: titleLeft
        },
        legend: {
        	data: legendData,
        	left: legendLeft,
        	top: legendTop,
        	orient: legendOrient
        },
        color: BarColor,
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            
	            type : axisPointerType        
	        }
	    },
	    grid: {
	        left: gridLeft,
	        right: gridRight,
	        bottom: gridBottom,
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : xAxisType,
	            data : xAxisData,
	            axisTick: {
	                alignWithLabel: axisTick_AlignWithLabel
	            }
	        }
	    ],
	    yAxis : yAxis,
	    series : series
    });
}

/**************************折线图************************/


function line(dom,title='line',{
	titleSubtext='',
	xAxisData=[],
	seriesName='',
	seriesData=''
}){
	dom.setOption({
		title: {
            text: title,
            subtext: titleSubtext
        },
        tooltip : {
	        trigger: 'axis',
	        axisPointer : {            
	            type : 'shadow'        
	        }
	    },
		xAxis: {
	        type: 'category',
	        boundaryGap: true,
	        data: xAxisData,
	        axisTick:{
	        	alignWithLabel: '60%'
	        }
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series: [{
	    	name: seriesName,
	        data: seriesData,
	        type: 'line',
	        areaStyle: {}
	    }]
	})
}



/**************************饼图************************/
/**
 * tooltip_formatter: 提示框浮层内容格式器,支持字符串模板等，模板变量有 {a}, {b}，{c}，{d}，{e}，
 * 折线图、柱状图: {a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）；饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
 * seriesRadius: 饼图的半径，数组的第一项是内半径，第二项是外半径
 * seriesCenter: 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标,也可以设置百分比，第一项是相对于容器宽度，第二项是相对于容器高度
 * seriesRoseType: 是否展示成南丁格尔图，通过半径区分数据大小。可选择，'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小，'area' 所有扇区圆心角相同，仅通过半径展现数据大小
 * labelColor: 饼图图形上的文本中文字的颜色
 * labelLineColor: 标签的视觉引导线颜色
 * itemStyleColor: 图形的颜色
 * labelLineShow: 是否显示视觉引导线
 * labelLineLength: 视觉引导线第一段的长度
 * labelLineLength2: 视觉引导线第二段的长度
 * labelShow: 是否显示标签文本
 * labelPosition: 标签的位置,可选，'outside'，饼图扇区外侧，'inside'，内部，'center'，中心
 * emphasisShow: 扇区高亮时，文本标签是否显示
 * emphasisFontSize: 文本字体的大小
 * emphasisFontWeight: 文本字体的粗细
 * avoidLabelOverlap: 是否启用防止标签重叠策略,默认开启，圆环图中设为false
 */
   

function pie(dom,title='pie',{
	titleLeft = 'left',
	titleTop = '',
	textColor = '#000',
	legendOrient = '',
	legendLeft = '',
	legendTop = '',
	legendBottom = '',
	legendData = [],
	tooltip_formatter = '{a} <br/>{b} : {c} ({d}%)',
	seriesName = '',
	seriesData = [],
	seriesRadius = '55%', 
	seriesCenter = ['50%', '50%'],
	seriesRoseType = 'radius',
	labelColor = '#000',
	labelLineColor = '#ccc',
	itemStyleColor = '',
	labelShow = true,
	labelLineShow = true,
	labelLineLength = 10,
	labelLineLength2 = 20,
	labelPosition = '',
	emphasisShow = false, 
	emphasisFontSize = '',
	emphasisFontWeight = '',
	avoidLabelOverlap = ''
}){
	dom.setOption({
		backgroundColor: '#fff',

	    title: {
	        text: title,
	        left: titleLeft,
	        top: titleTop,
	        textStyle: {
	            color: textColor
	        }
	    },
	    legend: {
	    	orient: legendOrient,
	        left: legendLeft,
	        top: legendTop,
	        bottom: legendBottom,
	        data:legendData
	    },

	    tooltip : {
	        trigger: 'item',
	        formatter: tooltip_formatter
	    },
	    
	    calculable : true,
	    series : [
	        {
	            name:seriesName,
	            type:'pie',
	            radius : seriesRadius,
	            center: seriesCenter,
	            avoidLabelOverlap: avoidLabelOverlap,
	            data: seriesData,
	            roseType: seriesRoseType,
	            label: {
	                normal: {
	                    textStyle: {
	                        color: labelColor
	                    },
	                    show:labelShow,
	                    position: labelPosition
	                },
	                emphasis: {
	                    show: emphasisShow,
	                    textStyle: {
	                        fontSize: emphasisFontSize,
	                        fontWeight: emphasisFontWeight
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    lineStyle: {
	                        color: labelLineColor
	                    },
	                    smooth: 0.2, 		//视觉引导线的平滑程度
	                    length: labelLineLength, 		
	                    length2: labelLineLength2, 		
	                    show:labelLineShow
	                }
	            },
	            itemStyle: {
	                normal: {
	                    color: itemStyleColor,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)' 
	                }
	            },
	
	            animationType: 'scale',
	            animationEasing: 'elasticOut',
		            animationDelay: function (idx) {
		                return Math.random() * 200;
		            }
		        }
		    ]
    	})
    }

  
    /**************************雷达图************************/
/**
 * radarIndicator: 雷达图的指示器
 * radarCenter: 雷达图的中心坐标，数组的第一项是横坐标，第二项是纵坐标,也可以设置百分比，第一项是相对于容器宽度，第二项是相对于容器高度
 * radarRadius: 雷达图的半径，数组的第一项是内半径，第二项是外半径。也可百分比，相对于容器高宽中较小的一项的一半
 * seriesData: 雷达图的数据
 */

function radar(dom,title='Radar',{
	radarIndicator=[],
	radarCenter='',
	radarRadius='',
	seriesData=[]
}){
	dom.setOption({
		title: {
	        text: title
	    },
	    tooltip: {
	        trigger: 'axis'
	    },
	    radar:[
	    	{
	            indicator: radarIndicator,
	            center: radarCenter,
	            radius: radarRadius
	        }
	    ],
	    series:[
	    	{
	            type: 'radar',
	             tooltip: {
	                trigger: 'item'
	            },
	            itemStyle: {normal: {areaStyle: {type: 'default'}}},
	            data: seriesData
	        }
	    ]
	})
}