// utils/route-params.ts
export function decodeRouteParam(param: string): string {
    try {
      return decodeURIComponent(param)
    } catch {
      return param
    }
  }