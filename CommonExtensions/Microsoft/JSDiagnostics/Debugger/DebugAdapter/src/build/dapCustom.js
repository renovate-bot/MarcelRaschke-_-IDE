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

// src/build/dapCustom.ts
var dapCustom_exports = {};
__export(dapCustom_exports, {
  default: () => dapCustom_default
});
module.exports = __toCommonJS(dapCustom_exports);
var upperFirst = (x) => x.slice(0, 1).toUpperCase() + x.slice(1);
var makeEvent = (name, description, params) => ({
  [`${upperFirst(name)}Event`]: {
    allOf: [
      { $ref: "#/definitions/Event" },
      {
        type: "object",
        description,
        properties: {
          event: {
            type: "string",
            enum: [name]
          },
          body: {
            type: "object",
            ...params
          }
        },
        required: ["event", "body"]
      }
    ]
  }
});
var makeRequest = (name, description, args = {}, response) => ({
  [`${upperFirst(name)}Request`]: {
    allOf: [
      { $ref: "#/definitions/Request" },
      {
        type: "object",
        description,
        properties: {
          command: {
            type: "string",
            enum: [name]
          },
          arguments: {
            $ref: `#/definitions/${upperFirst(name)}Arguments`
          }
        },
        required: ["command", "arguments"]
      }
    ]
  },
  [`${upperFirst(name)}Arguments`]: {
    type: "object",
    description: `Arguments for '${name}' request.`,
    ...args
  },
  [`${upperFirst(name)}Response`]: {
    allOf: [
      { $ref: "#/definitions/Response" },
      {
        type: "object",
        description: `Response to '${name}' request.`,
        ...response && {
          properties: {
            body: {
              type: "object",
              ...response
            }
          },
          required: ["body"]
        }
      }
    ]
  }
});
var dapCustom = {
  definitions: {
    ...makeRequest("setCustomBreakpoints", "Sets the enabled custom breakpoints.", {
      properties: {
        ids: {
          type: "array",
          items: {
            type: "string"
          },
          description: "Id of breakpoints that should be enabled."
        },
        xhr: {
          type: "array",
          items: {
            type: "string"
          },
          description: "strings of XHR breakpoints that should be enabled."
        }
      },
      required: ["ids", "xhr"]
    }),
    ...makeRequest("prettyPrintSource", "Pretty prints source for debugging.", {
      properties: {
        source: {
          $ref: "#/definitions/Source",
          description: "Source to be pretty printed."
        },
        line: {
          type: "integer",
          description: "Line number of currently selected location to reveal after pretty printing. If not present, nothing is revealed."
        },
        column: {
          type: "integer",
          description: "Column number of currently selected location to reveal after pretty printing."
        }
      },
      required: ["source"]
    }),
    ...makeRequest("toggleSkipFileStatus", "Toggle skip status of file.", {
      properties: {
        resource: {
          type: "string",
          description: "Url of file to be skipped."
        },
        sourceReference: {
          type: "number",
          description: "Source reference number of file."
        }
      }
    }),
    ...makeEvent("revealLocationRequested", "A request to reveal a certain location in the UI.", {
      properties: {
        source: {
          $ref: "#/definitions/Source",
          description: "The source to reveal."
        },
        line: {
          type: "integer",
          description: "The line number to reveal."
        },
        column: {
          type: "integer",
          description: "The column number to reveal."
        }
      },
      required: ["source"]
    }),
    ...makeEvent("copyRequested", "A request to copy a certain string to clipboard.", {
      properties: {
        text: {
          type: "string",
          description: "Text to copy."
        }
      },
      required: ["text"]
    }),
    ...makeEvent(
      "longPrediction",
      "An event sent when breakpoint prediction takes a significant amount of time.",
      {}
    ),
    ...makeEvent(
      "launchBrowserInCompanion",
      "Request to launch a browser in the companion extension within the UI.",
      {
        required: ["type", "params", "serverPort", "launchId"],
        properties: {
          type: {
            type: "string",
            enum: ["chrome", "edge"],
            description: "Type of browser to launch"
          },
          launchId: {
            type: "number",
            description: "Incrementing ID to refer to this browser launch request"
          },
          serverPort: {
            type: "number",
            description: "Local port the debug server is listening on"
          },
          path: {
            type: "string",
            description: "Server path to connect to"
          },
          browserArgs: {
            type: "array",
            items: {
              type: "string"
            }
          },
          attach: {
            type: "object",
            required: ["host", "port"],
            properties: {
              host: { type: "string" },
              port: { type: "number" }
            }
          },
          params: {
            type: "object",
            description: "Original launch parameters for the debug session"
          }
        }
      }
    ),
    ...makeEvent("killCompanionBrowser", "Kills a launched browser companion.", {
      required: ["launchId"],
      properties: {
        launchId: {
          type: "number",
          description: "Incrementing ID to refer to this browser launch request"
        }
      }
    }),
    ...makeRequest("startProfile", "Starts taking a profile of the target.", {
      properties: {
        stopAtBreakpoint: {
          type: "array",
          items: {
            type: "number"
          },
          description: "Breakpoints where we should stop once hit."
        },
        type: {
          type: "string",
          description: "Type of profile that should be taken"
        },
        params: {
          type: "object",
          description: "Additional arguments for the type of profiler"
        }
      },
      required: ["file", "type"]
    }),
    ...makeRequest("stopProfile", "Stops a running profile."),
    ...makeEvent("profileStarted", "Fired when a profiling state changes.", {
      required: ["type", "file"],
      properties: {
        type: {
          type: "string",
          description: "Type of running profile"
        },
        file: {
          type: "string",
          description: "Location where the profile is saved."
        }
      }
    }),
    ...makeEvent("profilerStateUpdate", "Fired when a profiling state changes.", {
      required: ["label", "running"],
      properties: {
        label: {
          type: "string",
          description: "Description of the current state"
        },
        running: {
          type: "boolean",
          description: "Set to false if the profile has now ended"
        }
      }
    }),
    ...makeRequest(
      "launchVSCode",
      "Launches a VS Code extension host in debug mode.",
      {
        required: ["args", "env"],
        properties: {
          args: {
            type: "array",
            items: {
              $ref: "#/definitions/LaunchVSCodeArgument"
            }
          },
          env: {
            type: "object"
          },
          debugRenderer: {
            type: "boolean"
          }
        }
      },
      {
        properties: {
          rendererDebugPort: {
            type: "number"
          }
        }
      }
    ),
    LaunchVSCodeArgument: {
      type: "object",
      description: 'This interface represents a single command line argument split into a "prefix" and a "path" half. The optional "prefix" contains arbitrary text and the optional "path" contains a file system path. Concatenating both results in the original command line argument.',
      properties: {
        path: {
          type: "string"
        },
        prefix: {
          type: "string"
        }
      }
    },
    ...makeRequest("launchUnelevated", "Launches a VS Code extension host in debug mode.", {
      properties: {
        process: {
          type: "string"
        },
        args: {
          type: "array",
          items: {
            type: "string"
          }
        }
      }
    }),
    ...makeRequest(
      "remoteFileExists",
      "Check if file exists on remote file system, used in VS.",
      {
        properties: {
          localFilePath: {
            type: "string"
          }
        }
      },
      {
        required: ["doesExists"],
        properties: {
          doesExists: {
            type: "boolean",
            description: "Does the file exist on the remote file system."
          }
        }
      }
    ),
    ...makeRequest(
      "remoteFileExists",
      "Check if file exists on remote file system, used in VS.",
      {
        properties: {
          localFilePath: {
            type: "string"
          }
        }
      },
      {
        required: ["doesExists"],
        properties: {
          doesExists: {
            type: "boolean",
            description: "Does the file exist on the remote file system."
          }
        }
      }
    ),
    ...makeRequest("revealPage", "Focuses the browser page or tab associated with the session."),
    ...makeRequest("startSelfProfile", "Starts profiling the extension itself. Used by VS.", {
      required: ["file"],
      properties: {
        file: {
          description: "File where the profile should be saved",
          type: "string"
        }
      }
    }),
    ...makeRequest("stopSelfProfile", "Stops profiling the extension itself. Used by VS."),
    ...makeRequest(
      "getPerformance",
      "Requests that we get performance information from the runtime.",
      {},
      {
        properties: {
          metrics: {
            type: "object",
            description: "Response to 'GetPerformance' request. A key-value list of runtime-dependent details."
          },
          error: {
            description: "Optional error from the adapter",
            type: "string"
          }
        }
      }
    ),
    ...makeEvent(
      "suggestDisableSourcemap",
      "Fired when requesting a missing source from a sourcemap. UI will offer to disable the sourcemap.",
      {
        properties: {
          source: {
            $ref: "#/definitions/Source",
            description: "Source to be pretty printed."
          }
        },
        required: ["source"]
      }
    ),
    ...makeRequest(
      "disableSourcemap",
      "Disables the sourcemapped source and refreshes the stacktrace if paused.",
      {
        properties: {
          source: {
            $ref: "#/definitions/Source",
            description: "Source to be pretty printed."
          }
        },
        required: ["source"]
      }
    ),
    ...makeRequest(
      "createDiagnostics",
      "Generates diagnostic information for the debug session.",
      {
        properties: {
          fromSuggestion: {
            type: "boolean",
            description: "Whether the tool is opening from a prompt"
          }
        }
      },
      {
        properties: {
          file: {
            type: "string",
            description: "Location of the generated report on disk"
          }
        },
        required: ["file"]
      }
    ),
    ...makeRequest(
      "saveDiagnosticLogs",
      "Saves recent diagnostic logs for the debug session.",
      {
        properties: {
          toFile: {
            type: "string",
            description: "File where logs should be saved"
          }
        },
        required: ["toFile"]
      },
      {}
    ),
    ...makeEvent(
      "suggestDiagnosticTool",
      "Shows a prompt to the user suggesting they use the diagnostic tool if breakpoints don't bind.",
      {}
    ),
    ...makeEvent("openDiagnosticTool", "Opens the diagnostic tool if breakpoints don't bind.", {
      properties: {
        file: {
          type: "string",
          description: "Location of the generated report on disk"
        }
      },
      required: ["file"]
    }),
    ...makeRequest(
      "requestCDPProxy",
      "Request WebSocket connection information on a proxy for this debug sessions CDP connection.",
      void 0,
      {
        required: ["host", "port", "path"],
        properties: {
          host: {
            type: "string",
            description: "Name of the host, on which the CDP proxy is available through a WebSocket."
          },
          port: {
            type: "number",
            description: "Port on the host, under which the CDP proxy is available through a WebSocket."
          },
          path: {
            type: "string",
            description: "Websocket path to connect to."
          }
        }
      }
    ),
    CallerLocation: {
      type: "object",
      required: ["line", "column", "source"],
      properties: {
        line: {
          type: "integer"
        },
        column: {
          type: "integer"
        },
        source: {
          $ref: "#/definitions/Source",
          description: "Source to be pretty printed."
        }
      }
    },
    ExcludedCaller: {
      type: "object",
      required: ["target", "caller"],
      properties: {
        target: {
          $ref: "#/definitions/CallerLocation"
        },
        caller: {
          $ref: "#/definitions/CallerLocation"
        }
      }
    },
    ...makeRequest("setExcludedCallers", "Adds an excluded caller/target pair.", {
      properties: {
        callers: {
          type: "array",
          items: {
            $ref: "#/definitions/ExcludedCaller"
          }
        }
      },
      required: ["callers"]
    }),
    ...makeRequest("setSourceMapStepping", "Configures whether source map stepping is enabled.", {
      properties: {
        enabled: {
          type: "boolean"
        }
      },
      required: ["enabled"]
    }),
    ...makeRequest("setDebuggerProperty", "Sets debugger properties.", {
      properties: {
        params: {
          $ref: "#/definitions/SetDebuggerPropertyParams"
        }
      },
      required: ["params"]
    }),
    SetDebuggerPropertyParams: {
      type: "object",
      description: 'Arguments for "setDebuggerProperty" request. Properties are determined by debugger.'
    },
    ...makeRequest(
      "capabilitiesExtended",
      "The event indicates that one or more capabilities have changed.",
      {
        properties: {
          params: {
            $ref: "#/definitions/CapabilitiesExtended"
          }
        },
        required: ["params"]
      }
    ),
    CapabilitiesExtended: {
      allOf: [
        { $ref: "#/definitions/Capabilities" },
        {
          type: "object",
          description: "Extension of Capabilities defined in public DAP",
          properties: {
            supportsDebuggerProperties: {
              type: "boolean"
            },
            supportsEvaluationOptions: {
              type: "boolean"
            },
            supportsSetSymbolOptions: {
              type: "boolean",
              description: "The debug adapter supports the set symbol options request"
            }
          }
        }
      ]
    },
    ...makeRequest("evaluationOptions", "Used by evaluate and variables.", {
      properties: {
        evaluateParams: {
          $ref: "#/definitions/EvaluateParamsExtended"
        },
        variablesParams: {
          $ref: "#/definitions/VariablesParamsExtended"
        },
        stackTraceParams: {
          $ref: "#/definitions/StackTraceParamsExtended"
        }
      }
    }),
    EvaluationOptions: {
      type: "object",
      description: 'Options passed to expression evaluation commands ("evaluate" and "variables") to control how the evaluation occurs.',
      properties: {
        treatAsStatement: {
          type: "boolean",
          description: "Evaluate the expression as a statement."
        },
        allowImplicitVars: {
          type: "boolean",
          description: "Allow variables to be declared as part of the expression."
        },
        noSideEffects: {
          type: "boolean",
          description: "Evaluate without side effects."
        },
        noFuncEval: {
          type: "boolean",
          description: "Exclude funceval during evaluation."
        },
        noToString: {
          type: "boolean",
          description: "Exclude calling `ToString` during evaluation."
        },
        forceEvaluationNow: {
          type: "boolean",
          description: "Evaluation should take place immediately if possible."
        },
        forceRealFuncEval: {
          type: "boolean",
          description: "Exclude interpretation from evaluation methods."
        },
        runAllThreads: {
          type: "boolean",
          description: "Allow all threads to run during the evaluation."
        },
        rawStructures: {
          type: "boolean",
          description: "The 'raw' view of objects and structions should be shown - visualization improvements should be disabled."
        },
        filterToFavorites: {
          type: "boolean",
          description: "Variables responses containing favorites should be filtered to only those items"
        },
        simpleDisplayString: {
          type: "boolean",
          description: "Auto generated display strings for variables with favorites should not include field names."
        }
      }
    },
    EvaluateParamsExtended: {
      allOf: [
        { $ref: "#/definitions/EvaluateParams" },
        {
          type: "object",
          description: "Extension of EvaluateParams",
          properties: {
            evaluationOptions: {
              $ref: "#/definitions/EvaluationOptions"
            }
          }
        }
      ]
    },
    VariablesParamsExtended: {
      allOf: [
        { $ref: "#/definitions/VariablesParams" },
        {
          type: "object",
          description: "Extension of VariablesParams",
          properties: {
            evaluationOptions: {
              $ref: "#/definitions/EvaluationOptions"
            }
          }
        }
      ]
    },
    StackTraceParamsExtended: {
      allOf: [
        { $ref: "#/definitions/StackTraceParams" },
        {
          type: "object",
          description: "Extension of StackTraceParams",
          properties: {
            noFuncEval: {
              type: "boolean"
            }
          }
        }
      ]
    },
    ...makeRequest("setSymbolOptions", "Sets options for locating symbols."),
    SetSymbolOptionsArguments: {
      type: "object",
      description: 'Arguments for "setSymbolOptions" request. Properties are determined by debugger.'
    },
    ...makeEvent(
      "networkEvent",
      "A wrapped CDP network event. There is little abstraction here because UI interacts literally with CDP at the moment.",
      {
        properties: {
          event: {
            type: "string",
            description: "The CDP network event name"
          },
          data: {
            type: "object",
            description: "The CDP network data"
          }
        },
        required: ["event", "data"]
      }
    ),
    ...makeRequest(
      "networkCall",
      "Makes a network call. There is little abstraction here because UI interacts literally with CDP at the moment.",
      {
        properties: {
          method: {
            type: "string",
            description: "The HTTP method"
          },
          params: {
            type: "object",
            description: "The CDP call parameters"
          }
        },
        required: ["method", "params"]
      },
      {
        type: "object"
      }
    ),
    ...makeRequest(
      "enableNetworking",
      "Attempts to enable networking on the target.",
      {
        properties: {
          mirrorEvents: {
            type: "array",
            items: { type: "string" },
            description: 'CDP network domain events to mirror (e.g. "requestWillBeSent")'
          }
        },
        required: ["mirrorEvents"]
      },
      {
        type: "object"
      }
    ),
    ...makeRequest(
      "getPreferredUILocation",
      "Resolves a compiled location into a preferred source location. May be used by other VS Code extensions.",
      {
        properties: {
          source: {
            $ref: "#/definitions/Source",
            description: "The source to look up."
          },
          line: {
            type: "integer",
            description: "The base-0 line number to look up."
          },
          column: {
            type: "integer",
            description: "The base-0 column number to look up."
          }
        },
        required: ["source", "line", "column"]
      },
      {
        properties: {
          source: {
            $ref: "#/definitions/Source",
            description: "The resolved source."
          },
          line: {
            type: "integer",
            description: "The base-0 line number in the source."
          },
          column: {
            type: "integer",
            description: "The base-0 column number in the source."
          }
        },
        required: ["source", "line", "column"]
      }
    )
  }
};
var dapCustom_default = dapCustom;

// SIG // Begin signature block
// SIG // MIIoKwYJKoZIhvcNAQcCoIIoHDCCKBgCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // cFPG9j2TVeCcIt29EB5OEhz/acrZqb8ZYHz2LKjuNF6g
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
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoNMIIaCQIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAE
// SIG // BGx0Bv9XKydyAAAAAAQEMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCDOIvIPTW2OUvdq6zDJfjUS7yjTmtM4ev+7
// SIG // blxVudTBijBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAKWCUiO1
// SIG // ec6+j+7dUCrPOXVQNZcEDSOjBiIpG3Orv4QwLMAU32Pj
// SIG // VNlwhwaZIbdSooKwFx3w8iAHObWwRSQXqA84JRkJYPAQ
// SIG // afqse8Zuk98drNEam4no3af0/QWr2capXvzWYzpbjGGq
// SIG // GNe1ujOJ0G57tJ+t0rAJu5mt601plB2Hvm1nku5Vr3TJ
// SIG // UApKxxbzVCg+bt5dZL/cGPWeQtDXhdsRbBdKUABz8vtm
// SIG // 6gJqMI2zyIcVvyB7w1MEFm1RbqYH7zgV+Lowneuv5giq
// SIG // p0NQFWh8LlEqn20V86aBlFR2rkgOzwuRtVvFj0cWlYo0
// SIG // Kvr4bQ6c3cV3XG3AXxySGkjb2POhgheXMIIXkwYKKwYB
// SIG // BAGCNwMDATGCF4Mwghd/BgkqhkiG9w0BBwKgghdwMIIX
// SIG // bAIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgUinQo5+a2d5SPhxITgqw
// SIG // HOFJvPKDXDfOxpVNJQGTT5YCBmda14eaxBgTMjAyNDEy
// SIG // MzEwOTA4NTUuMzk2WjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOkEwMDAtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR7TCCByAwggUIoAMCAQICEzMAAAHr4BhstbbvOO0A
// SIG // AQAAAeswDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMxMjA2MTg0NTM0WhcN
// SIG // MjUwMzA1MTg0NTM0WjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OkEwMDAtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAwRVoIdpW4Fd3iadN
// SIG // aKomhQbmGzXO4UippLbydeTawfwwW6FKMPFjzkz8W5+4
// SIG // HJiDhpsCZHfk8hceyjp868Z6Ad4br7/dX2blLoCLCk5w
// SIG // L4NgVP53ze2c5/SpNZqbidu0usVAx+KHRYl+dSAnCpeh
// SIG // BuHMSoHAwIp4oU/Ma6CVlQEy+6fG2358LHNaYoWZnLyL
// SIG // mBp29U2PbZ6XQoVq/RAEbgqN04kRozNi6eKYk9pQ+YZ3
// SIG // d1Whk3qTasmpKZAhldPnCvFbvx5CGXb8vs+RC96I03RS
// SIG // y+byfSAKIFn91wLt3e0qRWmqHosdHtaueQA/eGcAz/os
// SIG // 6i2nbAUd7c46tkX6wjS/k5ov42pUbaPyem4eHz4RxE5w
// SIG // wu/E9cn11EHRrZif7rSPwDcYux1fIAD84nfU2IzD22Kh
// SIG // vMucc/oCP0hco/mirRx1pisxFz7bV8wHHsSdRB+8G7ol
// SIG // ZN7BKzyvTC4NV2+oTORyFgNIxAGYShMneYR9lzIm82pG
// SIG // 6drNhCUFmrEHOAzGhdRLENQs4ApQ2CGBuq1IbnXyO5PC
// SIG // /SighLn0WyuZXUWDQKnXa/8kiX7mb9z0t/r7Q+l+qtR+
// SIG // FDpowynY6Ft6rOyUTGZh/X5BZDM2+mEs6+nl9S6GJtz6
// SIG // ztSXmuN0mM5Qd08/ODr7lUlezXInVbTaomXllqVY32r0
// SIG // fiY/yTkCAwEAAaOCAUkwggFFMB0GA1UdDgQWBBR0ngWs
// SIG // 1lXMbuKk/TuY09gfqgHq4TAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // g3TfL6D3fAvlVmT9/lvO3P0G3W1itLDrfWeJBDlp4Oyp
// SIG // oflg9i5zyUySiBGsZ4jnLfcDICfMkMsEfFh4Azr28Kna
// SIG // rC1GjODa3q7SOhSPa4Y4XmisTTZwWcx2Sw8JZC/bwhA3
// SIG // vUXNHRklXeQYNwlpJ1d7r1WrteBeeREk1iATWkEvQqaN
// SIG // jqc93EYAGFX2ixRmwKzXEb0lr0lG3iNiA6kcQuMQW0Yj
// SIG // UPtah1wwj59IRrF3y/spw2Z3An7Mza5YGU9uF4Ib082D
// SIG // B3F4qC1WKP9h5MqMOnSO7lCyWysS1/MB4bIsK4lyAwp4
// SIG // y1bBtBOW0fNkIHLHhIcW1NndUVR3ELZFBO1vc8Wamev4
// SIG // z5mqI2YF0Dt9148Th2GFWvwV3CLrvEjMz44wAG7o8E2s
// SIG // KWsywb/fey0QdGTmzXJCWMkEKRE0n5Td+o1vs+0f5xsi
// SIG // akWdx7WdZV1tX+sxAgHj/vXcup5nAq1XDqm0B1+2a/Fj
// SIG // 3IIRyQAA5ZuRMT4ecYtbTUZPouhdmvUqU3kJ2Vz+dMPi
// SIG // aE8SEkKu7wYo9p4rQLEi2lXjKqD4vjV5U1DWdjXbWxa+
// SIG // iIq/WSvbn2s9xcX7w2aN+ubyzqM5kDnv2fqbuL2Ocz5r
// SIG // TYlSHEJxcuyWTomVQyOWyHcEEWotqrhyiepbVHbItx4z
// SIG // Z4nrhO9n0+HlocbZpzeR2AgwggdxMIIFWaADAgECAhMz
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
// SIG // ahC0HVUzWLOhcGbyoYIDUDCCAjgCAQEwgfmhgdGkgc4w
// SIG // gcsxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJTAjBgNVBAsTHE1p
// SIG // Y3Jvc29mdCBBbWVyaWNhIE9wZXJhdGlvbnMxJzAlBgNV
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjpBMDAwLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUAgAaJdbtcMMGI
// SIG // FLVKMDJ6mL27pd6ggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOsd
// SIG // uLUwIhgPMjAyNDEyMzEwMDI2MjlaGA8yMDI1MDEwMTAw
// SIG // MjYyOVowdzA9BgorBgEEAYRZCgQBMS8wLTAKAgUA6x24
// SIG // tQIBADAKAgEAAgIMAQIB/zAHAgEAAgITRDAKAgUA6x8K
// SIG // NQIBADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZ
// SIG // CgMCoAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqG
// SIG // SIb3DQEBCwUAA4IBAQCWvdXwdu3jy5b6DGrHh4NWdodR
// SIG // LIYu5tRsxB7I81zT8mgIHJx7Dq18UgFiKoRnL9kpACnM
// SIG // Z1EmtvdQgrACddaT80QcFXv0gfyzFFuP61cSuyVDDgya
// SIG // qhHiyPLBYVHwqQXpJyFIiQ8kb4dj66XieIQ5gqYUQIe4
// SIG // eshFAqWckkPQpCTY8C9+O0XnoCAitImk2odr/F+Xk0i5
// SIG // JuEMvUZP7UWzVnvMjeMzXJbgWZT2jn1NTVDSlKBohXoM
// SIG // rQsJbkmf4k28feDbB+eXxOEGQHmIRQ494zYFkCGI7PFC
// SIG // 14BYs0I8pJ8e0omD0hIygeZv8oWPWNu6ApzJLr+qWsLG
// SIG // k28PKYWJMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTACEzMAAAHr4BhstbbvOO0AAQAA
// SIG // AeswDQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJ
// SIG // AzENBgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQg
// SIG // KKdLaFM9BcZrdWeScpL/78ubQL4VbRbGKHIC+vfHIHIw
// SIG // gfoGCyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCDOt2u+
// SIG // X2kD4X/EgQ07ZNg0lICG3Ys17M++odSXYSws+DCBmDCB
// SIG // gKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMT
// SIG // HU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMz
// SIG // AAAB6+AYbLW27zjtAAEAAAHrMCIEILB3hn1W+eJQSgy4
// SIG // rBE89IdSO6hCDbgmbAzqHGYaiZLQMA0GCSqGSIb3DQEB
// SIG // CwUABIICAK4YVW2ixRgbx88wEGrwfS1v5ffpucsvVy19
// SIG // h5w4OCyawDX1dLwt586aeEV4tVhYbrk5JnDNgg5DKNw3
// SIG // 2EsYpnGYR2NkdB8AsFKfwt7a77NczWbGAuoh18olv9am
// SIG // 2fImnV3G0YjMLFS5SGUlYlaoUEV0SRljQb0DCjzilaP3
// SIG // btI84//K71S0lNorgklL0RKGCsx7GFGVXk9e8VJ8ZQWN
// SIG // 2pQjurwpH9qk4v8MoGkm8lir+1DpLdSi/nbEsf70XoHi
// SIG // HRASX3C3n8g8d38vd2b0OeTpSueNmmhwevgGj35b/0g7
// SIG // NMxShx7QtELTFBmvkoweDMKA0RWXVb7Od+L2dYor8ViO
// SIG // lHDTaQk3YKc6UvyY8Q/AkocyLKWji0iC+MCJ1+INtP7F
// SIG // qfxcxfJUdF1GfY5yM4fkLKGzB/Rot0EHN8HqeKuVRsWc
// SIG // wFCmPNLh1PFz7CsM1W7D5UhAmGWlehLSBTgTIJowCwUG
// SIG // 9cusNDyy5kOwSn6XdIasG3MlJIaddlaRGr4J0HHDi50x
// SIG // nxsgUYskssrjfraCr/ZwduqdR2jgLL4lr5X/sav6vzCG
// SIG // AdCqQPUlOQndLb4jnYjU0s8i59HjNjvkeBEJH7qrl66F
// SIG // xcgR5BMCz7MAu/pzwcLJ34Jcz+tEkOqVsItITbT6glJi
// SIG // LcQCnY8KPK80NVeP/qddPF+pJsmTwvAG
// SIG // End signature block
