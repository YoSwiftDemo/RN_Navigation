---
title: RN-Navigation(StackNavigator+ TabNavigator+ DrawerNavigator）
keywords:
  - ReactNative
  - Navigation
mathjax: true
toc: true
date: 2017-07-24 10:25:05
tags: [ReactNative]
categories: ReactNative
description:
password:
---

# RN-Navigation
>一、StackNavigator： 导航组件，实现各个页面之间的跳转
>二、TabNavigator：   导航栏组件，实现同一个页面上不同界面的切换
>三、DrawerNavigator：侧滑菜单导航栏，抽屉组件
>
>四、使用:StackNavigator + TabNavigator

# StackNavigator导航栏
>组件采用堆栈式的页面导航来实现各个界面跳
>

# 属性
# 属性-navigation
>StackNavigator中注册后的组件都有navigation这个属性. navigation又有5个参数

| navigation属性参数||||
|-------|------|--------|--------|
|this.props.navigation.navigate('Two', { name: 'two' }|push下一个页面|||
||routeName|注册过的目标路由名称||
||params| 传递的参数||
||action|如果该界面是一个navigator的话，将运行这个sub-action||
|||||
|this.props.navigation.goBack()|返回上一页|||
|||||
|his.props.navigation.state|每个界面通过这去访问它的router，state其中包括:|||
||routeName|路由名||
||key|路由身份标识||
||params|参数||
|||||
|this.props.navigation.setParams|该方法允许界面更改router中的参数，可以用来动态的更改导航栏的内容|||
|||||
|this.props.navigation.dispatch|可以dispatch一些action，主要支持的action有|||
||①Navigate|||
||②Reset|||
||③SetParams|||
|||||

>①Navigate
>

```
import { 
       NavigationActions} from 'react-navigation'
const navigationAction = NavigationActions.navigate({
routeName: 'Profile',
    params: {},
    // navigate can have a nested navigate action that will be run inside the child router
    action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
     })
  this.props.navigation.dispatch(navigationAction)
```



>②Reset:Reset方法会清除原来的路由记录，添加上新设置的路由信息, 可以指定多个action，index是指定默认显示的那个路由页面, 注意不要越界了
>

```
  import { NavigationActions } from 'react-navigation'
  const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
       NavigationActions.navigate({ routeName: 'Profile'}),
       NavigationActions.navigate({ routeName: 'Two'})
       ]
      })
   this.props.navigation.dispatch(resetAction)
```


>③SetParams:为指定的router更新参数，该参数必须是已经存在于router的param中
>

```
import { NavigationActions } from 'react-navigation'
const setParamsAction = NavigationActions.setParams({
 params: {}, // these are the new params that will be merged into the existing route params
 // The key of the route that should get the new params
  key: 'screen-123',
  })
 this.props.navigation.dispatch(setParamsAction)
```



## 构造函数API
> StackNavigator **(**RouteConfigs, StackNavigatorConfig **)**
>

### 参数StackNavigatorConfig
>数表示各个页面路由配置,让导航器知道需要导航的路由对应的页面

```
const RouteConfigs = {
    Home: {
        screen: HomePage,
        navigationOptions: ({navigation}) => ({
            title: '首页',
        }),
    },
    Find: {
        screen: FindPage,
        navigationOptions: ({navigation}) => ({
            title: '发现',
        }),
    },
    Mine: {
        screen: MinePage,
        navigationOptions: ({navigation}) => ({
            title: '我的',
        }),
    },
};
```
>路由名称:Home,Find,Mine
>screen属性值为对应路由的页面:HomePage,FindPage,MinePage
>navigationOptions:为对应路由页面的配置选项
>
### 参数RouteConfigs


##  样例代码

```
const MyNavigator = StackNavigator(
  {
		    Home   :   { screen: Tabs },
		    HomeTwo: 
		               {
				         screen: HomeTwo,       // 必须, 其他都是非必须
				         path:'app/homeTwo',    //使用url导航时用到, 如 web app 和 Deep Linking
				         navigationOptions: {}  // 此处设置了, 会覆盖组件内的`static navigationOptions`设置.
		               },
		    HomeThree: { screen: HomeThree },
		    HomeFour:  { screen: HomeFour  },
  }, 
  {
          initialRouteName:     'Home',       //默认显示界面
          navigationOptions:                 //屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
                          {                                
						          header:      //可以设置一些导航的属性，如果隐藏顶部导航栏只要将这个属性设置为null  
									       {        
									          backTitle:  '返回',    // 左上角返回键文字  
									          style:      { 
									                       backgroundColor: '#fff' },
									          titleStyle: {           
									                       color: 'green'}
						                 },
						         cardStack:                       //配置cardStack
						                {
						                 gesturesEnabled: true,   //允许右滑返回
						                }
           },
          mode: 'card',                     // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
          headerMode: 'screen',             // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
           onTransitionStart: ()=>{ 
                                  console.log('导航栏切换开始');    // 回调
                                   },           
          onTransitionEnd: ()=>{ 
                               console.log('导航栏切换结束');        // 回调
                               } 

   }
)
```

## navigationOptions

### 版本1

| navigationOptions参数   ||||
|---|-------|----|---|
|   title   |   导航栏的标题   |||
|  header   |   导航栏设置对象   |||
|           |visible|导航栏是否显示||
|           |title|导航栏的标题, 可以是字符串也可以是个组件||
|           |backTitle| 左上角的返回键文字, 默认是上一个页面的title||
|           |right| 导航栏右按钮||
|           |left|导航栏左按钮||
|           |style|导航栏的style||
|           |titleStyle|导航栏的title的style||
|           |tintColor|导航栏颜色||
|           |cardStack|配置card stack||
|           | |gesturesEnabled|是否允许右滑返回，在iOS上默认为true，在Android上默认为false||
|           ||||

### 版本2
| navigationOptions参数   ||||
|---|-------|----|---|
 |title |可以作为头部标题 headerTitle ，或者Tab标题 tabBarLabel|||
|header | 自定义的头部组件，使用该属性后系统的头部组件会消失|||
||headerTitle |头部的标题，即页面的标题||
||headerBackTitle | 返回标题，默认为 title||
||headerTruncatedBackTitle |返回标题不能显示时（比如返回标题太长了）显示此标题，默认为 “Back”|
||headerRight | 头部右边组件||
||headerLeft |头部左边组件||
||headerStyle|头部组件的样式||
||headerTitleStyle|头部标题的样式||
||headerBackTitleStyle |头部返回标题的样式||
|| headerTintColor |头部颜色||
||headerPressColorAndroid |Android 5.0 以上MD风格的波纹颜色||
|esturesEnabled | 否能侧滑返回， iOS 默认 true ， Android 默认 false|||


## 在组件中设置static navigationOptions-示例

```
   static navigationOptions = { 
         title:     'homeThree', 
         header:    (navigation, defaultHeader) =>（{
												          ...defaultHeader,   // 默认预设 
												          visible: true ,     // 覆盖预设中的此项 
												          }), 
         cardStack: {
			          gesturesEnabled: false // 是否可以右滑返回 
			          }};
```

>或这样 

```
    static navigationOptions = { 
         //标题写死  title: 'Two', 
         // 动态标题
         title: (navigation, childRouter) => { 
				          if (navigation.state.params.isSelected) 
				          { 
				          return `${navigation.state.params.name}选中`; 
				          } 
				          else
				          { 
				           return `${navigation.state.params.name}没选中`;
				          } 
                   },
         header: ({ state, setParams, goBack }) => { 
		               let right; 
		               if (state.params.isSelected) 
		               {
		                    right = (<Button title="取消" 
		                                     onPress={() => setParams({ isSelected: false })}/>);
		               } 
		               else 
		               {
		                    right = (<Button title="选择"
		                                     onPress={() => setParams({ isSelected: true })}/>);
                     }
                     let left = (<Button title="返回"
                            onPress={() => goBack()}/>);
                     let visible = false;  // 是否显示导航栏
        return { right, left, visible };
    },
    // header: {left: <Button title="返回"/>},
};

```



## StackNavigatorConfig 

```
参数表示导航器的配置，包括导航器的初始页面、各个页面之间导航的动画、页面的配置选项等等
```


| StackNavigatorConfig 参数||||
|:-----|:-------|:------|:---------|
|initialRouteName | 设置默认的页面组件，必须是上面已注册的页面组件  |||
|initialRouteParams|初始路由的参数|||
|navigationOptions|屏幕导航的默认选项|||
|paths| RouteConfigs里面路径设置的映射|||
|mode|页面切换模式|||
||card|普通app常用的左右切换||
||modal|上下切换||
|headerMode|导航栏的显示模式:|||
||float|无透明效果, 默认||
||screen|有渐变透明效果||
||none|隐藏导航栏||
|cardStyle|样式|||
|onTransitionStart|页面切换开始时的回调函数|||
|onTransitionEnd|页面切换结束时的回调函数|||
|||||


[参考1](http://blog.csdn.net/sinat_17775997/article/details/70176688)
[参考2](http://blog.csdn.net/sinat_17775997/article/details/75659713)

---------------------------------------------------------------------------
# 二、TabNavigator 标签栏
> 注册TabNavigator
```
  const Tabs = TabNavigator({   
       Home: {        
             screen: Home,       
             navigationOptions: {  // 也可以写在组件的static navigationOptions内 
                   tabBar: {    
                            label: '首页',   
                            icon: ({tintColor}) => (<Image source={require('./app/images/home.png')} 
                                                           style={[{tintColor: tintColor},styles.icon]}/>),
                          }, 
                              }
              },  
        Bill: {  
               screen: Bill,     
               navigationOptions: {     
                       tabBar: {            
                            label: '账单',       
                                     icon: ({tintColor}) => (<Image source={require('./app/images/bill.png')}
                                                                    style={[{tintColor: tintColor},styles.icon]}/>), 
                               },
                                }
                 },   
         Me: {  
             screen: Me,      
             navigationOptions: {  
                        tabBar: {             
                             label: '我',             
                             icon: ({tintColor}) => (<Image source={require('./app/images/me.png')}
                                                            style={[{tintColor: tintColor},styles.icon]}/>), 
                                }, 
                                } 
              }
         }, 
         {   
           animationEnabled: false,                                        // 切换页面时是否有动画效果  
           tabBarPosition: 'bottom',                                       // 显示在底端，android 默认是显示在页面顶端的    
           swipeEnabled: false,                                            // 是否可以左右滑动切换tab      
           backBehavior: 'none',                                           // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转      
           tabBarOptions: {          
                         activeTintColor: '#ff8500',                       // 文字和图片选中颜色    
                         inactiveTintColor: '#999',                        // 文字和图片未选中颜色        
                         showIcon: true,                                   // android 默认不显示 icon, 需要设置为 true 才会显示      
                         indicatorStyle: {            
                                       height: 0                          // 如TabBar下面显示有一条线，可以设高度为0后隐藏 },     
                                       style: {  backgroundColor: '#fff', // TabBar 背景色 // height: 44 },     
                                       labelStyle: {   fontSize: 10,      // 文字大小 },
                                         },
          }
          );
```

## screen：
>和导航的功能是一样的，对应界面名称，可以在其他页面通过这个screen传值和跳转。  
      
## navigationOptions：
>配置TabNavigator的一些属性  
>❶title：标题，会同时设置导航条和标签栏的title  
>❷tabBarVisible：是否隐藏标签栏。默认不隐藏(true)  
>❸tabBarIcon：设置标签栏的图标。需要给每个都设置  
>❹tabBarLabel：设置标签栏的title。推荐  
      
## 导航栏配置  
### ❶tabBarPosition
>设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom'）    
###swipeEnabled
>是否允许在标签之间进行滑动  
      
### animationEnabled
>是否在更改标签时显示动画  
      
###lazy
>是否根据需要懒惰呈现标签，而不是提前，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐为true  
      
### trueinitialRouteName
> 设置默认的页面组件  
      
### backBehavior
>按 back 键是否跳转到第一个Tab(首页)， none 为不跳转  
### tabBarOptions
>配置标签栏的一些属性iOS属性  
      
### activeTintColor
>label和icon的前景色 活跃状态下  
      
### activeBackgroundColor
>label和icon的背景色 活跃状态下  
      
### inactiveTintColor
>label和icon的前景色 不活跃状态下  
      
### inactiveBackgroundColor
>label和icon的背景色 不活跃状态下  
      
### showLabel
>是否显示label，默认开启 style：tabbar的样式  
      
### labelStyle
>label的样式安卓属性  
      
###  activeTintColor
>label和icon的前景色 活跃状态下  
      
### inactiveTintColor
>label和icon的前景色 不活跃状态下  
      
###  showIcon
>是否显示图标，默认关闭  
      
### showLabel
>是否显示label，默认开启 style：tabbar的样式  
      
### labelStyle
>label的样式 upperCaseLabel：是否使标签大写，默认为true  
      
###  pressColor
>material涟漪效果的颜色（安卓版本需要大于5.0）  
      
###  pressOpacity
>按压标签的透明度变化（安卓版本需要小于5.0）  
      
### scrollEnabled
>是否启用可滚动选项卡 tabStyle：tab的样式  
      
###  indicatorStyle
>标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题  
      
###  labelStyle
>label的样式  
      
###  iconStyle
>图标样式  

----------------------------------------------------------
# 三、DrawerNavigator

```
const DrawerNav = DrawerNavigator({   
                 Home: { screen: Home },    
                 Bill: { screen: Bill },    
                 Me: { screen: Me },    
                 HomeTwo: { screen: HomeTwo },    
                 HomeThree: { screen: HomeThree },   
                 HomeFour: { screen: HomeFour },    
                 BillTwo: { screen: BillTwo },    
                 BillThree: { screen: BillThree } 
               }, 
               { 
                   drawerWidth: 200, // 抽屉宽   
                   drawerPosition: 'left', // 抽屉在左边还是右边 
                   // contentComponent: CustomDrawerContentComponent, // 自定义抽屉组件 
                   contentOptions: {     
                                  initialRouteName: Home,           // 默认页面组件     
                                  activeTintColor: 'white',         // 选中文字颜色     
                                  activeBackgroundColor: '#ff8500', // 选中背景颜色     
                                  inactiveTintColor: '#666',        // 未选中文字颜色     
                                  inactiveBackgroundColor: '#fff',  // 未选中背景颜色   
                                  style: { // 样式 } 
                                } 
               });
```



##  DrawerNavigatorConfig
  
```
DrawerNavigatorConfig  
  
    drawerWidth - 抽屉的宽度  
    drawerPosition - 选项是左或右。 默认为左侧位置  
    contentComponent - 用于呈现抽屉内容的组件，例如导航项。 接收抽屉的导航。 默认为DrawerItems  
    contentOptions - 配置抽屉内容  
  
    initialRouteName - 初始路由的routeName  
    order - 定义抽屉项目顺序的routeNames数组。  
    路径 - 提供routeName到路径配置的映射，它覆盖routeConfigs中设置的路径。  
    backBehavior - 后退按钮是否会切换到初始路由？ 如果是，设置为initialRoute，否则为none。 默认为initialRoute行为  
  
   DrawerItems的contentOptions属性  
  
    activeTintColor - 活动标签的标签和图标颜色  
    activeBackgroundColor - 活动标签的背景颜色  
    inactiveTintColor - 非活动标签的标签和图标颜色  
    inactiveBackgroundColor - 非活动标签的背景颜色  
    内容部分的样式样式对象  
    labelStyle - 当您的标签是字符串时，要覆盖内容部分中的文本样式的样式对象
```



---------------------------------------------------------------------------
# 四、使用:StackNavigator + TabNavigator
>简单使用StackNavigator + TabNavigator实现Tab界面切换、界面间导航
## 结构
>
>MyStackNavigator.js
> MyTabBarItem.js
>

## API定义

```
StackNavigator(RouteConfigs, StackNavigatorConfig)
TabNavigator(RouteConfigs, TabNavigatorConfig)
```

## 集成 react-navigation

```
$ npm install react-navigation --save 
```
## 导入必要组件

```
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';  


```




------------------------------------------------------------------
 http://blog.csdn.net/haoranli/article/details/61917583
 
 http://blog.csdn.net/u013718120/article/details/72357698
 
 
[原文参考](http://blog.csdn.net/u013718120/article/details/72357698)


博客重要参考


http://lovenight.github.io/2015/11/10/Hexo-3-1-1-%E9%9D%99%E6%80%81%E5%8D%9A%E5%AE%A2%E6%90%AD%E5%BB%BA%E6%8C%87%E5%8D%97/
