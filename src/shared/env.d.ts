/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly MAIN_VITE_APP_DB_PATH: string
    readonly MAIN_VITE_APP_DB_PATH_PACKAGED: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

export {}
declare global {
    const EffectScope: (typeof import('vue'))['EffectScope']
    const ElEmpty: (typeof import('element-plus/es'))['ElEmpty']
    const ElScrollbar: (typeof import('element-plus/es'))['ElScrollbar']
    const computed: (typeof import('vue'))['computed']
    const createApp: (typeof import('vue'))['createApp']
    const customRef: (typeof import('vue'))['customRef']
    const defineAsyncComponent: (typeof import('vue'))['defineAsyncComponent']
    const defineComponent: (typeof import('vue'))['defineComponent']
    const effectScope: (typeof import('vue'))['effectScope']
    const getCurrentInstance: (typeof import('vue'))['getCurrentInstance']
    const getCurrentScope: (typeof import('vue'))['getCurrentScope']
    const h: (typeof import('vue'))['h']
    const inject: (typeof import('vue'))['inject']
    const isProxy: (typeof import('vue'))['isProxy']
    const isReactive: (typeof import('vue'))['isReactive']
    const isReadonly: (typeof import('vue'))['isReadonly']
    const isRef: (typeof import('vue'))['isRef']
    const markRaw: (typeof import('vue'))['markRaw']
    const nextTick: (typeof import('vue'))['nextTick']
    const onActivated: (typeof import('vue'))['onActivated']
    const onBeforeMount: (typeof import('vue'))['onBeforeMount']
    const onBeforeUnmount: (typeof import('vue'))['onBeforeUnmount']
    const onBeforeUpdate: (typeof import('vue'))['onBeforeUpdate']
    const onDeactivated: (typeof import('vue'))['onDeactivated']
    const onErrorCaptured: (typeof import('vue'))['onErrorCaptured']
    const onMounted: (typeof import('vue'))['onMounted']
    const onRenderTracked: (typeof import('vue'))['onRenderTracked']
    const onRenderTriggered: (typeof import('vue'))['onRenderTriggered']
    const onScopeDispose: (typeof import('vue'))['onScopeDispose']
    const onServerPrefetch: (typeof import('vue'))['onServerPrefetch']
    const onUnmounted: (typeof import('vue'))['onUnmounted']
    const onUpdated: (typeof import('vue'))['onUpdated']
    const onWatcherCleanup: (typeof import('vue'))['onWatcherCleanup']
    const provide: (typeof import('vue'))['provide']
    const reactive: (typeof import('vue'))['reactive']
    const readonly: (typeof import('vue'))['readonly']
    const ref: (typeof import('vue'))['ref']
    const resolveComponent: (typeof import('vue'))['resolveComponent']
    const shallowReactive: (typeof import('vue'))['shallowReactive']
    const shallowReadonly: (typeof import('vue'))['shallowReadonly']
    const shallowRef: (typeof import('vue'))['shallowRef']
    const toRaw: (typeof import('vue'))['toRaw']
    const toRef: (typeof import('vue'))['toRef']
    const toRefs: (typeof import('vue'))['toRefs']
    const toValue: (typeof import('vue'))['toValue']
    const triggerRef: (typeof import('vue'))['triggerRef']
    const unref: (typeof import('vue'))['unref']
    const useAttrs: (typeof import('vue'))['useAttrs']
    const useCssModule: (typeof import('vue'))['useCssModule']
    const useCssVars: (typeof import('vue'))['useCssVars']
    const useId: (typeof import('vue'))['useId']
    const useModel: (typeof import('vue'))['useModel']
    const useSlots: (typeof import('vue'))['useSlots']
    const useTemplateRef: (typeof import('vue'))['useTemplateRef']
    const watch: (typeof import('vue'))['watch']
    const watchEffect: (typeof import('vue'))['watchEffect']
    const watchPostEffect: (typeof import('vue'))['watchPostEffect']
    const watchSyncEffect: (typeof import('vue'))['watchSyncEffect']
}
// for type re-export
declare global {
    export type {
    	Component,
    	ComponentPublicInstance,
    	ComputedRef,
    	DirectiveBinding,
    	ExtractDefaultPropTypes,
    	ExtractPropTypes,
    	ExtractPublicPropTypes,
    	InjectionKey,
    	PropType,
    	Ref,
    	MaybeRef,
    	MaybeRefOrGetter,
    	VNode,
    	WritableComputedRef
    } from 'vue'
    import('vue')
}
