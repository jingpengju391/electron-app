import { h, defineComponent, PropType, watch, useTemplateRef } from 'vue'
import { ClassNameVarType, JsonVirtualContainer } from './type'
import { currentRender, initData, onScroll } from './scroll'

export default defineComponent({
	name: 'VirtualList',
	props: {
		list: {
			type: Array as <T>() => T[],
			default: () => [],
			required: true
		},
		width: [String, Number] as PropType<string | number>,
		height: [String, Number] as PropType<string | number>
	},
	setup(props) {
		const containerOrderNode = useTemplateRef<HTMLDivElement | null>('scrollbarRef')

		watch(
			() => [props.height, props.list],
			() => initData(props.list),
			{ immediate: true }
		)
		return { containerOrderNode }
	},
	render() {
		const width = typeof this.width === 'string' ? this.width : `${this.width || 100}${this.width ? 'px' : '%'}`
		const height = typeof this.height === 'string' ? this.height : `${this.height || 100}${this.height ? 'px' : '%'}`
		const style = { width, height }

		const renderView = () =>
			currentRender.value.map((item, index) =>
				h(
					JsonVirtualContainer.HTMLTag,
					{
						class: ClassNameVarType.containerItem
					},
					this.$slots.default?.({ item, index })
				)
			)

		return currentRender.value.length
			? h(
					ElScrollbar,
					{
						class: ClassNameVarType.container,
						style,
						onScroll: (scroll) => onScroll(scroll, this.list)
					},
					renderView
				)
			: h(ElEmpty, { style, description: '暂无数据' })
	}
})
