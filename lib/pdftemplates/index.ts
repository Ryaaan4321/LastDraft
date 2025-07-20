import { generateBlueSidebarHTML } from "./blueSidebarTemplate";
import { generateCenteredHTML } from "./centeredTemplate";
import { generateMinimalistHTML } from "./minimalisTemplate";
import { generateSidebarHTML } from "./modernSideBarTemplate";
import { generateSimpleTwoColumnHTML } from "./simpletwocolumnTemplate";
export const templateGenerators: Record<string, (resume: any) => string> = {
    modern: generateSidebarHTML,
    blue: generateBlueSidebarHTML,
    minimalist:generateMinimalistHTML,
    center:generateCenteredHTML,
    twocolumn:generateSimpleTwoColumnHTML
};