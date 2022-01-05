/*
 * Copyright 2021 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { IconCodepoints } from "./generated/blueprint-icons";
import type { IconName } from "./iconNames";

/**
 * Icon codepoints as base 10 number strings. If you need to render these strings
 * into an SVG document or as `::before` pseudo content, consider using `getIconContentString()`
 * instead.
 */
export { IconCodepoints };

/**
 * Returns the hex code content string which represents the codepoint in the icon font
 * for a given icon. You can render this string to the DOM and if the icon font is loaded
 * as an active font family, this string will be replaced with the associated icon.
 */
export function getIconContentString(icon: IconName) {
    const codepoints = IconCodepoints as Record<IconName, string>;
    // parse base 10 number from string, then convert to hex code
    return String.fromCodePoint(parseInt(codepoints[icon], 10));
}
