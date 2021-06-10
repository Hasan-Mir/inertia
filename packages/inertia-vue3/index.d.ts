import * as Inertia from '@inertiajs/inertia'
import { Ref, ComputedRef, App as VueApp, DefineComponent, Plugin } from 'vue'

interface InertiaAppProps {
  initialPage: Inertia.Page
  initialComponent?: object
  resolveComponent?: (name: string) => DefineComponent
  onHeadUpdate?: (elements: string[]) => void
}

type InertiaApp = DefineComponent<InertiaAppProps>

export const App: InertiaApp

export const plugin: Plugin

interface CreateInertiaAppProps {
  id?: string
  resolve: (name: string) => 
    DefineComponent |
    Promise<DefineComponent> |
    { default: DefineComponent }
  setup: (props: {
    el: Element
    app: InertiaApp
    props: InertiaAppProps
    plugin: Plugin
  }) => void | VueApp
  page?: Inertia.Page
  render?: (app: VueApp) => Promise<string>
}

export declare function createInertiaApp(props: CreateInertiaAppProps): Promise<{ head: string[], body: string } | void>

interface InertiaLinkProps {
  as?: string
  data?: object
  href: string
  method?: string
  headers?: object
  onClick?: (event: MouseEvent | KeyboardEvent) => void
  preserveScroll?: boolean | ((props: Inertia.PageProps) => boolean)
  preserveState?: boolean | ((props: Inertia.PageProps) => boolean) | null
  replace?: boolean
  only?: string[]
  onCancelToken?: (cancelToken: import('axios').CancelTokenSource) => void
  onBefore?: () => void
  onStart?: () => void
  onProgress?: (progress: number) => void
  onFinish?: () => void
  onCancel?: () => void
  onSuccess?: () => void
}

type InertiaLink = DefineComponent<InertiaLinkProps>

export const Link: InertiaLink

type ProgressEvent = {
  percentage: number
}

interface InertiaFormProps<TForm> {
  isDirty: boolean
  errors: Record<keyof TForm, string>
  hasErrors: boolean
  processing: boolean
  progress: ProgressEvent | null
  wasSuccessful: boolean
  recentlySuccessful: boolean
  data(): TForm
  transform(callback: (data: TForm) => object): this
  reset(...fields: (keyof TForm)[]): this
  clearErrors(...fields: (keyof TForm)[]): this
  submit(method: string, url: string, options?: Inertia.VisitOptions): void
  get(url: string, options?: Inertia.VisitOptions): void
  post(url: string, options?: Inertia.VisitOptions): void
  put(url: string, options?: Inertia.VisitOptions): void
  patch(url: string, options?: Inertia.VisitOptions): void
  delete(url: string, options?: Inertia.VisitOptions): void
  cancel(): void
}

type InertiaForm<TForm> = TForm & InertiaFormProps<TForm>

export declare function useForm<TForm>(data: TForm): InertiaForm<TForm>

export declare function useForm<TForm>(rememberKey: string, data: TForm): InertiaForm<TForm>

export declare function useRemember(data: object, key?: string): Ref<object>

export declare function usePage<PageProps>(): {
  props: ComputedRef<PageProps & Inertia.PageProps>
  url: ComputedRef<string>
  component: ComputedRef<string>
  version: ComputedRef<string | null>
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $inertia: Inertia.Inertia
    $page: Inertia.Page
  }

  export interface ComponentCustomOptions {
    remember?:
      string |
      string[] |
      {
        data: string | string[]
        key?: string | (() => string)
      }
  }
}
