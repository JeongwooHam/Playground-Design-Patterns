import type { z } from "zod";
import type {
  PointerFunctionType,
  ToolInitializerType,
} from "../types/toolInstance.type";

export abstract class ToolBase<O extends ToolInitializerType> {
  static schema: z.ZodTypeAny;

  id: string;
  name: string;

  protected constructor(options: O) {
    this.id = options.id;
    this.name = (this.constructor as any).toolName;
  }

  static getSchema(): z.ZodTypeAny {
    return this.schema;
  }

  updateOptions(options?: Partial<O>, callback?: () => void) {
    if (!options) return;
    callback?.();
    const schema = (this.constructor as any).schema;
    try {
      schema.parse(options);
      Object.assign(this, options);
    } catch (e) {
      console.error(`Invalid options provided to ${this.name}:`, e);
    }
  }

  abstract render(
    ctx: CanvasRenderingContext2D,
    shapeData: any,
    properties?: Record<string, unknown>
  ): void;
  abstract onPointerDown?: PointerFunctionType;
  abstract onPointerMove?: PointerFunctionType;
  abstract onPointerUp?: PointerFunctionType;
}
