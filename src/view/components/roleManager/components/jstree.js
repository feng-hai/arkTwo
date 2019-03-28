import jstreeTemplate from './jstree.vue'
import Vue from 'vue'
import $ from 'jquery'
import jstree from 'jstree'

var Jstree = Vue.extend({
	jstreeTemplate,
	ready(){
		this.init()
	},
	methods: {
		init(){
			$('demo').jstree({
				'core': [{
				id : 'root1',
				text: 'window',
				children: [{
					id: 'root1-1',
					text: 'window1-1'
				}]
			},{
				id : 'root2',
				text: 'window',
				children: [{
					id: 'root2-1',
					text: 'window2-1'
				}]
			}],
			'plugins' : ['contexttmenu', 'dnd', 'search']
			})
		}
	}
})

export default Jstree