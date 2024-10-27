import { h, defineComponent, PropType, watch, useTemplateRef } from 'vue'
import { ClassNameVarType, JsonVirtualContainer } from './type'
import { currentRender, initData, onScroll } from './scroll'

type VirtualListProps<T> = {
    list: T[]
    width: string | number
    height: string | number
}

export default defineComponent({
	name: 'VirtualList',
	props: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		list: Array as PropType<any[]>,
		width: [String, Number] as PropType<string | number>,
		height: [String, Number] as PropType<string | number>
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setup(props: VirtualListProps<any>) {
		const containerOrderNode = useTemplateRef<HTMLDivElement | null>('scrollbarRef')
		watch(
			() => props.height,
			() => props.list?.length && props.height && initData(props.list),
			{ immediate: true }
		)
		return { containerOrderNode }
	},
	render() {
		const width = typeof this.width === 'string' ? this.width : `${this.width}px`
		const height = typeof this.height === 'string' ? this.height : `${this.height}px`
		const style = { width, height }

		const renderView = () =>
			currentRender.value.length
				? currentRender.value.map((item, index) =>
					h(
						JsonVirtualContainer.HTMLTag,
						{
							class: ClassNameVarType.containerItem
						},
						this.$slots.default?.({ item, index })
					)
				)
				: h(ElEmpty, { description: '暂无数据' })

		return h(
			ElScrollbar,
			{
				class: ClassNameVarType.container,
				style,
				onScroll: (scroll) => onScroll(scroll)
			},
			renderView
		)
	}
})
