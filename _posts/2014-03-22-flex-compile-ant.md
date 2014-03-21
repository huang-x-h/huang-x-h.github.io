---
layout: post
comments: true
title: Flex使用Ant编译介绍
date: 2014-03-22 00:04:29 
last_modify_date: 2014-03-22 00:04:37 
categories: flex
tags: flex
---

Flex编译除了使用Flash Builder或者Flash Developer等IDE工具编译之外，还支持ant脚本编译。下面就简单介绍结合ant脚本编译应用、模块和文档。

准备环境

- [Ant](http://ant.apache.org/manual/)
- Flex SDK3.5


## 编译应用(mxmlc) ##

1. 编写build.prperties配置FlexSDK和项目目录，示例如下：

		# enviroment configuration
		FLEX_HOME=E:/flexsdk/3.5.0
		framework.dir=${FLEX_HOME}/frameworks/projects/framework
		
		project.src.dir=LittleBean/src
		project.locale.dir=LittleBean/locale
		project.libs.dir=LittleBean/libs
		project.release.dir=LittleBean/release
		
		mxmlc.jvm.args=-Xmx512m

	**注意点：**

	- 一定要配置`FLEX_HOME`，设置FlexSDK的路径，键值名称必须大写，不能修改

	- 在Windows下FlexSDK的位置必须同需要编译的工程在同一盘符下，即FlexSDK在E盘下，那么编译的工程需在E盘，如果不同则会报错，FlexSDK编译的一个bug

2. 编写build.xml配置编译应用，示例如下：

		<?xml version="1.0" encoding="UTF-8"?>
		<project name="Flex Compile" default="compile.app" basedir=".">
			<description>Flex Compile</description>
			
		 	<!-- Set Parameters -->
			<property file="build.properties" />
		
			<!-- Definitions $ References -->
			<taskdef resource="flexTasks.tasks" classpath="${FLEX_HOME}/ant/lib/flexTasks.jar" />
			
			<target name="compile.app">
				<mxmlc file="${project.src.dir}/LittleBean.mxml"
					output="${project.release.dir}/LittleBean.swf"
					actionscript-file-encoding="UTF-8" 
					debug="false" fork="true">
					<load-config filename="${FLEX_HOME}/frameworks/flex-config.xml" />
					<source-path path-element="${project.src.dir}" />
					<external-library-path dir="${FLEX_HOME}/frameworks/libs">                 
						<include name="datavisualization.swc" />
						<include name="framework.swc" />
						<include name="rpc.swc" />                 
					</external-library-path>
					<library-path dir="${project.libs.dir}" append="true">
						<include name="*.swc" />
					</library-path>
					<jvmarg line="${mxmlc.jvm.args}"/>
				</mxmlc>
			</target>
		</project>

	执行`ant -f build.xml`，输出结果如下：

		Buildfile: e:\workspaceforflex\build.xml

		compile.app:
		    [mxmlc] Loading configuration file E:\flexsdk\3.5.0\frameworks\flex-config.xml
		    [mxmlc] E:\workspaceforflex\LittleBean\release\LittleBean.swf (63954 bytes)
		
		BUILD SUCCESSFUL
		Total time: 6 seconds

	**脚本介绍：**
	
	- `<property file="build.properties" />` 引入配置文件信息
	- `<taskdef resource="flexTasks.tasks" classpath="${FLEX_HOME}/ant/lib/flexTasks.jar" />` 定义flexTasks，使在ant脚本中可以调用`mxmlc`、`compc`和`asdoc`等命令
	- `mxmlc` 节点介绍
		- `file`指定Application应用文件路径
		- `output`指定编译输出路径和文件名称
		- `actionscript-file-encoding`指定文件编码
		- `debug`是否debug版本
		- `fork`是否新启进程
	- `load-config`指定加载配置文件，这里设置是加载sdk默认的配置文件
	- `source-path` 指定编译源文件路径
	- `external-library-path` 设置外部链接库，这些库文件内容编译不打包到swf中，一般用于RSL（共享库）中
	- `library-path` 设置链接库，这里一定要追加`append="true"`表示追加不覆盖配置文件里的，因为flex-config.xml中已经定义了`library-path`节点，节选自FlexSDK3.5：
		
			<!-- List of SWC files or directories that contain SWC files. -->
		      <library-path>
		         <path-element>libs</path-element>   
				 <!-- keep the original location in the libpath for backwards-compatibility -->
		         <path-element>libs/player</path-element>
		         <path-element>libs/player/{targetPlayerMajorVersion}</path-element>    
			     <path-element>locale/{locale}</path-element>
		      </library-path>

	- `include-libraries` 设置包含链接库，无论库中有没有用到，一律打包到swf中，一般不常用。示例用法：

			<include-libraries dir="${project.libs.dir}">
				<include name="*.swc" />
			</include-libraries>

	- `locale` 设置支持国际化语言，使用Flex内置国际化语言功能，那么在编译脚本上做如下修改
		- 在`build.properties`配置文件上添加 `library.locale=zh_CN,en_US`
		- 在`build.xml`的`mxmlc`节点上添加`locale="${library.locale}"`
		- 在`mxmlc`节点内指定国际化目录`<source-path path-element="${project.locale.dir}/{locale}" />`

## 编译库(compc) ##

1. 在`build.properties`追加库配置，示例如下：

		library.src.dir=LittleBeanLibrary/src
		library.release.dir=LittleBeanLibrary/release
		library.name=LittleBeanLibrary
	
		compc.jvm.args=-Xmx512m

2. 在`build.xml`追加库编译，示例如下：
	
		<target name="compile.library" description="build library">
			<compc output="${library.release.dir}/${library.name}.swc"
				fork="true" debug="false" warn-no-constructor="false">
				<namespace uri="library://ns.littlebean.com/flex/littlebean" manifest="${library.src.dir}/manifest.xml" />
				<include-namespaces uri="library://ns.littlebean.com/flex/littlebean" />
				<source-path path-element="${library.src.dir}" />
				<external-library-path dir="${FLEX_HOME}/frameworks/libs">
					<include name="player/9/playerglobal.swc" />
					<include name="datavisualization.swc" />
					<include name="framework.swc" />
					<include name="rpc.swc" />
					<include name="utilities.swc" />
				</external-library-path>
				<keep-as3-metadata name="Bindable" />
				<keep-as3-metadata name="Managed" />
				<keep-as3-metadata name="ChangeEvent" />
				<keep-as3-metadata name="NonCommittingChangeEvent" />
				<keep-as3-metadata name="Transient" />
				<jvmarg line="${compc.jvm.args}" />
			</compc>
		</target>

	执行`ant -f build.xml compile.library`，输出结果如下：

		Buildfile: e:\workspaceforflex\build.xml

		compile.library:
		    [compc] Loading configuration file E:\flexsdk\3.5.0\frameworks\flex-config.xml
		    [compc] E:\workspaceforflex\LittleBeanLibrary\release\LittleBeanLibrary.swc (1756 bytes)
		
		BUILD SUCCESSFUL
		Total time: 4 seconds

	**脚本介绍**
	
	编译库swc基本同编译应用swf一样，只是相应的命令不一样，一个是`compc`一个是`mxmlc`。

	在编译库时有多一个命名空间的控制，用于外部可以在申明的命名空间中访问注册的类。

	- `<namespace uri="library://ns.littlebean.com/flex/littlebean" manifest="${library.src.dir}/manifest.xml" />` 指定命名空间地址和注册的清单文件路径。相应清单文件定义介绍参看[About manifest files](http://help.adobe.com/en_US/flex/using/WS2db454920e96a9e51e63e3d11c0bf69084-7aa8.html)
	- `<include-namespaces uri="library://ns.littlebean.com/flex/littlebean" />` 指定编译生成的swc包含相应命名空间
	- `keep-as3-metadata` 指定所需要的元素据。相应元素据介绍参看[About MetaData](http://help.adobe.com/en_US/flex/using/WS2db454920e96a9e51e63e3d11c0bf680e1-7ffe.html)

## 编译文档 ##

一般在开发类库时，都会在代码中写注释。Flex提供`asdoc`命令来生成注释文档

1. 在`build.properties`追加库配置，示例如下：

		asdoc.exe=${FLEX_HOME}/bin/asdoc.exe
		asdoc.title=LittleBean&#xA0;API&#xA0;Documentation
		asdoc.footer=Copyright&#xA0;by&#xA0;LittleBean
		asdoc.release=LittleBeanLibrary/docs

2. 在`build.xml`追加库编译，示例如下：

		<target name="compile.asdoc">
			<exec executable="${asdoc.exe}" failonerror="true">
		        <arg line="-output ${asdoc.release}" />
				<arg line="-source-path ${library.src.dir}"/>
				<arg line="-doc-sources ${library.src.dir}"/>
				<arg line="-main-title ${asdoc.title}" />
		        <arg line="-footer ${asdoc.footer}" />
			</exec>
		</target>

	执行`ant -f build.xml compile.asdoc`，输出结果如下：

		Buildfile: e:\workspaceforflex\build.xml

		compile.asdoc:
		     [exec] Loading configuration file E:\flexsdk\3.5.0\frameworks\flex-config.xml
		     [exec] 
		     [exec] 
		     [exec] 
		     [exec] 
		     [exec] 
		     [exec] Documentation was created in e:\workspaceforflex\LittleBeanLibrary\docs\
		
		BUILD SUCCESSFUL
		Total time: 6 seconds

	**脚本介绍**
	
	本文采用的SDK3.5来进行编译的，asdoc只能通过ant调用exe来执行生成文档，在SDK4.*之后进行了更好的支持，可以直接写`asdoc`任务

	- `output` 文档输出目录
	- `source-path` 源代码路径
	- `doc-source` 文档源代码路径
	- `main-title` 文档标题内容
	- `footer` 文档尾部内容
	- `template` 指定模板路径，可以用于定制文档模板。例如从原来SDK里的`asdoc/templates`拷贝一份基于上面定制修改

整体示例文件下载[build.properties](/files/build.properties)和[build.xml](/files/build.xml)