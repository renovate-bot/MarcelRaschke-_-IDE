"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/build/generate-contributions.ts
var generate_contributions_exports = {};
__export(generate_contributions_exports, {
  debuggers: () => debuggers
});
module.exports = __toCommonJS(generate_contributions_exports);

// src/common/contributionUtils.ts
var preferredDebugTypes = /* @__PURE__ */ new Map([
  ["pwa-node" /* Node */, "node"],
  ["pwa-chrome" /* Chrome */, "chrome"],
  ["pwa-extensionHost" /* ExtensionHost */, "extensionHost"],
  ["pwa-msedge" /* Edge */, "msedge"]
]);
var debugTypes = {
  ["pwa-extensionHost" /* ExtensionHost */]: null,
  ["node-terminal" /* Terminal */]: null,
  ["pwa-node" /* Node */]: null,
  ["pwa-chrome" /* Chrome */]: null,
  ["pwa-msedge" /* Edge */]: null
};
var commandsObj = {
  ["extension.js-debug.addCustomBreakpoints" /* ToggleCustomBreakpoints */]: null,
  ["extension.js-debug.addXHRBreakpoints" /* AddXHRBreakpoints */]: null,
  ["extension.js-debug.editXHRBreakpoints" /* EditXHRBreakpoint */]: null,
  ["extension.pwa-node-debug.attachNodeProcess" /* AttachProcess */]: null,
  ["extension.js-debug.clearAutoAttachVariables" /* AutoAttachClearVariables */]: null,
  ["extension.js-debug.setAutoAttachVariables" /* AutoAttachSetVariables */]: null,
  ["extension.js-debug.autoAttachToProcess" /* AutoAttachToProcess */]: null,
  ["extension.js-debug.createDebuggerTerminal" /* CreateDebuggerTerminal */]: null,
  ["extension.js-debug.createDiagnostics" /* CreateDiagnostics */]: null,
  ["extension.js-debug.getDiagnosticLogs" /* GetDiagnosticLogs */]: null,
  ["extension.js-debug.debugLink" /* DebugLink */]: null,
  ["extension.js-debug.npmScript" /* DebugNpmScript */]: null,
  ["extension.js-debug.pickNodeProcess" /* PickProcess */]: null,
  ["extension.js-debug.prettyPrint" /* PrettyPrint */]: null,
  ["extension.js-debug.removeXHRBreakpoint" /* RemoveXHRBreakpoints */]: null,
  ["extension.js-debug.removeAllCustomBreakpoints" /* RemoveAllCustomBreakpoints */]: null,
  ["extension.js-debug.revealPage" /* RevealPage */]: null,
  ["extension.js-debug.startProfile" /* StartProfile */]: null,
  ["extension.js-debug.stopProfile" /* StopProfile */]: null,
  ["extension.js-debug.toggleSkippingFile" /* ToggleSkipping */]: null,
  ["extension.node-debug.startWithStopOnEntry" /* StartWithStopOnEntry */]: null,
  ["extension.js-debug.requestCDPProxy" /* RequestCDPProxy */]: null,
  ["extension.js-debug.openEdgeDevTools" /* OpenEdgeDevTools */]: null,
  ["extension.js-debug.callers.add" /* CallersAdd */]: null,
  ["extension.js-debug.callers.goToCaller" /* CallersGoToCaller */]: null,
  ["extension.js-debug.callers.gotToTarget" /* CallersGoToTarget */]: null,
  ["extension.js-debug.callers.remove" /* CallersRemove */]: null,
  ["extension.js-debug.callers.removeAll" /* CallersRemoveAll */]: null,
  ["extension.js-debug.enableSourceMapStepping" /* EnableSourceMapStepping */]: null,
  ["extension.js-debug.disableSourceMapStepping" /* DisableSourceMapStepping */]: null,
  ["extension.js-debug.network.viewRequest" /* NetworkViewRequest */]: null,
  ["extension.js-debug.network.copyUri" /* NetworkCopyUri */]: null,
  ["extension.js-debug.network.openBody" /* NetworkOpenBody */]: null,
  ["extension.js-debug.network.openBodyInHex" /* NetworkOpenBodyHex */]: null,
  ["extension.js-debug.network.replayXHR" /* NetworkReplayXHR */]: null,
  ["extension.js-debug.network.clear" /* NetworkClear */]: null,
  ["extension.js-debug.completion.nodeTool" /* CompletionNodeTool */]: null
};
var allCommands = new Set(Object.keys(commandsObj));
var allDebugTypes = new Set(Object.keys(debugTypes));
var networkFilesystemScheme = "jsDebugNetworkFs";

// src/common/knownTools.ts
var knownTools = /* @__PURE__ */ new Set([
  // #region test runners
  "mocha",
  "jest",
  "jest-cli",
  "ava",
  "tape",
  "tap",
  // #endregion,
  // #region transpilers
  "ts-node",
  "babel-node"
  // #endregion,
]);
var knownToolToken = "$KNOWN_TOOLS$";
var knownToolGlob = `{${[...knownTools].join(",")}}`;

// src/common/node15Internal.ts
var nodeInternalsToken = "<node_internals>";

// src/common/objUtils.ts
function mapValues(obj, generator) {
  const next = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    next[key] = generator(value, key);
  }
  return next;
}
function sortKeys(obj, sortFn) {
  if (!obj || typeof obj !== "object" || obj instanceof Array) {
    return obj;
  }
  const next = {};
  for (const key of Object.keys(obj).sort(sortFn)) {
    next[key] = obj[key];
  }
  return next;
}
function walkObject(obj, visitor) {
  obj = visitor(obj);
  if (obj) {
    if (obj instanceof Array) {
      obj = obj.map((v) => walkObject(v, visitor));
    } else if (typeof obj === "object" && obj) {
      for (const key of Object.keys(obj)) {
        obj[key] = walkObject(obj[key], visitor);
      }
    }
  }
  return obj;
}
var unset = Symbol("unset");
var maxInt32 = 2 ** 31 - 1;

// src/configuration.ts
var AnyLaunchConfiguration = Symbol("AnyLaunchConfiguration");
var baseDefaults = {
  type: "",
  name: "",
  request: "",
  trace: false,
  outputCapture: "console" /* Console */,
  timeout: 1e4,
  timeouts: {},
  showAsyncStacks: true,
  skipFiles: [],
  smartStep: true,
  sourceMaps: true,
  sourceMapRenames: true,
  pauseForSourceMap: true,
  resolveSourceMapLocations: null,
  rootPath: "${workspaceFolder}",
  outFiles: ["${workspaceFolder}/**/*.(m|c|)js", "!**/node_modules/**"],
  sourceMapPathOverrides: defaultSourceMapPathOverrides("${workspaceFolder}"),
  enableContentValidation: true,
  cascadeTerminateToConfigurations: [],
  enableDWARF: true,
  // Should always be determined upstream;
  __workspaceFolder: "",
  __remoteFilePrefix: void 0,
  __breakOnConditionalError: false,
  customDescriptionGenerator: void 0,
  customPropertiesGenerator: void 0
};
var nodeBaseDefaults = {
  ...baseDefaults,
  cwd: "${workspaceFolder}",
  env: {},
  envFile: null,
  pauseForSourceMap: false,
  sourceMaps: true,
  localRoot: null,
  remoteRoot: null,
  resolveSourceMapLocations: ["**", "!**/node_modules/**"],
  autoAttachChildProcesses: true,
  runtimeSourcemapPausePatterns: [],
  skipFiles: [`${nodeInternalsToken}/**`]
};
var terminalBaseDefaults = {
  ...nodeBaseDefaults,
  showAsyncStacks: { onceBreakpointResolved: 16 },
  type: "node-terminal" /* Terminal */,
  request: "launch",
  name: "JavaScript Debug Terminal"
};
var delegateDefaults = {
  ...nodeBaseDefaults,
  type: "node-terminal" /* Terminal */,
  request: "attach",
  name: terminalBaseDefaults.name,
  showAsyncStacks: { onceBreakpointResolved: 16 },
  delegateId: -1
};
var extensionHostConfigDefaults = {
  ...nodeBaseDefaults,
  type: "pwa-extensionHost" /* ExtensionHost */,
  name: "Debug Extension",
  request: "launch",
  args: ["--extensionDevelopmentPath=${workspaceFolder}"],
  outFiles: ["${workspaceFolder}/out/**/*.js"],
  resolveSourceMapLocations: ["${workspaceFolder}/**", "!**/node_modules/**"],
  rendererDebugOptions: {},
  runtimeExecutable: "${execPath}",
  autoAttachChildProcesses: false,
  debugWebviews: false,
  debugWebWorkerHost: false,
  __sessionId: ""
};
var nodeLaunchConfigDefaults = {
  ...nodeBaseDefaults,
  type: "pwa-node" /* Node */,
  request: "launch",
  program: "",
  cwd: "${workspaceFolder}",
  stopOnEntry: false,
  console: "internalConsole",
  restart: false,
  args: [],
  runtimeExecutable: "node",
  runtimeVersion: "default",
  runtimeArgs: [],
  profileStartup: false,
  attachSimplePort: null,
  experimentalNetworking: "auto",
  killBehavior: "forceful" /* Forceful */
};
var chromeAttachConfigDefaults = {
  ...baseDefaults,
  type: "pwa-chrome" /* Chrome */,
  request: "attach",
  address: "localhost",
  port: 0,
  disableNetworkCache: true,
  pathMapping: {},
  url: null,
  restart: false,
  urlFilter: "",
  sourceMapPathOverrides: defaultSourceMapPathOverrides("${webRoot}"),
  webRoot: "${workspaceFolder}",
  server: null,
  browserAttachLocation: "workspace",
  targetSelection: "automatic",
  vueComponentPaths: ["${workspaceFolder}/**/*.vue", "!**/node_modules/**"],
  perScriptSourcemaps: "auto"
};
var edgeAttachConfigDefaults = {
  ...chromeAttachConfigDefaults,
  type: "pwa-msedge" /* Edge */,
  useWebView: false
};
var chromeLaunchConfigDefaults = {
  ...chromeAttachConfigDefaults,
  type: "pwa-chrome" /* Chrome */,
  request: "launch",
  cwd: null,
  file: null,
  env: {},
  urlFilter: "*",
  includeDefaultArgs: true,
  includeLaunchArgs: true,
  runtimeArgs: null,
  runtimeExecutable: "*",
  userDataDir: true,
  browserLaunchLocation: "workspace",
  profileStartup: false,
  cleanUp: "wholeBrowser"
};
var edgeLaunchConfigDefaults = {
  ...chromeLaunchConfigDefaults,
  type: "pwa-msedge" /* Edge */,
  useWebView: false
};
var nodeAttachConfigDefaults = {
  ...nodeBaseDefaults,
  type: "pwa-node" /* Node */,
  attachExistingChildren: true,
  address: "localhost",
  port: 9229,
  restart: false,
  request: "attach",
  continueOnAttach: false
};
function defaultSourceMapPathOverrides(webRoot) {
  return {
    "webpack:///./~/*": `${webRoot}/node_modules/*`,
    "webpack:////*": "/*",
    "webpack://@?:*/?:*/*": `${webRoot}/*`,
    "webpack://?:*/*": `${webRoot}/*`,
    "webpack:///([a-z]):/(.+)": "$1:/$2",
    "meteor://\u{1F4BB}app/*": `${webRoot}/*`,
    "turbopack://[project]/*": "${workspaceFolder}/*"
  };
}
var breakpointLanguages = [
  "javascript",
  "typescript",
  "typescriptreact",
  "javascriptreact",
  "fsharp",
  "html",
  "wat",
  // Common wasm languages:
  "c",
  "cpp",
  "rust",
  "zig"
];
var packageName = true ? "js-debug" : "js-debug";
var packagePublisher = true ? "ms-vscode" : "vscode-samples";
var isNightly = packageName.includes("nightly");
var extensionId = `${packagePublisher}.${packageName}`;

// src/build/generate-contributions.ts
var appInsightsKey = "0c6ae279ed8443289764825290e4f9e2-1a736e7c-1324-4338-be46-fc2a58ae4d14-7255";
var forSomeContextKeys = (types, contextKey, andExpr) => [...types].map((d) => `${contextKey} == ${d}` + (andExpr ? ` && ${andExpr}` : "")).join(" || ");
var forAnyDebugType = (contextKey, andExpr) => forSomeContextKeys(allDebugTypes, contextKey, andExpr);
var forBrowserDebugType = (contextKey, andExpr) => forSomeContextKeys(["pwa-chrome" /* Chrome */, "pwa-msedge" /* Edge */], contextKey, andExpr);
var forNodeDebugType = (contextKey, andExpr) => forSomeContextKeys(["pwa-node" /* Node */, "pwa-extensionHost" /* ExtensionHost */, "node"], contextKey, andExpr);
var refString = (str) => `%${str}%`;
var commonLanguages = ["javascript", "typescript", "javascriptreact", "typescriptreact"];
var browserLanguages = [...commonLanguages, "html", "css", "coffeescript", "handlebars", "vue"];
var baseConfigurationAttributes = {
  resolveSourceMapLocations: {
    type: ["array", "null"],
    description: refString("node.resolveSourceMapLocations.description"),
    default: null,
    items: {
      type: "string"
    }
  },
  outFiles: {
    type: ["array"],
    description: refString("outFiles.description"),
    default: [...baseDefaults.outFiles],
    items: {
      type: "string"
    },
    tags: ["setup" /* Setup */]
  },
  pauseForSourceMap: {
    type: "boolean",
    markdownDescription: refString("node.pauseForSourceMap.description"),
    default: false
  },
  showAsyncStacks: {
    description: refString("node.showAsyncStacks.description"),
    default: true,
    oneOf: [
      {
        type: "boolean"
      },
      {
        type: "object",
        required: ["onAttach"],
        properties: {
          onAttach: {
            type: "number",
            default: 32
          }
        }
      },
      {
        type: "object",
        required: ["onceBreakpointResolved"],
        properties: {
          onceBreakpointResolved: {
            type: "number",
            default: 32
          }
        }
      }
    ]
  },
  skipFiles: {
    type: "array",
    description: refString("browser.skipFiles.description"),
    default: ["${/**"]
  },
  smartStep: {
    type: "boolean",
    description: refString("smartStep.description"),
    default: true
  },
  sourceMaps: {
    type: "boolean",
    description: refString("browser.sourceMaps.description"),
    default: true
  },
  sourceMapRenames: {
    type: "boolean",
    default: true,
    description: refString("browser.sourceMapRenames.description")
  },
  sourceMapPathOverrides: {
    type: "object",
    description: refString("node.sourceMapPathOverrides.description"),
    default: {
      "webpack://?:*/*": "${workspaceFolder}/*",
      "webpack:///./~/*": "${workspaceFolder}/node_modules/*",
      "meteor://\u{1F4BB}app/*": "${workspaceFolder}/*"
    }
  },
  timeout: {
    type: "number",
    description: refString("node.timeout.description"),
    default: 1e4
  },
  timeouts: {
    type: "object",
    description: refString("timeouts.generalDescription"),
    default: {},
    properties: {
      sourceMapMinPause: {
        type: "number",
        description: refString("timeouts.sourceMaps.sourceMapMinPause.description"),
        default: 1e3
      },
      sourceMapCumulativePause: {
        type: "number",
        description: refString("timeouts.sourceMaps.sourceMapCumulativePause.description"),
        default: 1e3
      },
      hoverEvaluation: {
        type: "number",
        description: refString("timeouts.hoverEvaluation.description"),
        default: 500
      }
    },
    additionalProperties: false,
    markdownDescription: refString("timeouts.generalDescription.markdown")
  },
  trace: {
    description: refString("trace.description"),
    default: true,
    oneOf: [
      {
        type: "boolean",
        description: refString("trace.boolean.description")
      },
      {
        type: "object",
        additionalProperties: false,
        properties: {
          stdio: {
            type: "boolean",
            description: refString("trace.stdio.description")
          },
          logFile: {
            type: ["string", "null"],
            description: refString("trace.logFile.description")
          }
        }
      }
    ]
  },
  outputCapture: {
    enum: ["console" /* Console */, "std" /* Stdio */],
    markdownDescription: refString("node.launch.outputCapture.description"),
    default: "console" /* Console */
  },
  enableContentValidation: {
    default: true,
    type: "boolean",
    description: refString("enableContentValidation.description")
  },
  customDescriptionGenerator: {
    type: "string",
    default: void 0,
    description: refString("customDescriptionGenerator.description")
  },
  customPropertiesGenerator: {
    type: "string",
    default: void 0,
    deprecated: true,
    description: refString("customPropertiesGenerator.description")
  },
  cascadeTerminateToConfigurations: {
    type: "array",
    items: {
      type: "string",
      uniqueItems: true
    },
    default: [],
    description: refString("base.cascadeTerminateToConfigurations.label")
  },
  enableDWARF: {
    type: "boolean",
    default: true,
    markdownDescription: refString("base.enableDWARF.label")
  }
};
var nodeBaseConfigurationAttributes = {
  ...baseConfigurationAttributes,
  resolveSourceMapLocations: {
    ...baseConfigurationAttributes.resolveSourceMapLocations,
    default: ["${workspaceFolder}/**", "!**/node_modules/**"]
  },
  cwd: {
    type: "string",
    description: refString("node.launch.cwd.description"),
    default: "${workspaceFolder}",
    docDefault: "localRoot || ${workspaceFolder}",
    tags: ["setup" /* Setup */]
  },
  localRoot: {
    type: ["string", "null"],
    description: refString("node.localRoot.description"),
    default: null
  },
  remoteRoot: {
    type: ["string", "null"],
    description: refString("node.remoteRoot.description"),
    default: null
  },
  autoAttachChildProcesses: {
    type: "boolean",
    description: refString("node.launch.autoAttachChildProcesses.description"),
    default: true
  },
  env: {
    type: "object",
    additionalProperties: {
      type: ["string", "null"]
    },
    markdownDescription: refString("node.launch.env.description"),
    default: {},
    tags: ["setup" /* Setup */]
  },
  envFile: {
    type: "string",
    description: refString("node.launch.envFile.description"),
    default: "${workspaceFolder}/.env"
  },
  runtimeSourcemapPausePatterns: {
    type: "array",
    items: {
      type: "string"
    },
    markdownDescription: refString("node.launch.runtimeSourcemapPausePatterns"),
    default: []
  },
  nodeVersionHint: {
    type: "number",
    minimum: 8,
    description: refString("node.versionHint.description"),
    default: 12
  }
};
var intOrEvaluated = [
  {
    type: "integer"
  },
  {
    type: "string",
    pattern: "^\\${.*}$"
  }
];
var nodeAttachConfig = {
  type: "pwa-node" /* Node */,
  request: "attach",
  label: refString("node.label"),
  languages: commonLanguages,
  variables: {
    PickProcess: "extension.js-debug.pickNodeProcess" /* PickProcess */
  },
  configurationSnippets: [
    {
      label: refString("node.snippet.attach.label"),
      description: refString("node.snippet.attach.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "attach",
        name: "${1:Attach}",
        port: 9229,
        skipFiles: [`${nodeInternalsToken}/**`]
      }
    },
    {
      label: refString("node.snippet.remoteattach.label"),
      description: refString("node.snippet.remoteattach.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "attach",
        name: "${1:Attach to Remote}",
        address: "${2:TCP/IP address of process to be debugged}",
        port: 9229,
        localRoot: '^"\\${workspaceFolder}"',
        remoteRoot: "${3:Absolute path to the remote directory containing the program}",
        skipFiles: [`${nodeInternalsToken}/**`]
      }
    },
    {
      label: refString("node.snippet.attachProcess.label"),
      description: refString("node.snippet.attachProcess.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "attach",
        name: "${1:Attach by Process ID}",
        processId: '^"\\${command:PickProcess}"',
        skipFiles: [`${nodeInternalsToken}/**`]
      }
    }
  ],
  configurationAttributes: {
    ...nodeBaseConfigurationAttributes,
    address: {
      type: "string",
      description: refString("node.address.description"),
      default: "localhost"
    },
    port: {
      description: refString("node.port.description"),
      default: 9229,
      oneOf: intOrEvaluated,
      tags: ["setup" /* Setup */]
    },
    websocketAddress: {
      type: "string",
      description: refString("node.websocket.address.description"),
      default: void 0
    },
    remoteHostHeader: {
      type: "string",
      description: refString("node.remote.host.header.description"),
      default: void 0
    },
    restart: {
      description: refString("node.attach.restart.description"),
      default: true,
      oneOf: [
        {
          type: "boolean"
        },
        {
          type: "object",
          properties: {
            delay: { type: "number", minimum: 0, default: 1e3 },
            maxAttempts: { type: "number", minimum: 0, default: 10 }
          }
        }
      ]
    },
    processId: {
      type: "string",
      description: refString("node.attach.processId.description"),
      default: "${command:PickProcess}"
    },
    attachExistingChildren: {
      type: "boolean",
      description: refString("node.attach.attachExistingChildren.description"),
      default: false
    },
    continueOnAttach: {
      type: "boolean",
      markdownDescription: refString("node.attach.continueOnAttach"),
      default: true
    }
  },
  defaults: nodeAttachConfigDefaults
};
var nodeLaunchConfig = {
  type: "pwa-node" /* Node */,
  request: "launch",
  label: refString("node.label"),
  languages: commonLanguages,
  variables: {
    PickProcess: "extension.js-debug.pickNodeProcess" /* PickProcess */
  },
  configurationSnippets: [
    {
      label: refString("node.snippet.launch.label"),
      description: refString("node.snippet.launch.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "launch",
        name: "${2:Launch Program}",
        program: '^"\\${workspaceFolder}/${1:app.js}"',
        skipFiles: [`${nodeInternalsToken}/**`]
      }
    },
    {
      label: refString("node.snippet.npm.label"),
      markdownDescription: refString("node.snippet.npm.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "launch",
        name: "${1:Launch via NPM}",
        runtimeExecutable: "npm",
        runtimeArgs: ["run-script", "debug"],
        skipFiles: [`${nodeInternalsToken}/**`]
      }
    },
    {
      label: refString("node.snippet.nodemon.label"),
      description: refString("node.snippet.nodemon.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "launch",
        name: "nodemon",
        runtimeExecutable: "nodemon",
        program: '^"\\${workspaceFolder}/${1:app.js}"',
        restart: true,
        console: "integratedTerminal",
        internalConsoleOptions: "neverOpen",
        skipFiles: [`${nodeInternalsToken}/**`]
      }
    },
    {
      label: refString("node.snippet.mocha.label"),
      description: refString("node.snippet.mocha.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "launch",
        name: "Mocha Tests",
        program: '^"mocha"',
        args: [
          "-u",
          "tdd",
          "--timeout",
          "999999",
          "--colors",
          '^"\\${workspaceFolder}/${1:test}"'
        ],
        internalConsoleOptions: "openOnSessionStart",
        skipFiles: [`${nodeInternalsToken}/**`]
      }
    },
    {
      label: refString("node.snippet.yo.label"),
      markdownDescription: refString("node.snippet.yo.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "launch",
        name: "Yeoman ${1:generator}",
        program: '^"\\${workspaceFolder}/node_modules/yo/lib/cli.js"',
        args: ["${1:generator}"],
        console: "integratedTerminal",
        internalConsoleOptions: "neverOpen",
        skipFiles: [`${nodeInternalsToken}/**`]
      }
    },
    {
      label: refString("node.snippet.gulp.label"),
      description: refString("node.snippet.gulp.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "launch",
        name: "Gulp ${1:task}",
        program: '^"\\${workspaceFolder}/node_modules/gulp/bin/gulp.js"',
        args: ["${1:task}"],
        skipFiles: [`${nodeInternalsToken}/**`]
      }
    },
    {
      label: refString("node.snippet.electron.label"),
      description: refString("node.snippet.electron.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "launch",
        name: "Electron Main",
        runtimeExecutable: '^"electron"',
        program: '^"\\${workspaceFolder}/main.js"',
        skipFiles: [`${nodeInternalsToken}/**`]
      }
    }
  ],
  configurationAttributes: {
    ...nodeBaseConfigurationAttributes,
    cwd: {
      type: "string",
      description: refString("node.launch.cwd.description"),
      default: "${workspaceFolder}",
      tags: ["setup" /* Setup */]
    },
    program: {
      type: "string",
      description: refString("node.launch.program.description"),
      default: "",
      tags: ["setup" /* Setup */]
    },
    stopOnEntry: {
      type: ["boolean", "string"],
      description: refString("node.stopOnEntry.description"),
      default: true
    },
    console: {
      type: "string",
      enum: ["internalConsole", "integratedTerminal", "externalTerminal"],
      enumDescriptions: [
        refString("node.launch.console.internalConsole.description"),
        refString("node.launch.console.integratedTerminal.description"),
        refString("node.launch.console.externalTerminal.description")
      ],
      description: refString("node.launch.console.description"),
      default: "internalConsole"
    },
    args: {
      type: ["array", "string"],
      description: refString("node.launch.args.description"),
      items: {
        type: "string"
      },
      default: [],
      tags: ["setup" /* Setup */]
    },
    restart: {
      description: refString("node.launch.restart.description"),
      ...nodeAttachConfig.configurationAttributes.restart
    },
    runtimeExecutable: {
      type: ["string", "null"],
      markdownDescription: refString("node.launch.runtimeExecutable.description"),
      default: "node"
    },
    runtimeVersion: {
      type: "string",
      markdownDescription: refString("node.launch.runtimeVersion.description"),
      default: "default"
    },
    runtimeArgs: {
      type: "array",
      description: refString("node.launch.runtimeArgs.description"),
      items: {
        type: "string"
      },
      default: [],
      tags: ["setup" /* Setup */]
    },
    profileStartup: {
      type: "boolean",
      description: refString("node.profileStartup.description"),
      default: true
    },
    attachSimplePort: {
      oneOf: intOrEvaluated,
      description: refString("node.attachSimplePort.description"),
      default: 9229
    },
    killBehavior: {
      type: "string",
      enum: ["forceful" /* Forceful */, "polite" /* Polite */, "none" /* None */],
      default: "forceful" /* Forceful */,
      markdownDescription: refString("node.killBehavior.description")
    },
    experimentalNetworking: {
      type: "string",
      default: "auto",
      description: refString("node.experimentalNetworking.description"),
      enum: ["auto", "on", "off"]
    }
  },
  defaults: nodeLaunchConfigDefaults
};
var nodeTerminalConfiguration = {
  type: "node-terminal" /* Terminal */,
  request: "launch",
  label: refString("debug.terminal.label"),
  languages: [],
  configurationSnippets: [
    {
      label: refString("debug.terminal.snippet.label"),
      description: refString("debug.terminal.snippet.label"),
      body: {
        type: "node-terminal" /* Terminal */,
        request: "launch",
        name: "Run npm start",
        command: "npm start"
      }
    }
  ],
  configurationAttributes: {
    ...nodeBaseConfigurationAttributes,
    command: {
      type: ["string", "null"],
      description: refString("debug.terminal.program.description"),
      default: "npm start",
      tags: ["setup" /* Setup */]
    }
  },
  defaults: terminalBaseDefaults
};
var chromiumBaseConfigurationAttributes = {
  ...baseConfigurationAttributes,
  disableNetworkCache: {
    type: "boolean",
    description: refString("browser.disableNetworkCache.description"),
    default: true
  },
  pathMapping: {
    type: "object",
    description: refString("browser.pathMapping.description"),
    default: {}
  },
  webRoot: {
    type: "string",
    description: refString("browser.webRoot.description"),
    default: "${workspaceFolder}",
    tags: ["setup" /* Setup */]
  },
  urlFilter: {
    type: "string",
    description: refString("browser.urlFilter.description"),
    default: ""
  },
  url: {
    type: "string",
    description: refString("browser.url.description"),
    default: "http://localhost:8080",
    tags: ["setup" /* Setup */]
  },
  inspectUri: {
    type: ["string", "null"],
    description: refString("browser.inspectUri.description"),
    default: null
  },
  vueComponentPaths: {
    type: "array",
    description: refString("browser.vueComponentPaths"),
    default: ["${workspaceFolder}/**/*.vue"]
  },
  server: {
    oneOf: [
      {
        type: "object",
        description: refString("browser.server.description"),
        additionalProperties: false,
        default: { program: "node my-server.js" },
        properties: nodeLaunchConfig.configurationAttributes
      },
      {
        type: "object",
        description: refString("debug.terminal.label"),
        additionalProperties: false,
        default: { program: "npm start" },
        properties: nodeTerminalConfiguration.configurationAttributes
      }
    ]
    // eslint-disable-next-line
  },
  perScriptSourcemaps: {
    type: "string",
    default: "auto",
    enum: ["yes", "no", "auto"],
    description: refString("browser.perScriptSourcemaps.description")
  }
};
var chromiumAttachConfigurationAttributes = {
  ...chromiumBaseConfigurationAttributes,
  address: {
    type: "string",
    description: refString("browser.address.description"),
    default: "localhost"
  },
  port: {
    oneOf: intOrEvaluated,
    description: refString("browser.attach.port.description"),
    default: 9229,
    tags: ["setup" /* Setup */]
  },
  restart: {
    type: "boolean",
    markdownDescription: refString("browser.restart"),
    default: false
  },
  targetSelection: {
    type: "string",
    markdownDescription: refString("browser.targetSelection"),
    enum: ["pick", "automatic"],
    default: "automatic"
  },
  browserAttachLocation: {
    description: refString("browser.browserAttachLocation.description"),
    default: null,
    oneOf: [
      {
        type: "null"
      },
      {
        type: "string",
        enum: ["ui", "workspace"]
      }
    ]
  }
};
var chromeLaunchConfig = {
  type: "pwa-chrome" /* Chrome */,
  request: "launch",
  label: refString("chrome.label"),
  languages: browserLanguages,
  configurationSnippets: [
    {
      label: refString("chrome.launch.label"),
      description: refString("chrome.launch.description"),
      body: {
        type: "pwa-chrome" /* Chrome */,
        request: "launch",
        name: "Launch Chrome",
        url: "http://localhost:8080",
        webRoot: '^"${2:\\${workspaceFolder\\}}"'
      }
    }
  ],
  configurationAttributes: {
    ...chromiumBaseConfigurationAttributes,
    port: {
      type: "number",
      description: refString("browser.launch.port.description"),
      default: 0
    },
    file: {
      type: "string",
      description: refString("browser.file.description"),
      default: "${workspaceFolder}/index.html",
      tags: ["setup" /* Setup */]
    },
    userDataDir: {
      type: ["string", "boolean"],
      description: refString("browser.userDataDir.description"),
      default: true
    },
    includeDefaultArgs: {
      type: "boolean",
      description: refString("browser.includeDefaultArgs.description"),
      default: true
    },
    includeLaunchArgs: {
      type: "boolean",
      description: refString("browser.includeLaunchArgs.description"),
      default: true
    },
    runtimeExecutable: {
      type: ["string", "null"],
      description: refString("browser.runtimeExecutable.description"),
      default: "stable"
    },
    runtimeArgs: {
      type: "array",
      description: refString("browser.runtimeArgs.description"),
      items: {
        type: "string"
      },
      default: []
    },
    env: {
      type: "object",
      description: refString("browser.env.description"),
      default: {}
    },
    cwd: {
      type: "string",
      description: refString("browser.cwd.description"),
      default: null
    },
    profileStartup: {
      type: "boolean",
      description: refString("browser.profileStartup.description"),
      default: true
    },
    cleanUp: {
      type: "string",
      enum: ["wholeBrowser", "onlyTab"],
      description: refString("browser.cleanUp.description"),
      default: "wholeBrowser"
    },
    browserLaunchLocation: {
      description: refString("browser.browserLaunchLocation.description"),
      default: null,
      oneOf: [
        {
          type: "null"
        },
        {
          type: "string",
          enum: ["ui", "workspace"]
        }
      ]
    }
  },
  defaults: chromeLaunchConfigDefaults
};
var chromeAttachConfig = {
  type: "pwa-chrome" /* Chrome */,
  request: "attach",
  label: refString("chrome.label"),
  languages: browserLanguages,
  configurationSnippets: [
    {
      label: refString("chrome.attach.label"),
      description: refString("chrome.attach.description"),
      body: {
        type: "pwa-chrome" /* Chrome */,
        request: "attach",
        name: "Attach to Chrome",
        port: 9222,
        webRoot: '^"${2:\\${workspaceFolder\\}}"'
      }
    }
  ],
  configurationAttributes: chromiumAttachConfigurationAttributes,
  defaults: chromeAttachConfigDefaults
};
var extensionHostConfig = {
  type: "pwa-extensionHost" /* ExtensionHost */,
  request: "launch",
  label: refString("extensionHost.label"),
  languages: commonLanguages,
  required: [],
  configurationSnippets: [
    {
      label: refString("extensionHost.snippet.launch.label"),
      description: refString("extensionHost.snippet.launch.description"),
      body: {
        type: "pwa-extensionHost" /* ExtensionHost */,
        request: "launch",
        name: refString("extensionHost.launch.config.name"),
        args: ['^"--extensionDevelopmentPath=\\${workspaceFolder}"'],
        outFiles: ['^"\\${workspaceFolder}/out/**/*.js"'],
        preLaunchTask: "npm"
      }
    }
  ],
  configurationAttributes: {
    ...nodeBaseConfigurationAttributes,
    args: {
      type: "array",
      description: refString("node.launch.args.description"),
      items: {
        type: "string"
      },
      default: ["--extensionDevelopmentPath=${workspaceFolder}"],
      tags: ["setup" /* Setup */]
    },
    runtimeExecutable: {
      type: ["string", "null"],
      markdownDescription: refString("extensionHost.launch.runtimeExecutable.description"),
      default: "node"
    },
    debugWebviews: {
      markdownDescription: refString("extensionHost.launch.debugWebviews"),
      default: true,
      type: ["boolean"]
    },
    debugWebWorkerHost: {
      markdownDescription: refString("extensionHost.launch.debugWebWorkerHost"),
      default: true,
      type: ["boolean"]
    },
    rendererDebugOptions: {
      markdownDescription: refString("extensionHost.launch.rendererDebugOptions"),
      type: "object",
      default: {
        webRoot: "${workspaceFolder}"
      },
      properties: chromiumAttachConfigurationAttributes
    },
    testConfiguration: {
      markdownDescription: refString("extensionHost.launch.testConfiguration"),
      type: "string",
      default: "${workspaceFolder}/.vscode-test.js"
    },
    testConfigurationLabel: {
      markdownDescription: refString("extensionHost.launch.testConfigurationLabel"),
      type: "string",
      default: ""
    }
  },
  defaults: extensionHostConfigDefaults
};
var edgeLaunchConfig = {
  type: "pwa-msedge" /* Edge */,
  request: "launch",
  label: refString("edge.label"),
  languages: browserLanguages,
  configurationSnippets: [
    {
      label: refString("edge.launch.label"),
      description: refString("edge.launch.description"),
      body: {
        type: "pwa-msedge" /* Edge */,
        request: "launch",
        name: "Launch Edge",
        url: "http://localhost:8080",
        webRoot: '^"${2:\\${workspaceFolder\\}}"'
      }
    }
  ],
  configurationAttributes: {
    ...chromeLaunchConfig.configurationAttributes,
    runtimeExecutable: {
      type: ["string", "null"],
      description: refString("browser.runtimeExecutable.edge.description"),
      default: "stable"
    },
    useWebView: {
      type: "boolean",
      description: refString("edge.useWebView.launch.description"),
      default: false
    },
    address: {
      type: "string",
      description: refString("edge.address.description"),
      default: "localhost"
    },
    port: {
      type: "number",
      description: refString("edge.port.description"),
      default: 9229
    }
  },
  defaults: edgeLaunchConfigDefaults
};
var edgeAttachConfig = {
  type: "pwa-msedge" /* Edge */,
  request: "attach",
  label: refString("edge.label"),
  languages: browserLanguages,
  configurationSnippets: [
    {
      label: refString("edge.attach.label"),
      description: refString("edge.attach.description"),
      body: {
        type: "pwa-msedge" /* Edge */,
        request: "attach",
        name: "Attach to Edge",
        port: 9222,
        webRoot: '^"${2:\\${workspaceFolder\\}}"'
      }
    }
  ],
  configurationAttributes: {
    ...chromiumAttachConfigurationAttributes,
    useWebView: {
      type: "object",
      properties: { pipeName: { type: "string" } },
      description: refString("edge.useWebView.attach.description"),
      default: { pipeName: "MyPipeName" }
    }
  },
  defaults: edgeAttachConfigDefaults
};
var debuggers = [
  nodeAttachConfig,
  nodeLaunchConfig,
  nodeTerminalConfiguration,
  extensionHostConfig,
  chromeLaunchConfig,
  chromeAttachConfig,
  edgeLaunchConfig,
  edgeAttachConfig
];
function buildDebuggers() {
  const output = [];
  const ensureEntryForType = (type, d) => {
    let entry = output.find((o) => o.type === type);
    if (entry) {
      return entry;
    }
    const { request, configurationAttributes, required, defaults, ...rest } = d;
    entry = {
      ...rest,
      type,
      aiKey: appInsightsKey,
      configurationAttributes: {},
      configurationSnippets: [],
      strings: { unverifiedBreakpoints: refString("debug.unverifiedBreakpoints") }
    };
    output.push(entry);
    return entry;
  };
  for (const d of debuggers) {
    const preferred = preferredDebugTypes.get(d.type);
    const primary = ensureEntryForType(d.type, d);
    const entries = [primary];
    if (preferred) {
      const entry = ensureEntryForType(preferred, d);
      delete entry.languages;
      entries.unshift(entry);
      primary.deprecated = `Please use type ${preferred} instead`;
    }
    entries[0].configurationSnippets.push(...d.configurationSnippets);
    if (preferred) {
      for (const snippet of entries[0].configurationSnippets) {
        snippet.body.type = preferred;
      }
    }
    for (const entry of entries) {
      entry.configurationAttributes[d.request] = {
        required: d.required,
        properties: mapValues(
          d.configurationAttributes,
          ({ docDefault: _, ...attrs }) => attrs
        )
      };
    }
  }
  return walkObject(output, sortKeys);
}
var configurationSchema = {
  ["debug.javascript.codelens.npmScripts" /* NpmScriptLens */]: {
    enum: ["top", "all", "never"],
    default: "top",
    description: refString("configuration.npmScriptLensLocation")
  },
  ["debug.javascript.terminalOptions" /* TerminalDebugConfig */]: {
    type: "object",
    description: refString("configuration.terminalOptions"),
    default: {},
    properties: nodeTerminalConfiguration.configurationAttributes
  },
  ["debug.javascript.automaticallyTunnelRemoteServer" /* AutoServerTunnelOpen */]: {
    type: "boolean",
    description: refString("configuration.automaticallyTunnelRemoteServer"),
    default: true
  },
  ["debug.javascript.debugByLinkOptions" /* DebugByLinkOptions */]: {
    default: "on",
    description: refString("configuration.debugByLinkOptions"),
    oneOf: [
      {
        type: "string",
        enum: ["on", "off", "always"]
      },
      {
        type: "object",
        properties: {
          ...chromeLaunchConfig.configurationAttributes,
          enabled: {
            type: "string",
            enum: ["on", "off", "always"]
          }
        }
      }
    ]
  },
  ["debug.javascript.pickAndAttachOptions" /* PickAndAttachDebugOptions */]: {
    type: "object",
    default: {},
    markdownDescription: refString("configuration.pickAndAttachOptions"),
    properties: nodeAttachConfig.configurationAttributes
  },
  ["debug.javascript.autoAttachFilter" /* AutoAttachMode */]: {
    type: "string",
    default: "disabled" /* Disabled */,
    enum: [
      "always" /* Always */,
      "smart" /* Smart */,
      "onlyWithFlag" /* OnlyWithFlag */,
      "disabled" /* Disabled */
    ],
    enumDescriptions: [
      refString("configuration.autoAttachMode.always"),
      refString("configuration.autoAttachMode.smart"),
      refString("configuration.autoAttachMode.explicit"),
      refString("configuration.autoAttachMode.disabled")
    ],
    markdownDescription: refString("configuration.autoAttachMode")
  },
  ["debug.javascript.autoAttachSmartPattern" /* AutoAttachSmartPatterns */]: {
    type: "array",
    items: {
      type: "string"
    },
    default: ["${workspaceFolder}/**", "!**/node_modules/**", `**/${knownToolToken}/**`],
    markdownDescription: refString("configuration.autoAttachSmartPatterns")
  },
  ["debug.javascript.breakOnConditionalError" /* BreakOnConditionalError */]: {
    type: "boolean",
    default: false,
    markdownDescription: refString("configuration.breakOnConditionalError")
  },
  ["debug.javascript.unmapMissingSources" /* UnmapMissingSources */]: {
    type: "boolean",
    default: false,
    description: refString("configuration.unmapMissingSources")
  },
  ["debug.javascript.defaultRuntimeExecutable" /* DefaultRuntimeExecutables */]: {
    type: "object",
    default: {
      ["pwa-node" /* Node */]: "node"
    },
    markdownDescription: refString("configuration.defaultRuntimeExecutables"),
    properties: ["pwa-node" /* Node */, "pwa-chrome" /* Chrome */, "pwa-msedge" /* Edge */].reduce(
      (obj, type) => ({ ...obj, [type]: { type: "string" } }),
      {}
    )
  },
  ["debug.javascript.resourceRequestOptions" /* ResourceRequestOptions */]: {
    type: "object",
    default: {},
    markdownDescription: refString("configuration.resourceRequestOptions")
  },
  ["debug.javascript.enableNetworkView" /* EnableNetworkView */]: {
    type: "boolean",
    default: false,
    description: refString("configuration.enableNetworkView")
  }
};
var commands = [
  {
    command: "extension.js-debug.prettyPrint" /* PrettyPrint */,
    title: refString("pretty.print.script"),
    category: "Debug",
    icon: "$(json)"
  },
  {
    command: "extension.js-debug.toggleSkippingFile" /* ToggleSkipping */,
    title: refString("toggle.skipping.this.file"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.addCustomBreakpoints" /* ToggleCustomBreakpoints */,
    title: refString("add.eventListener.breakpoint"),
    icon: "$(add)"
  },
  {
    command: "extension.js-debug.removeAllCustomBreakpoints" /* RemoveAllCustomBreakpoints */,
    title: refString("remove.eventListener.breakpoint.all"),
    icon: "$(close-all)"
  },
  {
    command: "extension.js-debug.addXHRBreakpoints" /* AddXHRBreakpoints */,
    title: refString("add.xhr.breakpoint"),
    icon: "$(add)"
  },
  {
    command: "extension.js-debug.removeXHRBreakpoint" /* RemoveXHRBreakpoints */,
    title: refString("remove.xhr.breakpoint"),
    icon: "$(remove)"
  },
  {
    command: "extension.js-debug.editXHRBreakpoints" /* EditXHRBreakpoint */,
    title: refString("edit.xhr.breakpoint"),
    icon: "$(edit)"
  },
  {
    command: "extension.pwa-node-debug.attachNodeProcess" /* AttachProcess */,
    title: refString("attach.node.process"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.npmScript" /* DebugNpmScript */,
    title: refString("debug.npm.script"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.createDebuggerTerminal" /* CreateDebuggerTerminal */,
    title: refString("debug.terminal.label"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.startProfile" /* StartProfile */,
    title: refString("profile.start"),
    category: "Debug",
    icon: "$(record)"
  },
  {
    command: "extension.js-debug.stopProfile" /* StopProfile */,
    title: refString("profile.stop"),
    category: "Debug",
    icon: "resources/dark/stop-profiling.svg"
  },
  {
    command: "extension.js-debug.revealPage" /* RevealPage */,
    title: refString("browser.revealPage"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.debugLink" /* DebugLink */,
    title: refString("debugLink.label"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.createDiagnostics" /* CreateDiagnostics */,
    title: refString("createDiagnostics.label"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.getDiagnosticLogs" /* GetDiagnosticLogs */,
    title: refString("getDiagnosticLogs.label"),
    category: "Debug"
  },
  {
    command: "extension.node-debug.startWithStopOnEntry" /* StartWithStopOnEntry */,
    title: refString("startWithStopOnEntry.label"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.openEdgeDevTools" /* OpenEdgeDevTools */,
    title: refString("openEdgeDevTools.label"),
    icon: "$(inspect)",
    category: "Debug"
  },
  {
    command: "extension.js-debug.callers.add" /* CallersAdd */,
    title: refString("commands.callersAdd.label"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.callers.remove" /* CallersRemove */,
    title: refString("commands.callersRemove.label"),
    icon: "$(close)"
  },
  {
    command: "extension.js-debug.callers.removeAll" /* CallersRemoveAll */,
    title: refString("commands.callersRemoveAll.label"),
    icon: "$(clear-all)"
  },
  {
    command: "extension.js-debug.callers.goToCaller" /* CallersGoToCaller */,
    title: refString("commands.callersGoToCaller.label"),
    icon: "$(call-outgoing)"
  },
  {
    command: "extension.js-debug.callers.gotToTarget" /* CallersGoToTarget */,
    title: refString("commands.callersGoToTarget.label"),
    icon: "$(call-incoming)"
  },
  {
    command: "extension.js-debug.enableSourceMapStepping" /* EnableSourceMapStepping */,
    title: refString("commands.enableSourceMapStepping.label"),
    icon: "$(compass-dot)"
  },
  {
    command: "extension.js-debug.disableSourceMapStepping" /* DisableSourceMapStepping */,
    title: refString("commands.disableSourceMapStepping.label"),
    icon: "$(compass)"
  },
  {
    command: "extension.js-debug.network.viewRequest" /* NetworkViewRequest */,
    title: refString("commands.networkViewRequest.label"),
    icon: "$(arrow-right)"
  },
  {
    command: "extension.js-debug.network.clear" /* NetworkClear */,
    title: refString("commands.networkClear.label"),
    icon: "$(clear-all)"
  },
  {
    command: "extension.js-debug.network.openBody" /* NetworkOpenBody */,
    title: refString("commands.networkOpenBody.label")
  },
  {
    command: "extension.js-debug.network.openBodyInHex" /* NetworkOpenBodyHex */,
    title: refString("commands.networkOpenBodyInHexEditor.label")
  },
  {
    command: "extension.js-debug.network.replayXHR" /* NetworkReplayXHR */,
    title: refString("commands.networkReplayXHR.label")
  },
  {
    command: "extension.js-debug.network.copyUri" /* NetworkCopyUri */,
    title: refString("commands.networkCopyURI.label")
  }
];
var menus = {
  commandPalette: [
    {
      command: "extension.js-debug.prettyPrint" /* PrettyPrint */,
      title: refString("pretty.print.script"),
      when: forAnyDebugType("debugType", "debugState == stopped")
    },
    {
      command: "extension.js-debug.startProfile" /* StartProfile */,
      title: refString("profile.start"),
      when: forAnyDebugType("debugType", "inDebugMode && !jsDebugIsProfiling")
    },
    {
      command: "extension.js-debug.stopProfile" /* StopProfile */,
      title: refString("profile.stop"),
      when: forAnyDebugType("debugType", "inDebugMode && jsDebugIsProfiling")
    },
    {
      command: "extension.js-debug.revealPage" /* RevealPage */,
      when: "false"
    },
    {
      command: "extension.js-debug.debugLink" /* DebugLink */,
      title: refString("debugLink.label"),
      when: "!isWeb"
    },
    {
      command: "extension.js-debug.createDiagnostics" /* CreateDiagnostics */,
      title: refString("createDiagnostics.label"),
      when: forAnyDebugType("debugType", "inDebugMode")
    },
    {
      command: "extension.js-debug.getDiagnosticLogs" /* GetDiagnosticLogs */,
      title: refString("getDiagnosticLogs.label"),
      when: forAnyDebugType("debugType", "inDebugMode")
    },
    {
      command: "extension.js-debug.openEdgeDevTools" /* OpenEdgeDevTools */,
      title: refString("openEdgeDevTools.label"),
      when: `debugType == ${"pwa-msedge" /* Edge */}`
    },
    {
      command: "extension.js-debug.callers.add" /* CallersAdd */,
      title: refString("commands.callersAdd.paletteLabel"),
      when: forAnyDebugType("debugType", 'debugState == "stopped"')
    },
    {
      command: "extension.js-debug.callers.goToCaller" /* CallersGoToCaller */,
      when: "false"
    },
    {
      command: "extension.js-debug.callers.gotToTarget" /* CallersGoToTarget */,
      when: "false"
    },
    {
      command: "extension.js-debug.network.copyUri" /* NetworkCopyUri */,
      when: "false"
    },
    {
      command: "extension.js-debug.network.openBody" /* NetworkOpenBody */,
      when: "false"
    },
    {
      command: "extension.js-debug.network.openBodyInHex" /* NetworkOpenBodyHex */,
      when: "false"
    },
    {
      command: "extension.js-debug.network.replayXHR" /* NetworkReplayXHR */,
      when: "false"
    },
    {
      command: "extension.js-debug.network.viewRequest" /* NetworkViewRequest */,
      when: "false"
    },
    {
      command: "extension.js-debug.network.clear" /* NetworkClear */,
      when: "false"
    },
    {
      command: "extension.js-debug.enableSourceMapStepping" /* EnableSourceMapStepping */,
      when: "jsDebugIsMapSteppingDisabled" /* IsMapSteppingDisabled */
    },
    {
      command: "extension.js-debug.disableSourceMapStepping" /* DisableSourceMapStepping */,
      when: `!${"jsDebugIsMapSteppingDisabled" /* IsMapSteppingDisabled */}`
    }
  ],
  "debug/callstack/context": [
    {
      command: "extension.js-debug.revealPage" /* RevealPage */,
      group: "navigation",
      when: forBrowserDebugType("debugType", `callStackItemType == 'session'`)
    },
    {
      command: "extension.js-debug.toggleSkippingFile" /* ToggleSkipping */,
      group: "navigation",
      when: forAnyDebugType("debugType", `callStackItemType == 'session'`)
    },
    {
      command: "extension.js-debug.startProfile" /* StartProfile */,
      group: "navigation",
      when: forAnyDebugType("debugType", `!jsDebugIsProfiling && callStackItemType == 'session'`)
    },
    {
      command: "extension.js-debug.stopProfile" /* StopProfile */,
      group: "navigation",
      when: forAnyDebugType("debugType", `jsDebugIsProfiling && callStackItemType == 'session'`)
    },
    {
      command: "extension.js-debug.startProfile" /* StartProfile */,
      group: "inline",
      when: forAnyDebugType("debugType", "!jsDebugIsProfiling")
    },
    {
      command: "extension.js-debug.stopProfile" /* StopProfile */,
      group: "inline",
      when: forAnyDebugType("debugType", "jsDebugIsProfiling")
    },
    {
      command: "extension.js-debug.callers.add" /* CallersAdd */,
      when: forAnyDebugType("debugType", `callStackItemType == 'stackFrame'`)
    }
  ],
  "debug/toolBar": [
    {
      command: "extension.js-debug.stopProfile" /* StopProfile */,
      when: forAnyDebugType("debugType", "jsDebugIsProfiling")
    },
    {
      command: "extension.js-debug.openEdgeDevTools" /* OpenEdgeDevTools */,
      when: `debugType == ${"pwa-msedge" /* Edge */}`
    },
    {
      command: "extension.js-debug.enableSourceMapStepping" /* EnableSourceMapStepping */,
      when: "jsDebugIsMapSteppingDisabled" /* IsMapSteppingDisabled */
    }
  ],
  "view/title": [
    {
      command: "extension.js-debug.addCustomBreakpoints" /* ToggleCustomBreakpoints */,
      when: `view == ${"jsBrowserBreakpoints" /* EventListenerBreakpoints */}`,
      group: "navigation"
    },
    {
      command: "extension.js-debug.removeAllCustomBreakpoints" /* RemoveAllCustomBreakpoints */,
      when: `view == ${"jsBrowserBreakpoints" /* EventListenerBreakpoints */}`,
      group: "navigation"
    },
    {
      command: "extension.js-debug.callers.removeAll" /* CallersRemoveAll */,
      group: "navigation",
      when: `view == ${"jsExcludedCallers" /* ExcludedCallers */}`
    },
    {
      command: "extension.js-debug.disableSourceMapStepping" /* DisableSourceMapStepping */,
      group: "navigation",
      when: forAnyDebugType(
        "debugType",
        `view == workbench.debug.callStackView && !${"jsDebugIsMapSteppingDisabled" /* IsMapSteppingDisabled */}`
      )
    },
    {
      command: "extension.js-debug.enableSourceMapStepping" /* EnableSourceMapStepping */,
      group: "navigation",
      when: forAnyDebugType(
        "debugType",
        `view == workbench.debug.callStackView && ${"jsDebugIsMapSteppingDisabled" /* IsMapSteppingDisabled */}`
      )
    },
    {
      command: "extension.js-debug.network.clear" /* NetworkClear */,
      group: "navigation",
      when: `view == ${"jsDebugNetworkTree" /* Network */}`
    }
  ],
  "view/item/context": [
    {
      command: "extension.js-debug.addXHRBreakpoints" /* AddXHRBreakpoints */,
      when: `view == ${"jsBrowserBreakpoints" /* EventListenerBreakpoints */} && viewItem == xhrBreakpoint`
    },
    {
      command: "extension.js-debug.editXHRBreakpoints" /* EditXHRBreakpoint */,
      when: `view == ${"jsBrowserBreakpoints" /* EventListenerBreakpoints */} && viewItem == xhrBreakpoint`,
      group: "inline"
    },
    {
      command: "extension.js-debug.editXHRBreakpoints" /* EditXHRBreakpoint */,
      when: `view == ${"jsBrowserBreakpoints" /* EventListenerBreakpoints */} && viewItem == xhrBreakpoint`
    },
    {
      command: "extension.js-debug.removeXHRBreakpoint" /* RemoveXHRBreakpoints */,
      when: `view == ${"jsBrowserBreakpoints" /* EventListenerBreakpoints */} && viewItem == xhrBreakpoint`,
      group: "inline"
    },
    {
      command: "extension.js-debug.removeXHRBreakpoint" /* RemoveXHRBreakpoints */,
      when: `view == ${"jsBrowserBreakpoints" /* EventListenerBreakpoints */} && viewItem == xhrBreakpoint`
    },
    {
      command: "extension.js-debug.addXHRBreakpoints" /* AddXHRBreakpoints */,
      when: `view == ${"jsBrowserBreakpoints" /* EventListenerBreakpoints */} && viewItem == xhrCategory`,
      group: "inline"
    },
    {
      command: "extension.js-debug.callers.goToCaller" /* CallersGoToCaller */,
      group: "inline",
      when: `view == ${"jsExcludedCallers" /* ExcludedCallers */}`
    },
    {
      command: "extension.js-debug.callers.gotToTarget" /* CallersGoToTarget */,
      group: "inline",
      when: `view == ${"jsExcludedCallers" /* ExcludedCallers */}`
    },
    {
      command: "extension.js-debug.callers.remove" /* CallersRemove */,
      group: "inline",
      when: `view == ${"jsExcludedCallers" /* ExcludedCallers */}`
    },
    {
      command: "extension.js-debug.network.viewRequest" /* NetworkViewRequest */,
      group: "inline@1",
      when: `view == ${"jsDebugNetworkTree" /* Network */}`
    },
    {
      command: "extension.js-debug.network.openBody" /* NetworkOpenBody */,
      group: "body@1",
      when: `view == ${"jsDebugNetworkTree" /* Network */}`
    },
    {
      command: "extension.js-debug.network.openBodyInHex" /* NetworkOpenBodyHex */,
      group: "body@2",
      when: `view == ${"jsDebugNetworkTree" /* Network */}`
    },
    {
      command: "extension.js-debug.network.copyUri" /* NetworkCopyUri */,
      group: "other@1",
      when: `view == ${"jsDebugNetworkTree" /* Network */}`
    },
    {
      command: "extension.js-debug.network.replayXHR" /* NetworkReplayXHR */,
      group: "other@2",
      when: `view == ${"jsDebugNetworkTree" /* Network */}`
    }
  ],
  "editor/title": [
    {
      command: "extension.js-debug.prettyPrint" /* PrettyPrint */,
      group: "navigation",
      when: `debugState == stopped && resource in ${"jsDebugCanPrettyPrint" /* CanPrettyPrint */}`
    }
  ]
};
var keybindings = [
  {
    command: "extension.node-debug.startWithStopOnEntry" /* StartWithStopOnEntry */,
    key: "F10",
    mac: "F10",
    when: forNodeDebugType("debugConfigurationType", "!inDebugMode")
  },
  {
    command: "extension.node-debug.startWithStopOnEntry" /* StartWithStopOnEntry */,
    key: "F11",
    mac: "F11",
    when: forNodeDebugType(
      "debugConfigurationType",
      "!inDebugMode && activeViewlet == workbench.view.debug"
    )
  }
];
var viewsWelcome = [
  {
    view: "debug",
    contents: refString("debug.terminal.welcomeWithLink"),
    when: forSomeContextKeys(commonLanguages, "debugStartLanguage", "!isWeb")
  },
  {
    view: "debug",
    contents: refString("debug.terminal.welcome"),
    when: forSomeContextKeys(commonLanguages, "debugStartLanguage", "isWeb")
  }
];
var views = {
  debug: [
    {
      id: "jsBrowserBreakpoints" /* EventListenerBreakpoints */,
      name: "Event Listener Breakpoints",
      when: forBrowserDebugType("debugType")
    },
    {
      id: "jsExcludedCallers" /* ExcludedCallers */,
      name: "Excluded Callers",
      when: forAnyDebugType("debugType", "jsDebugHasExcludedCallers")
    },
    {
      id: "jsDebugNetworkTree" /* Network */,
      name: "Network",
      when: "jsDebugNetworkAvailable" /* NetworkAvailable */
    }
  ]
};
var activationEvents = /* @__PURE__ */ new Set([
  "onDebugDynamicConfigurations",
  "onDebugInitialConfigurations",
  `onFileSystem:${networkFilesystemScheme}`,
  ...[...debuggers.map((dbg) => dbg.type), ...preferredDebugTypes.values()].map(
    (t) => `onDebugResolve:${t}`
  ),
  ...[...allCommands].map((cmd) => `onCommand:${cmd}`)
]);
for (const { command } of commands) {
  activationEvents.delete(`onCommand:${command}`);
}
if (require.main === module) {
  process.stdout.write(
    JSON.stringify({
      capabilities: {
        virtualWorkspaces: false,
        untrustedWorkspaces: {
          supported: "limited",
          description: refString("workspaceTrust.description")
        }
      },
      activationEvents: [...activationEvents],
      contributes: {
        menus,
        breakpoints: breakpointLanguages.map((language) => ({ language })),
        debuggers: buildDebuggers(),
        commands,
        keybindings,
        configuration: {
          title: "JavaScript Debugger",
          properties: configurationSchema
        },
        grammars: [
          {
            language: "wat",
            scopeName: "text.wat",
            path: "./src/ui/basic-wat.tmLanguage.json"
          }
        ],
        languages: [
          {
            id: "wat",
            extensions: [".wat", ".wasm"],
            aliases: ["WebAssembly Text Format"],
            firstLine: "^\\(module",
            mimetypes: ["text/wat"]
          }
        ],
        terminal: {
          profiles: [
            {
              id: "extension.js-debug.debugTerminal",
              title: refString("debug.terminal.label"),
              icon: "$(debug)"
            }
          ]
        },
        views,
        viewsWelcome
      }
    })
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  debuggers
});

// SIG // Begin signature block
// SIG // MIIoKAYJKoZIhvcNAQcCoIIoGTCCKBUCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // ag+iayBY6+6tntdBQ6a0go/zHKQi8j7C9bKaTaaGESCg
// SIG // gg12MIIF9DCCA9ygAwIBAgITMwAABARsdAb/VysncgAA
// SIG // AAAEBDANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTI0MDkxMjIwMTExNFoX
// SIG // DTI1MDkxMTIwMTExNFowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // tCg32mOdDA6rBBnZSMwxwXegqiDEUFlvQH9Sxww07hY3
// SIG // w7L52tJxLg0mCZjcszQddI6W4NJYb5E9QM319kyyE0l8
// SIG // EvA/pgcxgljDP8E6XIlgVf6W40ms286Cr0azaA1f7vaJ
// SIG // jjNhGsMqOSSSXTZDNnfKs5ENG0bkXeB2q5hrp0qLsm/T
// SIG // WO3oFjeROZVHN2tgETswHR3WKTm6QjnXgGNj+V6rSZJO
// SIG // /WkTqc8NesAo3Up/KjMwgc0e67x9llZLxRyyMWUBE9co
// SIG // T2+pUZqYAUDZ84nR1djnMY3PMDYiA84Gw5JpceeED38O
// SIG // 0cEIvKdX8uG8oQa047+evMfDRr94MG9EWwIDAQABo4IB
// SIG // czCCAW8wHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFPIboTWxEw1PmVpZS+AzTDwo
// SIG // oxFOMEUGA1UdEQQ+MDykOjA4MR4wHAYDVQQLExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xFjAUBgNVBAUTDTIzMDAx
// SIG // Mis1MDI5MjMwHwYDVR0jBBgwFoAUSG5k5VAF04KqFzc3
// SIG // IrVtqMp1ApUwVAYDVR0fBE0wSzBJoEegRYZDaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jcmwvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNybDBhBggr
// SIG // BgEFBQcBAQRVMFMwUQYIKwYBBQUHMAKGRWh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNydDAMBgNV
// SIG // HRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4ICAQCI5g/S
// SIG // KUFb3wdUHob6Qhnu0Hk0JCkO4925gzI8EqhS+K4umnvS
// SIG // BU3acsJ+bJprUiMimA59/5x7WhJ9F9TQYy+aD9AYwMtb
// SIG // KsQ/rst+QflfML+Rq8YTAyT/JdkIy7R/1IJUkyIS6srf
// SIG // G1AKlX8n6YeAjjEb8MI07wobQp1F1wArgl2B1mpTqHND
// SIG // lNqBjfpjySCScWjUHNbIwbDGxiFr93JoEh5AhJqzL+8m
// SIG // onaXj7elfsjzIpPnl8NyH2eXjTojYC9a2c4EiX0571Ko
// SIG // mhENF3RtR25A7/X7+gk6upuE8tyMy4sBkl2MUSF08U+E
// SIG // 2LOVcR8trhYxV1lUi9CdgEU2CxODspdcFwxdT1+G8YNc
// SIG // gzHyjx3BNSI4nOZcdSnStUpGhCXbaOIXfvtOSfQX/UwJ
// SIG // oruhCugvTnub0Wna6CQiturglCOMyIy/6hu5rMFvqk9A
// SIG // ltIJ0fSR5FwljW6PHHDJNbCWrZkaEgIn24M2mG1M/Ppb
// SIG // /iF8uRhbgJi5zWxo2nAdyDBqWvpWxYIoee/3yIWpquVY
// SIG // cYGhJp/1I1sq/nD4gBVrk1SKX7Do2xAMMO+cFETTNSJq
// SIG // fTSSsntTtuBLKRB5mw5qglHKuzapDiiBuD1Zt4QwxA/1
// SIG // kKcyQ5L7uBayG78kxlVNNbyrIOFH3HYmdH0Pv1dIX/Mq
// SIG // 7avQpAfIiLpOWwcbjzCCB3owggVioAMCAQICCmEOkNIA
// SIG // AAAAAAMwDQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290
// SIG // IENlcnRpZmljYXRlIEF1dGhvcml0eSAyMDExMB4XDTEx
// SIG // MDcwODIwNTkwOVoXDTI2MDcwODIxMDkwOVowfjELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEoMCYGA1UEAxMfTWljcm9zb2Z0
// SIG // IENvZGUgU2lnbmluZyBQQ0EgMjAxMTCCAiIwDQYJKoZI
// SIG // hvcNAQEBBQADggIPADCCAgoCggIBAKvw+nIQHC6t2G6q
// SIG // ghBNNLrytlghn0IbKmvpWlCquAY4GgRJun/DDB7dN2vG
// SIG // EtgL8DjCmQawyDnVARQxQtOJDXlkh36UYCRsr55JnOlo
// SIG // XtLfm1OyCizDr9mpK656Ca/XllnKYBoF6WZ26DJSJhIv
// SIG // 56sIUM+zRLdd2MQuA3WraPPLbfM6XKEW9Ea64DhkrG5k
// SIG // NXimoGMPLdNAk/jj3gcN1Vx5pUkp5w2+oBN3vpQ97/vj
// SIG // K1oQH01WKKJ6cuASOrdJXtjt7UORg9l7snuGG9k+sYxd
// SIG // 6IlPhBryoS9Z5JA7La4zWMW3Pv4y07MDPbGyr5I4ftKd
// SIG // gCz1TlaRITUlwzluZH9TupwPrRkjhMv0ugOGjfdf8NBS
// SIG // v4yUh7zAIXQlXxgotswnKDglmDlKNs98sZKuHCOnqWbs
// SIG // YR9q4ShJnV+I4iVd0yFLPlLEtVc/JAPw0XpbL9Uj43Bd
// SIG // D1FGd7P4AOG8rAKCX9vAFbO9G9RVS+c5oQ/pI0m8GLhE
// SIG // fEXkwcNyeuBy5yTfv0aZxe/CHFfbg43sTUkwp6uO3+xb
// SIG // n6/83bBm4sGXgXvt1u1L50kppxMopqd9Z4DmimJ4X7Iv
// SIG // hNdXnFy/dygo8e1twyiPLI9AN0/B4YVEicQJTMXUpUMv
// SIG // dJX3bvh4IFgsE11glZo+TzOE2rCIF96eTvSWsLxGoGyY
// SIG // 0uDWiIwLAgMBAAGjggHtMIIB6TAQBgkrBgEEAYI3FQEE
// SIG // AwIBADAdBgNVHQ4EFgQUSG5k5VAF04KqFzc3IrVtqMp1
// SIG // ApUwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
// SIG // BBgwFoAUci06AjGQQ7kUBU7h6qfHMdEjiTQwWgYDVR0f
// SIG // BFMwUTBPoE2gS4ZJaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
// SIG // MjAxMV8yMDExXzAzXzIyLmNybDBeBggrBgEFBQcBAQRS
// SIG // MFAwTgYIKwYBBQUHMAKGQmh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY2VydHMvTWljUm9vQ2VyQXV0MjAx
// SIG // MV8yMDExXzAzXzIyLmNydDCBnwYDVR0gBIGXMIGUMIGR
// SIG // BgkrBgEEAYI3LgMwgYMwPwYIKwYBBQUHAgEWM2h0dHA6
// SIG // Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvZG9jcy9w
// SIG // cmltYXJ5Y3BzLmh0bTBABggrBgEFBQcCAjA0HjIgHQBM
// SIG // AGUAZwBhAGwAXwBwAG8AbABpAGMAeQBfAHMAdABhAHQA
// SIG // ZQBtAGUAbgB0AC4gHTANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // Z/KGpZjgVHkaLtPYdGcimwuWEeFjkplCln3SeQyQwWVf
// SIG // Liw++MNy0W2D/r4/6ArKO79HqaPzadtjvyI1pZddZYSQ
// SIG // fYtGUFXYDJJ80hpLHPM8QotS0LD9a+M+By4pm+Y9G6XU
// SIG // tR13lDni6WTJRD14eiPzE32mkHSDjfTLJgJGKsKKELuk
// SIG // qQUMm+1o+mgulaAqPyprWEljHwlpblqYluSD9MCP80Yr
// SIG // 3vw70L01724lruWvJ+3Q3fMOr5kol5hNDj0L8giJ1h/D
// SIG // Mhji8MUtzluetEk5CsYKwsatruWy2dsViFFFWDgycSca
// SIG // f7H0J/jeLDogaZiyWYlobm+nt3TDQAUGpgEqKD6CPxNN
// SIG // ZgvAs0314Y9/HG8VfUWnduVAKmWjw11SYobDHWM2l4bf
// SIG // 2vP48hahmifhzaWX0O5dY0HjWwechz4GdwbRBrF1HxS+
// SIG // YWG18NzGGwS+30HHDiju3mUv7Jf2oVyW2ADWoUa9WfOX
// SIG // pQlLSBCZgB/QACnFsZulP0V3HjXG0qKin3p6IvpIlR+r
// SIG // +0cjgPWe+L9rt0uX4ut1eBrs6jeZeRhL/9azI2h15q/6
// SIG // /IvrC4DqaTuv/DDtBEyO3991bWORPdGdVk5Pv4BXIqF4
// SIG // ETIheu9BCrE/+6jMpF3BoYibV3FWTkhFwELJm3ZbCoBI
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoKMIIaBgIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAE
// SIG // BGx0Bv9XKydyAAAAAAQEMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCBmhET9+o6NotPnxQIJIS44EVcBXkZImPIN
// SIG // bD96QEZrxzBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAJYiXE61
// SIG // cUHkhkexhfImLc9jyhYJvKibzz1DVp6otPeksYgrwXjA
// SIG // 3pPXHkw79r6dRpz5S+G4Vl3+f8DsGPQb9DktfKyxhLL4
// SIG // r1CpPOVPmQIL6bFvCGdCZbKc6Cq8+z2gJ49HD69b+HVR
// SIG // JCIaccR4efANpKsj/Glmwo9oD4HgHylg0wplf+tUY2fU
// SIG // PoR7yrYPSnvgcTnsYOULP9GLlWFlhLpVSICjcwd1eYn7
// SIG // 08MVOJpzLly0VZV4N3mPwhPHOrawp9aJw3GEWIWBzBxX
// SIG // 7lqWdCd0YeGzVU9GyJzT6Vn5MChc64bGS2zwdDKk0kuS
// SIG // HLECuZ8DRM9D6OFTgjbQ9R+Tm32hgheUMIIXkAYKKwYB
// SIG // BAGCNwMDATGCF4Awghd8BgkqhkiG9w0BBwKgghdtMIIX
// SIG // aQIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgKthn+3xD8Vn9jRautPft
// SIG // Uxns2n0gW+1sI5KuIOzd1DECBmdn/FoToRgTMjAyNDEy
// SIG // MzEwOTA4NTYuMjI1WjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOjM3MDMtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR6jCCByAwggUIoAMCAQICEzMAAAHqmiRy1Vk/YWMA
// SIG // AQAAAeowDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMxMjA2MTg0NTMwWhcN
// SIG // MjUwMzA1MTg0NTMwWjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OjM3MDMtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAtQtf8Ug/IAfV+y7n
// SIG // aKNq1m9pLKmheuULSZG0KZrHOhuG4OTDr+lj/7ieFzib
// SIG // yl/3NbdHo+KFganRg+lW411+E9Cn8pU7pa8yrYMZ8WYe
// SIG // 6tbg9A8v8ORtAyQz2+qMUK8+rzFdmd8vWcY32agZw36h
// SIG // qJ/+FQx52YXWrNtrL0guRh8sLENifdDDOy+HnGPE5yyP
// SIG // OZF101REm9PbcS9rRzGKwfihwstPHbN+mp+yHDhn0ZoR
// SIG // 2xaD2uaJvWBqVSkvMXk+xAMFu1m1y/5aOafSkUSIwJbA
// SIG // QRw9U3RgbnKxgt00F0k6fbOw45L7zRblGtASrM+lIgi8
// SIG // SRkEmYXdojiUxHydX8WJNp2OkgirFflZrVeWoj82P7Fq
// SIG // BWOeNvs86wD6+Hpa76/bgenIvynIv/xDhEWRFEwT1zBP
// SIG // 4mvrfI609st7oNeTEglboTrDa5rmRcGkQq0RA9Ms+Ffc
// SIG // JTExhyCVueYjTNxz1SSdfbzkr6wj/ZbBHBMFmSENRQsj
// SIG // zp5DNX7O/PNHWoQGuVJj6jJOVhCscwz1adPNV+UUOhxl
// SIG // VM+mXYENI3E+fRBvgigz0Q+psfKL8yKUv6/8BBzyreZD
// SIG // oWK48kB13PShyk1n16QFY9UsqreV+J6/jKXrm7/jfz40
// SIG // BD69ImCQ40sya6iC4QbOacrW+r8kfB1FTKfpgAOK14zs
// SIG // ONr5B30CAwEAAaOCAUkwggFFMB0GA1UdDgQWBBQrgUUl
// SIG // olHm6RdAVNTEyHKLBW5ZXjAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // KIOtVl4/fv58VW19xt+yoL8qDQJ7rtsNx6FmY9x9GAnk
// SIG // N2/SkmU4VU4VuIhXB6yp4RTAW1yV+LkCOd5Dlkmlgmld
// SIG // 8Qs56Ubd3OP4Ep93bzv9Rj9zCZKSX4KOegoEvcyzoj99
// SIG // ZH5qVHT6npGW+IrzEei6D2+RzZatFmwacxW7bE4za08n
// SIG // 6qnKgMHOq/fQ39lEE6g2tL88KQPAsYgINipWz8jMATj3
// SIG // K/YSU/LBqV/2YSw4ddXWXG1AM1x6NUSaK0kn7VWvYS1p
// SIG // 88RsxBmnz1MC5qBE4oThi6iEJQqb6/eB4mpNBqtMGOpX
// SIG // blEI5P5cWeBMwMP3BjHpPCd0HYjUvLvbo2IdQezS6+rd
// SIG // yIJX0nA1d23VVnrdYrU1KClUSyIr0Q8AE+3UR9dwqt9o
// SIG // 9iRuQWLv14rURPHHc2iZg1Qc2IZT5fUF7wvuqkfCOjSD
// SIG // f/fdeG06v0uIOhReH9XYsVMROKpX1DzIsRq9BbeP0tD+
// SIG // H8JobPlh0Z+tjweI98wh4sSiQrEZ/SEdxMQUCkHTIuWr
// SIG // oqgesUAQA1H/he4UimX2wPLBUha3i0qob4/qlEBfODXM
// SIG // bmsaWyVlabDtfCC+EG7eOQs/0DGuxJjBjZ+2vDDN7k0D
// SIG // pUMtLunP46tddYtSajI2sk3HkGTTATDORDHOQ6+Zt0+G
// SIG // w4/VkzS4D/EhXtxKk2llTDkwggdxMIIFWaADAgECAhMz
// SIG // AAAAFcXna54Cm0mZAAAAAAAVMA0GCSqGSIb3DQEBCwUA
// SIG // MIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYDVQQDEylN
// SIG // aWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3Jp
// SIG // dHkgMjAxMDAeFw0yMTA5MzAxODIyMjVaFw0zMDA5MzAx
// SIG // ODMyMjVaMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
// SIG // YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYD
// SIG // VQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNV
// SIG // BAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEw
// SIG // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
// SIG // 5OGmTOe0ciELeaLL1yR5vQ7VgtP97pwHB9KpbE51yMo1
// SIG // V/YBf2xK4OK9uT4XYDP/XE/HZveVU3Fa4n5KWv64NmeF
// SIG // RiMMtY0Tz3cywBAY6GB9alKDRLemjkZrBxTzxXb1hlDc
// SIG // wUTIcVxRMTegCjhuje3XD9gmU3w5YQJ6xKr9cmmvHaus
// SIG // 9ja+NSZk2pg7uhp7M62AW36MEBydUv626GIl3GoPz130
// SIG // /o5Tz9bshVZN7928jaTjkY+yOSxRnOlwaQ3KNi1wjjHI
// SIG // NSi947SHJMPgyY9+tVSP3PoFVZhtaDuaRr3tpK56KTes
// SIG // y+uDRedGbsoy1cCGMFxPLOJiss254o2I5JasAUq7vnGp
// SIG // F1tnYN74kpEeHT39IM9zfUGaRnXNxF803RKJ1v2lIH1+
// SIG // /NmeRd+2ci/bfV+AutuqfjbsNkz2K26oElHovwUDo9Fz
// SIG // pk03dJQcNIIP8BDyt0cY7afomXw/TNuvXsLz1dhzPUNO
// SIG // wTM5TI4CvEJoLhDqhFFG4tG9ahhaYQFzymeiXtcodgLi
// SIG // Mxhy16cg8ML6EgrXY28MyTZki1ugpoMhXV8wdJGUlNi5
// SIG // UPkLiWHzNgY1GIRH29wb0f2y1BzFa/ZcUlFdEtsluq9Q
// SIG // BXpsxREdcu+N+VLEhReTwDwV2xo3xwgVGD94q0W29R6H
// SIG // XtqPnhZyacaue7e3PmriLq0CAwEAAaOCAd0wggHZMBIG
// SIG // CSsGAQQBgjcVAQQFAgMBAAEwIwYJKwYBBAGCNxUCBBYE
// SIG // FCqnUv5kxJq+gpE8RjUpzxD/LwTuMB0GA1UdDgQWBBSf
// SIG // pxVdAF5iXYP05dJlpxtTNRnpcjBcBgNVHSAEVTBTMFEG
// SIG // DCsGAQQBgjdMg30BATBBMD8GCCsGAQUFBwIBFjNodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL0RvY3Mv
// SIG // UmVwb3NpdG9yeS5odG0wEwYDVR0lBAwwCgYIKwYBBQUH
// SIG // AwgwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
// SIG // BBgwFoAU1fZWy4/oolxiaNE9lJBb186aGMQwVgYDVR0f
// SIG // BE8wTTBLoEmgR4ZFaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
// SIG // XzIwMTAtMDYtMjMuY3JsMFoGCCsGAQUFBwEBBE4wTDBK
// SIG // BggrBgEFBQcwAoY+aHR0cDovL3d3dy5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jZXJ0cy9NaWNSb29DZXJBdXRfMjAxMC0w
// SIG // Ni0yMy5jcnQwDQYJKoZIhvcNAQELBQADggIBAJ1Vffwq
// SIG // reEsH2cBMSRb4Z5yS/ypb+pcFLY+TkdkeLEGk5c9MTO1
// SIG // OdfCcTY/2mRsfNB1OW27DzHkwo/7bNGhlBgi7ulmZzpT
// SIG // Td2YurYeeNg2LpypglYAA7AFvonoaeC6Ce5732pvvinL
// SIG // btg/SHUB2RjebYIM9W0jVOR4U3UkV7ndn/OOPcbzaN9l
// SIG // 9qRWqveVtihVJ9AkvUCgvxm2EhIRXT0n4ECWOKz3+SmJ
// SIG // w7wXsFSFQrP8DJ6LGYnn8AtqgcKBGUIZUnWKNsIdw2Fz
// SIG // Lixre24/LAl4FOmRsqlb30mjdAy87JGA0j3mSj5mO0+7
// SIG // hvoyGtmW9I/2kQH2zsZ0/fZMcm8Qq3UwxTSwethQ/gpY
// SIG // 3UA8x1RtnWN0SCyxTkctwRQEcb9k+SS+c23Kjgm9swFX
// SIG // SVRk2XPXfx5bRAGOWhmRaw2fpCjcZxkoJLo4S5pu+yFU
// SIG // a2pFEUep8beuyOiJXk+d0tBMdrVXVAmxaQFEfnyhYWxz
// SIG // /gq77EFmPWn9y8FBSX5+k77L+DvktxW/tM4+pTFRhLy/
// SIG // AsGConsXHRWJjXD+57XQKBqJC4822rpM+Zv/Cuk0+CQ1
// SIG // ZyvgDbjmjJnW4SLq8CdCPSWU5nR0W2rRnj7tfqAxM328
// SIG // y+l7vzhwRNGQ8cirOoo6CGJ/2XBjU02N7oJtpQUQwXEG
// SIG // ahC0HVUzWLOhcGbyoYIDTTCCAjUCAQEwgfmhgdGkgc4w
// SIG // gcsxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJTAjBgNVBAsTHE1p
// SIG // Y3Jvc29mdCBBbWVyaWNhIE9wZXJhdGlvbnMxJzAlBgNV
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjozNzAzLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUAidse3EH46UbJ
// SIG // CfFBiHLTgpJhJI+ggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOsd
// SIG // rzowIhgPMjAyNDEyMzAyMzQ2MDJaGA8yMDI0MTIzMTIz
// SIG // NDYwMlowdDA6BgorBgEEAYRZCgQBMSwwKjAKAgUA6x2v
// SIG // OgIBADAHAgEAAgIYXTAHAgEAAgISZTAKAgUA6x8AugIB
// SIG // ADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZCgMC
// SIG // oAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqGSIb3
// SIG // DQEBCwUAA4IBAQCD7X833GTZfF1Zz+SV3GE3lK1Xia9y
// SIG // HOg5wZIkbhxabMgfwYhmMRGOxjoFpzmYKkCNizSyLE1z
// SIG // d1cSRY1IyloNyHJLDq7q4IUTa3xNL+5A+6s24bkHufn/
// SIG // UDzvcOPja9FsiiJbfiILcjM4x7nn+UOCykkQqMoDVJit
// SIG // /7o2fBGaW4PaY+P3ZBnh06uAQoynwTcf2xLIwMXgjOe5
// SIG // 5vejUXKNmFDp/VAM6gknvTb3T3Brejk9T2algKI8U5Ud
// SIG // pAMBfhMi8Ldt6sJzEBkqd1ltT7N05H3eOFWgno/5UNVL
// SIG // PWIdCvmmtvKTxLkkfL1FRpQFLV2g/LB+AW3uFsyw2DuJ
// SIG // hmykMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTACEzMAAAHqmiRy1Vk/YWMAAQAAAeow
// SIG // DQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJAzEN
// SIG // BgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQggm++
// SIG // tSlAHbdTySdKGssfQwsKVUWOwx1e0SOpqhdmi64wgfoG
// SIG // CyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCApj6HV42Q0
// SIG // eIsINJbSwDVwYeRtbiqiiL6vLIynpLhmeDCBmDCBgKR+
// SIG // MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1p
// SIG // Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAB
// SIG // 6pokctVZP2FjAAEAAAHqMCIEIDIncyIW1A4qAXR+7PgZ
// SIG // Zwcu/MbWIxy9rgK71Y6yivwwMA0GCSqGSIb3DQEBCwUA
// SIG // BIICAI7xZtH359BVxcepAUE6BtgiLbAayYhaQ8TvuNjH
// SIG // TrCEmZVJ7/xcJ2KjlDore8qL02gI8ovB0a4fkaEnqma5
// SIG // 1Vg9M9E+PVHjPIhSKE4XL7Zj4ehaIXbN89QtcpaO07+B
// SIG // 9hvpRUGAPugYRO/Sm2ANUFYvK4SCNqk1CuCc0wgeLRTy
// SIG // OuPw/oGoM4K99h0+D3Z/aAtZs68w7kxRPiyo/kfSBbVZ
// SIG // jeCEna9cCAa3/QGfQcq+KYhtSJDPKN/wqbFplC5nNC7L
// SIG // 2hc3hOc4biGhrx0UlPQMvmarkQv3lz3zC19chMGh241N
// SIG // aMYcOmh86P7UEQBllCluU/QG0HC1ANdo+RZtRaiBb6hl
// SIG // yAV9XHc6hM+yJumXvx2J4l7wczX0rFTmKc5V4XDD1p7B
// SIG // 4dzC01Mx9CYiafsQ4D15WzhLMuMc6JUkemWyG+POB5re
// SIG // r8a+1WO6keNnL19fPtD/AatOC6fl0k8iToOHmKqJeivj
// SIG // lBkOfB1o69KIiERi9xXPP6PndmrDcKX69smOlw2a4YOq
// SIG // C7/Z6uCYA5wuRsL7URMv74wDQ5Q0aL7l9cA2+Ow1hM5R
// SIG // swYA6SJtvnY1BMRQqnEGwvugQMvvziGxNGdYinWXf/Ka
// SIG // ZxI8+hdzRV/j4ADQpYndmpGfJKkzw1iwsDJeilPNJNBD
// SIG // LCNHu0+q044Rr/kgvv6rtfJByY5n
// SIG // End signature block
