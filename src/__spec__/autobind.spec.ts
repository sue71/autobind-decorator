/* global describe, it, expect */
/* tslint:disable:no-unused-variable */
import * as chai from "chai"
import { autoBindClass, autoBindMethod } from "../autobind";
let expect = chai.expect;

describe("Autobind decorator", () => {

  describe("Autobind class decorator", () => {

    @autoBindClass
    class SomeClass {

      title: string;
      name: string;

      constructor() {
        this.title = "hoge";
        this.name = "fuga";
      }

      getTitle(): string {
        if (this.title !== null) {
          return this.title;
        } else {
          return "no value";
        }
      }

      getName(): string {
        if (this.name !== null) {
          return this.name;
        } else {
          return "no value";
        }
      }
    }

    it("should bind all method to a class instance", () => {
      let obj = new SomeClass();
      expect(obj.getTitle.apply({})).to.eq("hoge");
      expect(obj.getName.apply({})).to.eq("fuga");
    });

  });

  describe("Autobind method decorator", () => {

    class SomeClass {
      title: string;
      name: string;

      constructor() {
        this.title = "hoge";
        this.name = "fuga";
      }

      @autoBindMethod
      getTitle(): string {
        if (this.title !== null) {
          return this.title;
        } else {
          return "no value";
        }
      }

      getName(): string {
        if (this.name !== null) {
          return this.name;
        } else {
          return "no value";
        }
      }
    }

    it("should bind a method to a class instance", () => {
      let obj = new SomeClass();
      expect(obj.getTitle.apply({})).to.eq("hoge");
      expect(obj.getName.apply({})).not.eq("fuga");
    });

  });

});

