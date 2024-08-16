import { E_TYPE } from "./src/Config.ts";
import { Ruler } from "./src/Ruler.ts";
import { assertEquals } from "@std/assert";

const ruler = new Ruler();

Deno.test("can-defeat: DOUBLE_JOKER vs SINGLE", () => {
  const result = ruler.canDefeat([0x4e, 0x4f], [0x01], E_TYPE.SINGLE);
  assertEquals(result.can, true);
});
