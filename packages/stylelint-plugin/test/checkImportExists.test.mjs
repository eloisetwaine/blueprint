/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
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

import { expect } from "chai";
import postcss from "postcss";

import { checkImportExists } from "../lib/utils/checkImportExists.js";
import { CssSyntax } from "../lib/utils/cssSyntax.js";

describe("checkImportExists", () => {
    it("Returns false if no imports exist", () => {
        const root = postcss.parse(`.some-class { width: 10px }`);
        expect(checkImportExists(CssSyntax.LESS, root, "some_path")).to.be.false;
    });

    it("Returns false if imports exist but not the one we want", () => {
        const root = postcss.parse(`
@import "some_path1";
@import "some_path2";

.some-class {
    width: 10px;
}
    `);
        expect(checkImportExists(CssSyntax.LESS, root, "some_path")).to.be.false;
    });

    it("Returns true if our import exists", () => {
        const root = postcss.parse(`
@import "some_path1";
@import "some_path2";
@import "some_path";
.some-class {
    width: 10px;
}
    `);
        expect(checkImportExists(CssSyntax.LESS, root, "some_path")).to.be.true;
    });

    it("Returns true if our import exists, and works with single quotes", () => {
        const root = postcss.parse(`
@import 'some_path1';
@import 'some_path2';
@import 'some_path';
.some-class {
    width: 10px;
}
    `);
        expect(checkImportExists(CssSyntax.LESS, root, "some_path")).to.be.true;
    });

    it("Returns true if our sass import exists, and works with single quotes", () => {
        const root = postcss.parse(`
@use 'some_path1';
@use 'some_path2';
@use 'some_path' as foo;
.some-class {
    width: 10px;
}
    `);
        expect(checkImportExists(CssSyntax.SASS, root, "some_path", "foo")).to.be.true;
    });

    it("Can match multiple paths", () => {
        const root = postcss.parse(`
@use 'some_path.scss';
.some-class {
    width: 10px;
}
    `);
        expect(checkImportExists(CssSyntax.SASS, root, "some_path")).to.be.true;
    });

    it("Handles less references", () => {
        const root = postcss.parse(`@import (reference) "some_path";`);
        expect(checkImportExists(CssSyntax.LESS, root, "some_path")).to.be.true;
    });
});
