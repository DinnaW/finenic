import {test} from 'node:test'
import assert from 'node:assert/strict'
import {domainSuggestions} from '../src/domain.js'
test('normalizes names and preserves requested domain',()=>{assert.deepEqual(domainSuggestions(' Hello '),['hello.com','hello.io','hello.co','hello.net']);assert.equal(domainSuggestions('https://Example.org/')[0],'example.org');assert.equal(domainSuggestions('example.co.uk')[0],'example.co.uk')})
test('rejects malformed and empty input',()=>{for(const input of ['', '   ','bad name','-bad.com','bad-.com','a..com','name.com/path','name.1','<script>','a'.repeat(64)+'.com'])assert.throws(()=>domainSuggestions(input))})
test('results are unique and bounded',()=>{const r=domainSuggestions('example.io');assert.equal(r.length,4);assert.equal(new Set(r).size,4);assert.equal(r[0],'example.io')})
