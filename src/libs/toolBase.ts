import type { z } from "zod";
import type {
  PointerFunctionType,
  Tool,
  ToolInitializerType,
} from "../types/toolInstance.type";

export abstract class ToolBase<O extends ToolInitializerType>
  implements Tool<O>
{
  static schema: z.ZodTypeAny;

  id: string;
  name: string;

  protected constructor(options: O) {
    this.id = options.id;
    this.name = (this.constructor as any).toolName;
  }

  static getSchema(): z.ZodTypeAny {
    return (this as any).schema;
  }

  updateOptions(options?: Partial<O>) {
    if (!options) return;
    const schema = (this.constructor as any).schema.partial();
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
