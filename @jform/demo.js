/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "5a762d7fffac8e4ea039";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "@jform/" + chunkId + ".demo.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../core/dist/core.esm.js":
/*!********************************!*\
  !*** ../core/dist/core.esm.js ***!
  \********************************/
/*! exports provided: default, JFormContext, applyDefaults, canonizationRules, canonizeDefaults, computeInitials, extractSchemaFromProps, getDefaultTemplate, getDefaultWidgets, getDefaults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JFormContext", function() { return JFormContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyDefaults", function() { return applyDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canonizationRules", function() { return canonizationRules; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canonizeDefaults", function() { return canonizeDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeInitials", function() { return computeInitials; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractSchemaFromProps", function() { return extractSchemaFromProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultTemplate", function() { return getDefaultTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultWidgets", function() { return getDefaultWidgets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaults", function() { return getDefaults; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jform_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jform/utils */ "../utils/dist/utils.esm.js");
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash-es */ "../core/node_modules/lodash-es/lodash.js");
/* harmony import */ var react_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-grid */ "../core/node_modules/react-grid/dist/index.esm.js");





function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return typeof key === "symbol" ? key : String(key);
}

const StringField = props => {
  const {
    schema,
    configSchema = {},
    data,
    required,
    disabled,
    autofocus,
    errors,
    widget: Widget,
    onBlur,
    onFocus,
    onChange,
    events
  } = props;
  let options = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["getOptions"])(schema, configSchema);
  const {
    examples
  } = schema;
  const {
    placeholder,
    disabledOptions,
    className,
    id,
    style,
    theme,
    widget
  } = configSchema;
  const widgetProps = {
    options,
    disabledOptions,
    autofocus,
    schema,
    configSchema,
    disabled,
    value: data,
    required,
    onChange,
    onBlur,
    onFocus,
    errors,
    placeholder,
    className,
    id,
    style,
    events,
    examples,
    theme,
    widget
  };
  return (
    /*#__PURE__*/
    //@ts-ignore
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Widget, Object.assign({}, widgetProps))
  );
};

const getBooleanOptions = (schema, configSchema) => {
  if (Array.isArray(schema.oneOf)) {
    return Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["getOptions"])({
      oneOf: schema.oneOf.map(option => _objectSpread2(_objectSpread2({}, option), {}, {
        title: option.title || (option.const === true ? "Yes" : "No")
      }))
    });
  } else {
    return Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["getOptions"])({
      enum: schema.enum || [true, false]
    }, {
      enumNames: (configSchema == null ? void 0 : configSchema.enumNames) || (schema.enum && schema.enum[0] === false ? ["No", "Yes"] : ["Yes", "No"])
    });
  }
};

const BooleanField = props => {
  const {
    schema,
    configSchema = {},
    data,
    disabled,
    autofocus,
    errors,
    widget: Widget,
    onBlur,
    onFocus,
    onChange,
    events
  } = props;
  let options = getBooleanOptions(schema, configSchema);
  const {
    examples
  } = schema;
  const {
    placeholder,
    className,
    id,
    style,
    theme,
    widget
  } = configSchema;
  const widgetProps = {
    options,
    autofocus,
    schema,
    required: Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["schemaRequiresTrueValue"])(schema),
    configSchema,
    disabled,
    value: data,
    onChange,
    onBlur,
    onFocus,
    errors,
    placeholder,
    className,
    id,
    style,
    events,
    examples,
    theme,
    widget
  };
  return (
    /*#__PURE__*/
    //@ts-ignore
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Widget, Object.assign({}, widgetProps))
  );
};

const orderProperties = (properties, order) => {
  if (!Array.isArray(order)) {
    return properties;
  }

  const arrayToHash = arr => arr.reduce((prev, curr) => {
    prev[curr] = true;
    return prev;
  }, {});

  const errorPropList = arr => arr.length > 1 ? `properties '${arr.join("', '")}'` : `property '${arr[0]}'`;

  const propertyHash = arrayToHash(properties);
  const orderFiltered = order.filter(prop => prop === "*" || propertyHash[prop]);
  const orderHash = arrayToHash(orderFiltered);
  const rest = properties.filter(prop => !orderHash[prop]);
  const restIndex = orderFiltered.indexOf("*");

  if (restIndex === -1) {
    if (rest.length) {
      throw new Error(`configSchema order list does not contain ${errorPropList(rest)}`);
    }

    return orderFiltered;
  }

  if (restIndex !== orderFiltered.lastIndexOf("*")) {
    throw new Error("configSchema order list contains more than one wildcard item");
  }

  const complete = [...orderFiltered];
  complete.splice(restIndex, 1, ...rest);
  return complete;
};

const isRequired = (schema, name) => {
  return Array.isArray(schema.required) && schema.required.indexOf(name) !== -1;
};

const onPropertyChanged = (name, data, onChange) => {
  return value => {
    let newData;

    if (Object(lodash_es__WEBPACK_IMPORTED_MODULE_2__["isObject"])(data)) {
      newData = _objectSpread2(_objectSpread2({}, data), {}, {
        [name]: value
      });
    } else {
      newData = {
        [name]: value
      };
    }

    onChange(newData);
  };
};

const ObjectField = props => {
  const {
    data,
    schema,
    configSchema,
    eventSchema,
    readSchema,
    onBlur,
    onFocus,
    onChange,
    widget: Widget,
    required,
    disabled,
    autofocus,
    errors,
    events
  } = props;
  let propertiesList = orderProperties(Object.keys(schema.properties || {}), configSchema == null ? void 0 : configSchema.order);
  let properties = {};

  if (propertiesList.length > 0) {
    properties = propertiesList.map(name => {
      var _schema$properties;

      const _schema = schema == null ? void 0 : (_schema$properties = schema.properties) == null ? void 0 : _schema$properties[name]; //@ts-ignore


      const additional = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["isAdditional"])(_schema);
      return {
        [name]: {
          onChange: onPropertyChanged(name, data, onChange),
          onBlur,
          onFocus,
          schema: _schema,
          configSchema: Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["mergeSchemas"])({}, (configSchema == null ? void 0 : configSchema.additionalProperties) || {}, configSchema == null ? void 0 : configSchema[`$${name}`]),
          eventSchema: Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["mergeSchemas"])({}, (eventSchema == null ? void 0 : eventSchema.additionalProperties) || {}, eventSchema == null ? void 0 : eventSchema[`$${name}`]),
          readSchema: Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["mergeSchemas"])({}, (readSchema == null ? void 0 : readSchema.additionalProperties) || {}, readSchema == null ? void 0 : readSchema[`$${name}`]),
          required: isRequired(schema, name),
          value: data[name],
          isAdditional: additional
        }
      };
    }).reduce((a, b) => _objectSpread2(_objectSpread2({}, a), b));
  }

  const {
    className,
    id,
    style,
    theme,
    widget
  } = configSchema || {};
  const widgetProps = {
    properties,
    className,
    id,
    style,
    required,
    disabled,
    schema,
    autofocus,
    errors,
    events,
    value: data,
    theme,
    widget,
    onChange,
    onBlur,
    onFocus
  }; //@ts-ignore

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Widget, Object.assign({}, widgetProps));
};

const types = {
  string: StringField,
  number: () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null),
  integer: () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null),
  boolean: BooleanField,
  object: ObjectField,
  array: () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null),
  null: () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null)
};

const _excluded = ["onChange", "onBlur", "onFocus"];

const canonizeFieldItemProps = (item, standard) => {
  if (item === undefined) {
    return {
      text: standard
    };
  }

  return _objectSpread2(_objectSpread2({}, item), {}, {
    text: item.text || standard
  });
};

const canonizeErrorFieldProps = (item, standard) => {
  let errors = [];

  if (standard !== undefined) {
    errors.push(...standard);
  }

  if (item === undefined) {
    return {
      text: errors
    };
  } else {
    if (item.text === undefined) {
      return _objectSpread2(_objectSpread2({}, item), {}, {
        text: [...errors]
      });
    } else if (Array.isArray(item.text)) {
      return _objectSpread2(_objectSpread2({}, item), {}, {
        text: [...errors, ...item.text]
      });
    } else {
      // @ts-ignore
      return _objectSpread2(_objectSpread2({}, item), {}, {
        text: () => item.text(errors)
      });
    }
  }
};

function getTypeTemplate(type, configSchema) {
  if ((configSchema == null ? void 0 : configSchema.field) !== undefined) {
    return configSchema.field;
  } // // If the type is not defined and the schema uses 'anyOf' or 'oneOf', don't
  // // render a field and let the MultiSchemaField component handle the form display
  // if (!componentName && (schema.anyOf || schema.oneOf)) {
  //     return () => null;
  // }


  if (type === undefined) {
    throw new Error(`unknown type ${type}. Supported: ${Object.keys(types).join(",")}`);
  } //@ts-ignore


  return types[type];
}

function getFieldTemplate(type, configSchema, template) {
  var _configSchema$layout, _configSchema$layout2;

  if (typeof (configSchema == null ? void 0 : configSchema.layout) !== "function" && configSchema != null && (_configSchema$layout = configSchema.layout) != null && _configSchema$layout.template && typeof ((_configSchema$layout2 = configSchema.layout) == null ? void 0 : _configSchema$layout2.template) === 'function') {
    var _configSchema$layout3;

    return (_configSchema$layout3 = configSchema.layout) == null ? void 0 : _configSchema$layout3.template;
  } else {
    var _template$type, _template$type$type;

    if ((template == null ? void 0 : (_template$type = template.type) == null ? void 0 : (_template$type$type = _template$type[type]) == null ? void 0 : _template$type$type.layout) !== undefined) {
      var _template$type2, _template$type2$type;

      return template == null ? void 0 : (_template$type2 = template.type) == null ? void 0 : (_template$type2$type = _template$type2[type]) == null ? void 0 : _template$type2$type.layout;
    }

    return template.common.field.layout;
  }
}

const processValue = (value, empty) => {
  if (value === "") {
    return empty;
  } else {
    return value;
  }
};

const wrapEvent = (event, userHandler) => {
  if (userHandler) {
    return value => {
      userHandler(value);
      event(value);
    };
  } else {
    return val => event(val);
  }
};

const wrapNoArgEvent = (event, userHandler) => {
  if (userHandler) {
    return () => {
      userHandler();
      event();
    };
  } else {
    return () => event();
  }
};

var Schema = (props => {
  var _configSchema$widget;

  const {
    schema,
    data,
    configSchema,
    eventSchema,
    errors,
    required,
    onBlur,
    onFocus,
    onChange,
    name,
    children
  } = props;

  let _Object$keys$filter$r = Object.keys(eventSchema || {}).filter(key => !key.startsWith("$")).reduce((obj, key) => {
    //@ts-ignore
    obj[key] = eventSchema[key];
    return obj;
  }, {}),
      {
    onChange: onChangeEvent,
    onBlur: onBlurEvent,
    onFocus: onFocusEvent
  } = _Object$keys$filter$r,
      events = _objectWithoutProperties(_Object$keys$filter$r, _excluded);

  const type = schema.type;

  const _onChange = wrapEvent(x => onChange(processValue(x, configSchema == null ? void 0 : configSchema.empty)), onChangeEvent);

  const _onBlur = wrapNoArgEvent(onBlur, onBlurEvent);

  const _onFocus = wrapNoArgEvent(onFocus, onFocusEvent);

  const {
    template,
    widgets,
    defaults
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(JFormContext);
  const titleProps = canonizeFieldItemProps(configSchema == null ? void 0 : configSchema.title, schema.title);

  if (titleProps != null && titleProps.required) {
    var _titleProps$required;

    titleProps.required.display = required || (titleProps == null ? void 0 : (_titleProps$required = titleProps.required) == null ? void 0 : _titleProps$required.display) || false;
  }

  titleProps.text = (titleProps == null ? void 0 : titleProps.text) || (titleProps == null ? void 0 : titleProps.useName) && name || undefined;
  const descProps = canonizeFieldItemProps(configSchema == null ? void 0 : configSchema.description, schema.description);
  const helpProps = canonizeFieldItemProps(configSchema == null ? void 0 : configSchema.help);
  const errorProps = canonizeErrorFieldProps(configSchema == null ? void 0 : configSchema.error, errors);
  const computedSchema = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["retrieveSchema"])(schema, schema, data), [schema, data]);
  const FieldTemplate = getFieldTemplate(type, configSchema, template);
  const TypeTemplate = getTypeTemplate(type, configSchema);
  let widget = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["getWidget"])(type, configSchema == null ? void 0 : (_configSchema$widget = configSchema.widget) == null ? void 0 : _configSchema$widget.type, widgets, defaults);
  const layout = (configSchema == null ? void 0 : configSchema.layout) || {};
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FieldTemplate, {
    title: titleProps,
    description: descProps,
    help: helpProps,
    hidden: configSchema == null ? void 0 : configSchema.hidden,
    errors: errorProps,
    configSchema: configSchema,
    name: name,
    className: layout.className,
    errorClassName: layout.errorClassName,
    rootClassName: layout.rootClassName,
    style: layout.style,
    id: layout.id,
    tag: layout.tag,
    render: layout.render,
    type: type
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TypeTemplate, {
    widget: widget,
    schema: computedSchema,
    configSchema: configSchema,
    autofocus: !!(configSchema != null && configSchema.autofocus),
    disabled: !!(configSchema != null && configSchema.disabled || schema.readOnly),
    data: data,
    required: !!required,
    eventSchema: eventSchema,
    errors: errorProps,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    //@ts-ignore
    events: events,
    name: name
  }), children);
});

const _excluded$1 = ["template"];

const computeItem = (cfg, props, name) => {
  switch (typeof cfg) {
    case "function":
      return cfg(props);

    case "object":
      if (Object(lodash_es__WEBPACK_IMPORTED_MODULE_2__["isArray"])(cfg)) {
        return cfg;
      } else {
        //@ts-ignore
        return computeDynamicConfigurable(cfg, props[name]);
      }

    default:
      return cfg;
  }
};

const computeDynamicConfigurable = (dyna, props) => {
  if (dyna === null) {
    return null;
  }

  return Object.entries(dyna).map(([_name, cfg]) => ({
    [_name]: computeItem(cfg, props, _name)
  })).reduce((a, b) => _objectSpread2(_objectSpread2({}, a), b));
};

const getFieldItemHandler = (item, _def, type) => {
  const {
    template
  } = item,
        otherProps = _objectWithoutProperties(item, _excluded$1);

  if (template) {
    return props => template(_objectSpread2(_objectSpread2({}, props), otherProps));
  } else {
    const def = type || _def;
    return props => {
      let merged = _objectSpread2(_objectSpread2({}, props), otherProps);

      let mergedItem = computeDynamicConfigurable(item, merged);
      return def(_objectSpread2(_objectSpread2({}, merged), mergedItem));
    };
  }
};

const defaultLayoutStyles = () => ({
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  },
  containerMaxWidths: {
    sm: 540,
    md: 720,
    lg: 960,
    xl: 1140
  },
  columns: 12,
  gutterWidth: 0
});
const defaultLayout = (properties, config = {
  md: 12
}) => Object.keys(properties).map(x => ({
  [x]: _objectSpread2({}, config)
}));
var layout = (props => {
  var _errors$text;

  const {
    title,
    description,
    help,
    errors,
    hidden,
    children,
    name,
    type,
    className = "",
    errorClassName = "",
    rootClassName = "",
    style,
    id,
    tag: Tag = "div",
    render
  } = props;
  const {
    template
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(JFormContext);
  const TitleField = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _template$type, _template$type$type;

    return getFieldItemHandler(title, template.common.field.title, template == null ? void 0 : (_template$type = template.type) == null ? void 0 : (_template$type$type = _template$type[type]) == null ? void 0 : _template$type$type.title);
  }, [title]);
  const DescriptionField = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _template$type2, _template$type2$type;

    return getFieldItemHandler(description, template.common.field.description, template == null ? void 0 : (_template$type2 = template.type) == null ? void 0 : (_template$type2$type = _template$type2[type]) == null ? void 0 : _template$type2$type.description);
  }, [description]);
  const HelpField = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _template$type3, _template$type3$type;

    return getFieldItemHandler(help, template.common.field.help, template == null ? void 0 : (_template$type3 = template.type) == null ? void 0 : (_template$type3$type = _template$type3[type]) == null ? void 0 : _template$type3$type.help);
  }, [help]);
  const ErrorsField = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _template$type4, _template$type4$type;

    return getFieldItemHandler(errors, template.common.field.error, template == null ? void 0 : (_template$type4 = template.type) == null ? void 0 : (_template$type4$type = _template$type4[type]) == null ? void 0 : _template$type4$type.error);
  }, [errors]);

  if ((hidden == null ? void 0 : hidden.enable) === true) {
    const {
      className = "",
      id,
      style
    } = hidden;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: className,
      id: id,
      style: style
    });
  }

  let errorClass = ""; //@ts-ignore

  if ((errors == null ? void 0 : errors.display) !== false && (errors == null ? void 0 : (_errors$text = errors.text) == null ? void 0 : _errors$text.length) > 0) {
    errorClass = errorClassName;
  }

  const rowElements = {
    title: title.display !== false && (() => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TitleField, {
      key: "title",
      name: name
    })),
    description: description.display !== false && (() => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DescriptionField, {
      key: "description"
    })),
    errors: errors.display !== false && (() => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ErrorsField, {
      key: "errors"
    })),
    help: help.display !== false && (() => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(HelpField, {
      key: "help"
    })),
    children: () => children
  };

  let _render;

  if (typeof render === "function") {
    _render = render({
      Title: rowElements.title || (() => null),
      Description: rowElements.description || (() => null),
      children: rowElements.children() || (() => null),
      Errors: rowElements.errors || (() => null),
      Help: rowElements.help || (() => null)
    });
  } else {
    _render = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["renderLayout"])(render || defaultLayout(rowElements), (name, rowProps) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_grid__WEBPACK_IMPORTED_MODULE_3__["Col"], Object.assign({
      styles: defaultLayoutStyles()
    }, rowProps, {
      key: name || "root"
    }), rowElements[name] && rowElements[name]()), (children, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_grid__WEBPACK_IMPORTED_MODULE_3__["Row"], {
      styles: defaultLayoutStyles(),
      key: index
    }, children));
  }

  return (
    /*#__PURE__*/
    //@ts-ignore
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, {
      className: `${[name ? undefined : rootClassName, className, errorClass].filter(x => x && x.length > 0).join(" ")}`,
      style: style,
      id: id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_grid__WEBPACK_IMPORTED_MODULE_3__["Container"], {
      styles: defaultLayoutStyles()
    }, _render))
  );
});

var title = (props => {
  const {
    text,
    required = {},
    id,
    className = "",
    style,
    tag: Tag = "label"
  } = props;

  if (text == null) {
    return null;
  }

  const RequiredTag = (required == null ? void 0 : required.tag) || "span";
  return (
    /*#__PURE__*/
    //@ts-ignore
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, {
      style: style,
      className: className,
      id: id
    }, text, required.display === true && required.text &&
    /*#__PURE__*/
    //@ts-ignore
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RequiredTag, {
      className: required.className,
      style: required.style,
      id: required.id
    }, required.text))
  );
});

var help = (props => {
  const {
    text,
    id,
    className = "",
    style,
    tag: Tag = "div"
  } = props;

  if (!text) {
    return null;
  }

  return (
    /*#__PURE__*/
    //@ts-ignore
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, {
      style: style,
      className: className,
      id: id
    }, text)
  );
});

var description = (props => {
  const {
    text,
    id,
    className = "",
    style,
    tag: Tag = "div"
  } = props;

  if (!text) {
    return null;
  }

  return (
    /*#__PURE__*/
    //@ts-ignore
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, {
      style: style,
      className: className,
      id: id
    }, text)
  );
});

var error = (props => {
  const {
    text = [],
    id,
    className = "",
    style,
    errorClassName = "",
    tag: Tag = "ul"
  } = props;

  if (text.length === 0) {
    return null;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tag, {
    id: id,
    style: style,
    className: className
  }, text.filter(elem => !!elem).map((error, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: errorClassName,
      key: index
    }, error);
  })));
});

const defaultTemplate = {
  common: {
    field: {
      layout: layout,
      title: title,
      description: description,
      help: help,
      error: error,
      state: {
        view: ({
          children
        }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, children),
        loading: ({
          children
        }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, children)
      }
    },
    actions: ({
      children
    }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, children),
    button: ({
      children
    }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, children),
    error: ({
      children
    }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, children),
    tip: ({
      children
    }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, children)
  }
};
var getDefaultTemplate = (() => Object(lodash_es__WEBPACK_IMPORTED_MODULE_2__["cloneDeep"])(defaultTemplate));

function TextWidget(props) {
  const {
    autofocus,
    disabled,
    onChange,
    onFocus,
    onBlur,
    value,
    id,
    style,
    className,
    placeholder,
    examples,
    schema,
    required
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    className: className,
    id: id,
    style: style,
    disabled: disabled,
    autoFocus: autofocus,
    required: required,
    value: value == null ? "" : value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value),
    onBlur: () => onBlur(),
    onFocus: () => onFocus()
  }), examples ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("datalist", null, [...new Set(examples.concat(schema.default ? [schema.default] : []))].map(example => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    key: example,
    value: example
  }))) : null);
}

const processValue$1 = (schema, value) => {
  var _schema$enum;

  const {
    type
  } = schema;

  if (value === "" && (schema == null ? void 0 : (_schema$enum = schema.enum) == null ? void 0 : _schema$enum.indexOf("")) === -1) {
    return null;
  }

  if (type === "boolean") {
    return value === "true";
  }

  return value;
};

function SelectWidget(props) {
  const {
    options,
    disabledOptions,
    value,
    required,
    disabled,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    placeholder,
    className,
    id,
    style,
    schema,
    configSchema
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    id: id,
    style: style,
    className: className,
    value: value || (configSchema == null ? void 0 : configSchema.empty),
    required: required,
    disabled: disabled,
    autoFocus: autofocus,
    onBlur: () => onBlur(),
    onFocus: () => onFocus(),
    onChange: e => onChange(processValue$1(schema, e.target.value))
  }, schema.default === undefined && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: ""
  }, placeholder), options == null ? void 0 : options.map(({
    value,
    label
  }, i) => {
    const disabled = disabledOptions && disabledOptions.indexOf(value) != -1;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: i,
      value: value,
      disabled: disabled
    }, label);
  }));
}

function CheckboxWidget(props) {
  const {
    value,
    disabled,
    autofocus,
    onBlur,
    onFocus,
    onChange,
    className,
    id,
    style,
    required
  } = props;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    id: id,
    className: className,
    style: style,
    checked: value === undefined ? false : value,
    required: required,
    disabled: disabled,
    autoFocus: autofocus,
    onChange: event => onChange(event.target.checked),
    onBlur: () => onBlur(),
    onFocus: () => onFocus()
  });
}

const _excluded$2 = ["optional", "render"];

const handleRemoveKey = (handler, name, data, onChange) => {
  return () => {
    const result = handler({
      name,
      data,
      removeKey: () => {
        //@ts-ignore
        const result = _objectWithoutProperties(data, [name].map(_toPropertyKey));

        return result;
      }
    });
    onChange(result);
  };
};

const handleAddKey = (handler, data, onChange) => {
  return () => {
    const item = handler();
    onChange(_objectSpread2(_objectSpread2({}, data), item));
  };
};

const GridWidget = props => {
  const {
    autofocus,
    disabled,
    properties = {},
    className,
    required,
    id,
    style,
    widget,
    events,
    schema,
    value: data,
    onChange: onChangeObject
  } = props;
  const {
    itemClassName,
    itemStyle,
    additionalItemClassName,
    actionsClassName,
    actionClassName,
    addKeyButton,
    removeKeyButton,
    layout = defaultLayout(properties)
  } = widget;
  const {
    onAddKey,
    onRemoveKey
  } = events;

  let _layout;

  if (Object(lodash_es__WEBPACK_IMPORTED_MODULE_2__["isArray"])(layout)) {
    _layout = layout;
  } else {
    _layout = defaultLayout(properties, layout);
  } //@ts-ignore


  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_grid__WEBPACK_IMPORTED_MODULE_3__["Container"], {
    styles: defaultLayoutStyles(),
    autoFocus: autofocus,
    required: required,
    disabled: disabled,
    className: className,
    id: id,
    style: style
  }, Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["renderLayout"])(_layout, (name, rowProps) => {
    const {
      optional,
      render
    } = rowProps,
          other = _objectWithoutProperties(rowProps, _excluded$2);

    let _style = itemStyle || {}; //@ts-ignore


    const isFilled = fieldName => !!(data[fieldName] && data[fieldName].length); //@ts-ignore


    const isTrue = fieldName => data[fieldName];

    const optionalApi = {
      isFilled,
      isTrue
    };

    if (optional && !optional(_objectSpread2({
      data
    }, optionalApi))) {
      _style = {
        display: 'none'
      };
    }

    if (render) {
      const UIComponent = render;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_grid__WEBPACK_IMPORTED_MODULE_3__["Col"], Object.assign({}, other, {
        key: name,
        style: _style
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UIComponent
      /*
      @ts-ignore */
      , Object.assign({
        /*
        @ts-ignore */
        data: data,
        key: name,
        name: name,
        required: required,
        schema: schema,
        configSchema: props.configSchema
      }, (properties == null ? void 0 : properties[name]) || {})));
    } else if (properties[name]) {
      const {
        onChange,
        onBlur,
        onFocus,
        value,
        schema,
        required,
        configSchema,
        eventSchema,
        readSchema,
        isAdditional
      } = properties[name];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_grid__WEBPACK_IMPORTED_MODULE_3__["Col"], Object.assign({
        styles: defaultLayoutStyles()
      }, other, {
        key: name,
        style: _style || {},
        className: [itemClassName, isAdditional && additionalItemClassName].filter(x => x && x.length > 0).join(" ")
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Schema, {
        key: name,
        name: name,
        required: required,
        schema: schema || {},
        configSchema: configSchema || {},
        eventSchema: eventSchema || {},
        readSchema: readSchema || {},
        data: value,
        onChange: onChange,
        onBlur: onBlur,
        onFocus: onFocus
      }, isAdditional && onRemoveKey && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: removeKeyButton,
        onClick: handleRemoveKey(onRemoveKey, name, data, onChangeObject)
      }, "Delete")));
    } else {
      return null;
    }
  }, (children, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_grid__WEBPACK_IMPORTED_MODULE_3__["Row"], {
      styles: defaultLayoutStyles(),
      key: index
    }, children);
  }), Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["canExpand"])(schema, data, onAddKey) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: actionsClassName
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: actionClassName
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: addKeyButton,
    onClick: handleAddKey(onAddKey, data, onChangeObject)
  }, "Add"))));
};

const defaultWidgets = {
  string: {
    text: TextWidget,
    select: SelectWidget
  },
  number: {},
  integer: {},
  boolean: {
    checkbox: CheckboxWidget,
    select: SelectWidget
  },
  object: {
    grid: GridWidget
  },
  array: {},
  null: {}
};
var getDefaultWidgets = (() => Object(lodash_es__WEBPACK_IMPORTED_MODULE_2__["cloneDeep"])(defaultWidgets));

const strOrFunc = arg => {
  return typeof arg === "string" || typeof arg === "function";
};

const arrayOrFunc = arg => {
  return Array.isArray(arg) || typeof arg === "function";
};

const canonizationRules = [({
  configSchema
}) => strOrFunc(configSchema == null ? void 0 : configSchema.widget) ? {
  configSchema: {
    widget: {
      type: configSchema == null ? void 0 : configSchema.widget
    }
  }
} : undefined, ({
  configSchema
}) => strOrFunc(configSchema == null ? void 0 : configSchema.help) ? {
  configSchema: {
    help: {
      text: configSchema == null ? void 0 : configSchema.help
    }
  }
} : undefined, ({
  configSchema
}) => strOrFunc(configSchema == null ? void 0 : configSchema.description) ? {
  configSchema: {
    description: {
      text: configSchema == null ? void 0 : configSchema.description
    }
  }
} : undefined, ({
  configSchema
}) => strOrFunc(configSchema == null ? void 0 : configSchema.title) ? {
  configSchema: {
    title: {
      text: configSchema == null ? void 0 : configSchema.title
    }
  }
} : undefined, ({
  configSchema
}) => arrayOrFunc(configSchema == null ? void 0 : configSchema.error) ? {
  configSchema: {
    error: {
      text: configSchema == null ? void 0 : configSchema.error
    }
  }
} : undefined, ({
  configSchema
}) => strOrFunc(configSchema == null ? void 0 : configSchema.layout) ? {
  configSchema: {
    layout: {
      template: configSchema == null ? void 0 : configSchema.layout
    }
  }
} : undefined, ({
  configSchema
}) => (configSchema == null ? void 0 : configSchema.hidden) === true ? {
  configSchema: {
    hidden: {
      enable: true
    }
  }
} : undefined];

const defaults = {
  common: {
    configSchema: {
      title: {
        className: "jform-title",
        required: {
          className: "jform-label-required",
          text: "*"
        }
      },
      description: {
        className: "jform-description"
      },
      error: {
        className: "jform-errors",
        errorClassName: "jform-error"
      },
      help: {
        className: "jform-help"
      },
      layout: {
        className: "jform-field-layout",
        rootClassName: "jform-field-layout-root",
        errorClassName: "error-field",
        render: [{
          title: {},
          children: {}
        }, {
          description: {}
        }, {
          help: {}
        }, {
          errors: {}
        }]
      },
      hidden: {
        className: "jform-hidden"
      },
      className: "form-field"
    }
  },
  type: {
    string: {
      configSchema: {
        widget: "text",
        layout: {
          className: "string-field"
        }
      }
    },
    boolean: {
      configSchema: {
        widget: "checkbox",
        layout: {
          className: "boolean-field"
        }
      }
    },
    object: {
      configSchema: {
        widget: "grid",
        title: {
          tag: "legend"
        },
        layout: {
          className: "object-field"
        }
      }
    }
  },
  widget: {
    string: {
      text: {
        configSchema: {
          className: "text-widget"
        }
      },
      select: {
        configSchema: {
          className: "select-widget"
        }
      }
    },
    boolean: {
      checkbox: {
        configSchema: {
          className: "checkbox-widget",
          layout: {
            render: ({
              Title,
              Description,
              children,
              Errors,
              Help
            }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Description, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, children, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Title, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Errors, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Help, null))
          }
        }
      }
    },
    object: {
      grid: {
        configSchema: {
          className: "grid-widget",
          widget: {
            type: "grid",
            itemClassName: "grid-item",
            additionalItemClassName: "additional-item",
            actionsClassName: "actions-item",
            actionClassName: "action-item",
            addKeyButton: "add-key-button",
            removeKeyButton: "remove-key-button",
            layout: {
              md: 12
            }
          },
          layout: {
            tag: "fieldset",
            render: [{
              title: {}
            }, {
              description: {}
            }, {
              children: {}
            }]
          }
        }
      }
    }
  },
  rules: [({
    configSchema
  }) => configSchema != null && configSchema.enumNames ? {
    configSchema: {
      widget: "select"
    }
  } : undefined, ({
    schema
  }) => schema != null && schema.enum ? {
    configSchema: {
      widget: "select"
    }
  } : undefined]
};
const defaultRules = [({
  schema
}) => schema !== true && !(schema != null && schema.type) ? {
  schema: {
    type: Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["getSchemaType"])(schema || {})
  }
} : undefined];
var getDefaults = (() => Object(lodash_es__WEBPACK_IMPORTED_MODULE_2__["cloneDeep"])(defaults));

const _excluded$3 = ["schema"],
      _excluded2 = ["schema", "configSchema"],
      _excluded3 = ["schema"],
      _excluded4 = ["schema"];

const _applyDefaults = (_schema, defaults) => {
  let _cloneDeep = Object(lodash_es__WEBPACK_IMPORTED_MODULE_2__["cloneDeep"])(_schema),
      {
    schema
  } = _cloneDeep,
      additional = _objectWithoutProperties(_cloneDeep, _excluded$3);

  schema = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["resolveReference"])(schema, schema);
  const rules = [...((defaults == null ? void 0 : defaults.rules) || []), ...(defaultRules || []), ...canonizationRules]; // @ts-ignore

  schema = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["traverse"])(schema, additional, (schema, other) => {
    return rules.map(x => x(_objectSpread2({
      schema
    }, other))).reduce((a, b) => Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["mergeSchemas"])(a, b));
  }); //@ts-ignore

  schema = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["traverse"])(schema, additional, (schema, other) => {
    var _defaults$type;

    let type = schema.type;
    let mergeCases = {
      defined: _objectSpread2({
        schema
      }, other),
      common: defaults.common
    };

    if (defaults != null && (_defaults$type = defaults.type) != null && _defaults$type[type]) {
      var _other, _other$configSchema, _other$configSchema$w, _configSchema$widget, _defaults$widget, _defaults$widget$type;

      const _ref = defaults.type[type] || {},
            {
        schema: mergeSchema,
        configSchema
      } = _ref,
            mergeOther = _objectWithoutProperties(_ref, _excluded2);

      mergeCases.type = _objectSpread2({
        schema: mergeSchema,
        configSchema
      }, mergeOther); //@ts-ignore

      const futureWidget = ((_other = other) == null ? void 0 : (_other$configSchema = _other.configSchema) == null ? void 0 : (_other$configSchema$w = _other$configSchema.widget) == null ? void 0 : _other$configSchema$w.type) || (configSchema == null ? void 0 : (_configSchema$widget = configSchema.widget) == null ? void 0 : _configSchema$widget.type);

      if (typeof futureWidget === 'string' && defaults != null && (_defaults$widget = defaults.widget) != null && (_defaults$widget$type = _defaults$widget[type]) != null && _defaults$widget$type[futureWidget]) {
        var _defaults$widget2, _defaults$widget2$typ;

        const _ref2 = (defaults == null ? void 0 : (_defaults$widget2 = defaults.widget) == null ? void 0 : (_defaults$widget2$typ = _defaults$widget2[type]) == null ? void 0 : _defaults$widget2$typ[futureWidget]) || {},
              {
          schema: mergeSchema
        } = _ref2,
              mergeOther = _objectWithoutProperties(_ref2, _excluded3);

        mergeCases.widget = _objectSpread2({
          schema: mergeSchema
        }, mergeOther);
      }
    } //for const schema not merge schema


    const isTruthSchema = schema === true;

    if (schema.const || isTruthSchema) {
      var _mergeCases$common, _mergeCases$type, _mergeCases$widget;

      if (mergeCases != null && (_mergeCases$common = mergeCases.common) != null && _mergeCases$common.schema) {
        mergeCases.common.schema = undefined;
      }

      if (mergeCases != null && (_mergeCases$type = mergeCases.type) != null && _mergeCases$type.schema) {
        mergeCases.type.schema = undefined;
      }

      if (mergeCases != null && (_mergeCases$widget = mergeCases.widget) != null && _mergeCases$widget.schema) {
        mergeCases.widget.schema = undefined;
      }
    }

    var _Object$keys$map$redu = Object.keys(mergeCases.defined).map(x => {
      var _mergeCases$common2, _mergeCases$type2, _mergeCases$widget2, _mergeCases$defined;

      return {
        [x]: Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["mergeSchemas"])({}, mergeCases == null ? void 0 : (_mergeCases$common2 = mergeCases.common) == null ? void 0 : _mergeCases$common2[x], mergeCases == null ? void 0 : (_mergeCases$type2 = mergeCases.type) == null ? void 0 : _mergeCases$type2[x], mergeCases == null ? void 0 : (_mergeCases$widget2 = mergeCases.widget) == null ? void 0 : _mergeCases$widget2[x], mergeCases == null ? void 0 : (_mergeCases$defined = mergeCases.defined) == null ? void 0 : _mergeCases$defined[x])
      };
    }).reduce((a, b) => _objectSpread2(_objectSpread2({}, a), b));

    ({
      schema
    } = _Object$keys$map$redu);
    other = _objectWithoutProperties(_Object$keys$map$redu, _excluded4);

    if (isTruthSchema) {
      //@ts-ignore
      schema = true;
    }

    return _objectSpread2({
      schema
    }, other);
  });
  return _objectSpread2({
    schema
  }, additional);
};

const applyDefaults = (props, defaults) => {
  return _applyDefaults(props, defaults);
};

const canonizeDefaults = defaults => {
  var _defaults$rules;

  canonizationRules.forEach(rule => {
    defaults.common = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["mergeSchemas"])(defaults.common, rule(_objectSpread2({}, defaults.common)));

    for (let typeKey in defaults.type) {
      //@ts-ignore
      defaults.type[typeKey] = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["mergeSchemas"])(defaults.type[typeKey], rule(_objectSpread2({}, defaults.type[typeKey])));
    }

    for (let widgetKey in defaults.widget) {
      //@ts-ignore
      for (let widgetElementKey in defaults.widget[widgetKey]) {
        //@ts-ignore
        defaults.widget[widgetKey][widgetElementKey] = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["mergeSchemas"])(defaults.widget[widgetKey][widgetElementKey], rule(_objectSpread2({}, defaults.widget[widgetKey][widgetElementKey])));
      }
    }
  });
  defaults.rules = (_defaults$rules = defaults.rules) == null ? void 0 : _defaults$rules.map(rule => {
    return arg => {
      //@ts-ignore
      const result = rule(_objectSpread2({}, arg));
      return [arg, result, ...canonizationRules.map(x => x(_objectSpread2({}, result)))].reduce((a, b) => Object(lodash_es__WEBPACK_IMPORTED_MODULE_2__["merge"])(a, b));
    };
  });
  return defaults;
};

const _computeInitials = (_schema, parentDefaults, rootSchema, _data = {}) => {
  let schema = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["isObject"])(_schema) ? _schema : {};
  const data = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["isObject"])(_data) ? _data : {};
  let defaults = parentDefaults;

  if (schema.$ref) {
    // Use referenced schema defaults for this node.
    const refSchema = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["findSchemaDefinition"])(schema.$ref, rootSchema);
    return _computeInitials(refSchema, defaults, rootSchema, data);
  } else if (schema.dependencies) {
    const resolvedSchema = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["resolveDependencies"])(schema, rootSchema, data);
    return _computeInitials(resolvedSchema, defaults, rootSchema, data);
  } else if (Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["isObject"])(defaults) && Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["isObject"])(schema.default)) {
    defaults = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["mergeSchemas"])(defaults, schema.default);
  } else if (schema.oneOf) {
    schema = schema.oneOf[Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["getMatchingOption"])(undefined, schema.oneOf, rootSchema)];
  } else if (schema.anyOf) {
    schema = schema.anyOf[Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["getMatchingOption"])(undefined, schema.anyOf, rootSchema)];
  } // Not defaults defined for this node, fallback to generic typed ones.


  if (defaults === undefined) {
    defaults = schema.default;
  }

  switch (Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["getSchemaType"])(schema)) {
    // We need to recur for object schema inner default values.
    case "object":
      return Object.keys(schema.properties || {}).reduce((acc, key) => {
        var _schema$properties, _ref;

        // Compute the defaults for this node, with the parent defaults we might
        // have from a previous run: defaults[key].
        let computedDefault = _computeInitials((_schema$properties = schema.properties) == null ? void 0 : _schema$properties[key], (defaults || {})[key], rootSchema, (_ref = data || {}) == null ? void 0 : _ref[key]);

        if (computedDefault !== undefined) {
          //@ts-ignore
          acc[key] = computedDefault;
        }

        return acc;
      }, {});

    case "array":
      // Inject defaults into existing array defaults
      if (Array.isArray(defaults)) {
        defaults = defaults.map((item, idx) => {
          var _schema$items;

          //@ts-ignore
          return _computeInitials(((_schema$items = schema.items) == null ? void 0 : _schema$items[idx]) || schema.additionalItems || {}, item, rootSchema);
        });
      } // Deeply inject defaults into already existing form data


      if (Array.isArray(data)) {
        defaults = data.map((item, idx) => {
          return _computeInitials(schema.items, (defaults || {})[idx], rootSchema, item);
        });
      }

  }

  return defaults;
};

const mergeDefaultsWithFormData = (defaults, data) => {
  if (Array.isArray(data)) {
    if (!Array.isArray(defaults)) {
      defaults = [];
    }

    return data.map((value, idx) => {
      if (defaults[idx]) {
        return mergeDefaultsWithFormData(defaults[idx], value);
      }

      return value;
    });
  } else if (Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["isObject"])(data)) {
    const acc = Object.assign({}, defaults); // Prevent mutation of source object.

    return Object.keys(data).reduce((acc, key) => {
      acc[key] = mergeDefaultsWithFormData(defaults ? defaults[key] : {}, data[key]);
      return acc;
    }, acc);
  } else {
    return data;
  }
};

const computeInitials = (_schema, rootSchema, data) => {
  const schema = Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["retrieveSchema"])(_schema, rootSchema, data);

  const defaults = _computeInitials(schema, _schema.default, rootSchema, data);

  if (data == null) {
    return defaults;
  } else if (!data) {
    return data;
  } else if (Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["isObject"])(data) || Array.isArray(data)) {
    return mergeDefaultsWithFormData(defaults, data);
  } else {
    return data || defaults;
  }
};

var useLifeCycle = (() => {
  const [init, setInit] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [loadingInit, setLoadingInit] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const didMount = handler => {
    if (!loadingInit) {
      setLoadingInit(true);
      handler();
    }
  };

  const didUpdate = (handler, deps) => {
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
      if (!init) {
        setInit(true);
      } else {
        handler();
      }
    }, deps);
  };

  return [didMount, didUpdate];
});

const extractSchemaFromProps = props => {
  const {
    schema = {},
    configSchema = {},
    readSchema = {},
    eventSchema = {},
    validationSchema = {},
    rulesSchema = []
  } = props;
  return {
    schema,
    configSchema,
    readSchema,
    eventSchema,
    validationSchema,
    rulesSchema
  };
}; // @ts-ignore

const JFormContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])({});
function Form(props) {
  let {
    template = {},
    widgets = {},
    defaults = {},
    schemaInitialized,
    errors
  } = props;
  const [data, setData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(props.data);
  const [beforeDefaults, setBeforeDefaults] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(extractSchemaFromProps(props));
  const [jschema, setJschema] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(beforeDefaults);
  const computedTemplate = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["mergeSchemas"])(getDefaultTemplate(), template), [template]);
  const computedWidgets = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["mergeSchemas"])(getDefaultWidgets(), widgets), [widgets]);
  const computedDefaults = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => canonizeDefaults(Object(_jform_utils__WEBPACK_IMPORTED_MODULE_1__["mergeSchemas"])(getDefaults(), defaults)), [defaults]);

  const onBlur = () => props.onBlur && props.onBlur();

  const onFocus = () => props.onFocus && props.onFocus();

  const onChange = value => {
    if (Object(lodash_es__WEBPACK_IMPORTED_MODULE_2__["isEqual"])(value, data)) {
      return;
    }

    if (props.onChange) {
      props.onChange(value);
    }

    updateData(value);
  };

  const onSubmit = () => {
    props == null ? void 0 : props.onSubmit == null ? void 0 : props.onSubmit(data);
  };

  const extendSchemas = () => {
    const initialSchema = extractSchemaFromProps(beforeDefaults);
    const jschema = applyDefaults(initialSchema, computedDefaults);
    const dataWithDefaults = computeInitials(jschema.schema, jschema.schema, data);
    setData(dataWithDefaults);
    setJschema(jschema);

    if (schemaInitialized) {
      schemaInitialized(_objectSpread2(_objectSpread2({}, jschema), {}, {
        data: dataWithDefaults
      }));
    }
  };

  const updateData = data => {
    setData(data);
  };

  const [didMount, didUpdate] = useLifeCycle();
  const [, didUpdateData] = useLifeCycle(); //@ts-ignore

  didMount(extendSchemas);
  didUpdate(() => {
    const jschema = extractSchemaFromProps(props);
    setBeforeDefaults(jschema);
  }, [props.schema, props.configSchema, props.defaults]);
  didUpdate(extendSchemas, [beforeDefaults]);
  didUpdateData(() => updateData(props.data), [props.data]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "jform"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(JFormContext.Provider, {
    value: {
      template: computedTemplate,
      widgets: computedWidgets,
      schema: jschema.schema,
      defaults: computedDefaults
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "jform-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Schema, Object.assign({
    data: data
  }, jschema, {
    errors: errors,
    onBlur: onBlur,
    onFocus: onFocus,
    onChange: onChange
  }))), props.onSubmit && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn btn-info",
    onClick: onSubmit
  }, "Submit")));
}

/* harmony default export */ __webpack_exports__["default"] = (Form);



/***/ }),

/***/ "../utils/dist/utils.esm.js":
/*!**********************************!*\
  !*** ../utils/dist/utils.esm.js ***!
  \**********************************/
/*! exports provided: canExpand, findSchemaDefinition, getMatchingOption, getOptions, getSchemaType, getWidget, guessType, isAdditional, isConstant, isObject, isSelect, mergeSchemas, renderLayout, resolveDependencies, resolveReference, retrieveSchema, schemaRequiresTrueValue, toConstant, traverse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canExpand", function() { return canExpand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findSchemaDefinition", function() { return findSchemaDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMatchingOption", function() { return getMatchingOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOptions", function() { return getOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSchemaType", function() { return getSchemaType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWidget", function() { return getWidget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "guessType", function() { return guessType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAdditional", function() { return isAdditional; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isConstant", function() { return isConstant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSelect", function() { return isSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeSchemas", function() { return mergeSchemas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderLayout", function() { return renderLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveDependencies", function() { return resolveDependencies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveReference", function() { return resolveReference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retrieveSchema", function() { return retrieveSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schemaRequiresTrueValue", function() { return schemaRequiresTrueValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toConstant", function() { return toConstant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "traverse", function() { return traverse; });
/* harmony import */ var jsonpointer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonpointer */ "../utils/node_modules/jsonpointer/jsonpointer.js");
/* harmony import */ var jsonpointer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonpointer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash-es */ "../utils/node_modules/lodash-es/lodash.js");
/* harmony import */ var _json_schema_tools_traverse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @json-schema-tools/traverse */ "../utils/node_modules/@json-schema-tools/traverse/build/index.js");
/* harmony import */ var _json_schema_tools_traverse__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_json_schema_tools_traverse__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var json_schema_merge_allof__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! json-schema-merge-allof */ "../utils/node_modules/json-schema-merge-allof/src/index.js");
/* harmony import */ var json_schema_merge_allof__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(json_schema_merge_allof__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ajv */ "../utils/node_modules/ajv/dist/ajv.js");
/* harmony import */ var ajv__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ajv__WEBPACK_IMPORTED_MODULE_4__);






function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return typeof key === "symbol" ? key : String(key);
}

var findSchemaDefinition = function findSchemaDefinition(ref, rootSchema) {
  var _ref;

  if (rootSchema === void 0) {
    rootSchema = {};
  }

  if ((_ref = ref) != null && _ref.startsWith('#')) {
    ref = decodeURIComponent(ref.substring(1));
  } else {
    throw new Error("Could not find a definition for " + ref + ".");
  }

  var current = jsonpointer__WEBPACK_IMPORTED_MODULE_0___default.a.get(rootSchema, ref);

  if (current === undefined) {
    throw new Error("Could not find a definition for " + ref + ".");
  }

  if (current.$ref) {
    var subSchema = findSchemaDefinition(current.$ref, rootSchema);

    if (Object.keys(current).length > 1) {
      return _objectSpread2(_objectSpread2({}, Object(lodash_es__WEBPACK_IMPORTED_MODULE_1__["omit"])(current, ["$ref"])), subSchema);
    }

    return subSchema;
  }

  return current;
};

var guessType = function guessType(value) {
  if (Array.isArray(value)) {
    return 'array';
  }

  if (typeof value === 'string') {
    return 'string';
  }

  if (value == null) {
    return 'null';
  }

  if (typeof value === 'boolean') {
    return 'boolean';
  }

  if (!isNaN(value)) {
    return 'number';
  }

  if (typeof value === 'object') {
    return 'object';
  } // Default to string if we can't figure it out


  return 'string';
};

var getSchemaType = function getSchemaType(schema) {
  var type = schema.type;

  if (!type) {
    if (schema["const"]) {
      return guessType(schema["const"]);
    }

    if (schema["enum"]) {
      if (schema["enum"].length > 0) {
        return guessType(schema["enum"][0]);
      } else {
        return "string";
      }
    }

    if (schema.properties || schema.additionalProperties) {
      return "object";
    }
  }

  if (Array.isArray(type) && type.length === 2 && type.includes('null')) {
    type = type.find(function (type) {
      return type !== 'null';
    });
  }

  return type || 'string';
};

/** Determines whether a `thing` is an object for the purposes of Json schema. In this case, `thing` is an object if it has
 * the type `object` but is NOT null, an array or a File.
 *
 * @param thing - The thing to check to see whether it is an object
 * @returns - True if is a non-null, non-array, non-File object
 */
var isObject = function isObject(thing) {
  if (typeof File !== 'undefined' && thing instanceof File) {
    return false;
  }

  return typeof thing === 'object' && thing !== null && !Array.isArray(thing);
};

var customizer = function customizer(a, b, key, object, source) {
  if (key === "required" && Object(lodash_es__WEBPACK_IMPORTED_MODULE_1__["isArray"])(a) && Object(lodash_es__WEBPACK_IMPORTED_MODULE_1__["isArray"])(b)) {
    if (getSchemaType(object) === 'object' || getSchemaType(source) === 'object') {
      return Object(lodash_es__WEBPACK_IMPORTED_MODULE_1__["union"])(a, b);
    }
  }

  if (key.endsWith("lassName") && typeof a === 'string' && typeof b === 'string') {
    return Object(lodash_es__WEBPACK_IMPORTED_MODULE_1__["union"])(a.split(" "), b.split(" ")).join(" ");
  }

  if (Object(lodash_es__WEBPACK_IMPORTED_MODULE_1__["isArray"])(a) && isObject(b)) {
    return b;
  }

  if (isObject(a) && Object(lodash_es__WEBPACK_IMPORTED_MODULE_1__["isArray"])(b)) {
    return b;
  }

  if (Object(lodash_es__WEBPACK_IMPORTED_MODULE_1__["isArray"])(a) && Object(lodash_es__WEBPACK_IMPORTED_MODULE_1__["isArray"])(b)) {
    return b;
  }

  return undefined;
};

var mergeSchemas = function mergeSchemas(arg) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return lodash_es__WEBPACK_IMPORTED_MODULE_1__["mergeWith"].apply(void 0, [arg].concat(args, [customizer]));
};

var _excluded = ["schema"];
var ignore = {
  additionalItems: true,
  items: true,
  contains: true,
  propertyNames: true,
  not: true,
  "if": true,
  then: true,
  "else": true,
  allOf: true,
  anyOf: true,
  oneOf: true,
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true,
  "^\d+$": true
};
var ignorePaths = /*#__PURE__*/Object.keys(ignore).join('|');
var traverse = function traverse(_schema, _additionalSchemas, handler) {
  return _json_schema_tools_traverse__WEBPACK_IMPORTED_MODULE_2___default()(_schema || {}, function (schemaOrSubschema, _b, _path) {
    var propertyPath = _path.replace(new RegExp(ignorePaths, "g"), "").split("/").filter(function (x) {
      return x !== "";
    }).map(function (x) {
      return x === "additionalProperties" ? x : "$" + x;
    });

    var objectPath = propertyPath.join(".");

    var _additionalSubSchemas;

    if (propertyPath.length > 0) {
      _additionalSubSchemas = Object.entries(_additionalSchemas).map(function (_ref) {
        var _ref2;

        var k = _ref[0],
            v = _ref[1];
        return _ref2 = {}, _ref2[k] = lodash_es__WEBPACK_IMPORTED_MODULE_1__["default"].get(v, objectPath), _ref2;
      }).reduce(function (a, b) {
        return _objectSpread2(_objectSpread2({}, a), b);
      });
    } else {
      _additionalSubSchemas = _additionalSchemas;
    }

    var mutation = handler(schemaOrSubschema, _additionalSubSchemas);

    if (mutation) {
      var _mutation$schema = mutation.schema,
          schema = _mutation$schema === void 0 ? schemaOrSubschema : _mutation$schema,
          _mutatedSubschemas = _objectWithoutPropertiesLoose(mutation, _excluded);

      if (propertyPath.length === 0) {
        lodash_es__WEBPACK_IMPORTED_MODULE_1__["default"].merge(_additionalSchemas, _mutatedSubschemas);
      } else {
        Object.entries(_mutatedSubschemas).forEach(function (_ref3) {
          var k = _ref3[0],
              v = _ref3[1];
          return lodash_es__WEBPACK_IMPORTED_MODULE_1__["default"].set(_additionalSchemas[k], objectPath, v);
        });
      }

      return schema;
    }

    return schemaOrSubschema;
  }, {
    bfs: true,
    mutable: true
  });
};

var copyOrNot = function copyOrNot(s1, s2) {
  var reflessCopy = _objectSpread2(_objectSpread2({}, s2), s1);

  delete reflessCopy.$ref;
  return reflessCopy;
};
/**
 * When instantiated, represents a fully configured dereferencer. When constructed, references are pulled out.
 * No references are fetched until .resolve is called.
 */


var Dereferencer = /*#__PURE__*/function () {
  function Dereferencer(schema, options) {
    if (options === void 0) {
      options = {};
    }

    this.options = options;
    this.refCache = {};

    if (this.options.recursive === undefined) {
      this.options.recursive = true;
    }

    if (this.options.rootSchema === undefined) {
      this.options.rootSchema = schema;
    }

    if (schema !== true && schema !== false && schema.$id) {
      this.options.rootSchema = schema;
    }

    if (this.options.refCache) {
      this.refCache = this.options.refCache;
    }

    this.schema = schema; // shallow copy breaks recursive

    this.refs = this.collectRefs();
  }
  /**
   * Fetches the schemas for all the refs in the configured input schema(s)
   *
   * @returns a promise that will resolve a fully dereferenced schema, where all the
   *          promises for each ref has been resolved as well.
   *
   *
   */


  var _proto = Dereferencer.prototype;

  _proto.resolve = function resolve() {
    var refMap = {};

    if (this.schema === true || this.schema === false) {
      return this.schema;
    }

    if (this.refs.length === 0) {
      return this.schema;
    }

    var unfetchedRefs = this.refs.filter(function (r) {
      return refMap[r] === undefined;
    });

    for (var _iterator = _createForOfIteratorHelperLoose(unfetchedRefs), _step; !(_step = _iterator()).done;) {
      var ref = _step.value;
      var fetched = void 0;

      if (this.refCache[ref] !== undefined) {
        fetched = this.refCache[ref];
      } else if (ref === "#") {
        if (this.options.rootSchema === undefined) {
          throw new Error("options.rootSchema was not provided, but one of the schemas references '#'");
        }

        fetched = this.options.rootSchema;
      } else {
        fetched = findSchemaDefinition(ref, this.options.rootSchema);
      }

      if (this.options.recursive === true && fetched !== true && fetched !== false && ref !== "#") {
        var subDerefferOpts = _objectSpread2(_objectSpread2({}, this.options), {}, {
          refCache: this.refCache
        }); //@ts-ignore


        var subDereffer = new Dereferencer(fetched, subDerefferOpts);

        if (subDereffer.refs.length !== 0) {
          var subFetchedProm = subDereffer.resolve(); // if there are props other than $ref present on the fetched schema,
          // we have to break referential integrity, creating a new schema all together.

          refMap[ref] = copyOrNot(fetched, subFetchedProm);
        } else {
          refMap[ref] = fetched;
        }
      } else {
        refMap[ref] = fetched;
      }

      this.refCache[ref] = refMap[ref];
    }

    if (this.schema.$ref !== undefined) {
      this.schema = copyOrNot(this.schema, refMap[this.schema.$ref]);
    } else {
      _json_schema_tools_traverse__WEBPACK_IMPORTED_MODULE_2___default()(this.schema, function (s) {
        if (s === true || s === false) {
          return s;
        }

        if (s.$ref !== undefined) {
          var reffedSchema = refMap[s.$ref];
          return copyOrNot(s, reffedSchema);
        }

        return s;
      }, {
        mutable: true
      });
    }

    return this.schema;
  }
  /**
   * First-pass traversal to collect all the refs that we can find. This allows us to
   * optimize the async work required as well.
   */
  ;

  _proto.collectRefs = function collectRefs() {
    var refs = [];
    _json_schema_tools_traverse__WEBPACK_IMPORTED_MODULE_2___default()(this.schema, function (s) {
      if (s === true || s === false) {
        return s;
      }

      if (s.$ref && refs.indexOf(s.$ref) === -1) {
        if (typeof s.$ref !== "string") {
          throw new Error("Found an improperly formatted $ref in schema. $ref must be a string");
        }

        refs.push(s.$ref);
      }

      return s;
    });
    return refs;
  };

  return Dereferencer;
}();

var resolveReference = function resolveReference(schema, rootSchema) {
  return new Dereferencer(schema || {}, {
    rootSchema: rootSchema
  }).resolve();
};

var getWidget = function getWidget(type, widget, widgets, defaults) {
  var _widgets$type;

  if (typeof widget === "function") {
    return widget;
  }

  var foundWidget = widget;

  if (foundWidget === undefined && defaults !== undefined && type !== undefined) {
    var _defaults$type, _defaults$type$type, _defaults$type$type$c, _defaults$type$type$c2;

    foundWidget = defaults == null ? void 0 : (_defaults$type = defaults.type) == null ? void 0 : (_defaults$type$type = _defaults$type[type]) == null ? void 0 : (_defaults$type$type$c = _defaults$type$type.configSchema) == null ? void 0 : (_defaults$type$type$c2 = _defaults$type$type$c.widget) == null ? void 0 : _defaults$type$type$c2.type;
  }

  if (widgets != null && (_widgets$type = widgets[type]) != null && _widgets$type[foundWidget || "undefined"]) {
    return widgets[type][foundWidget || "undefined"];
  } else {
    if (widgets != null && widgets[type]) {
      throw new Error("No widget \"" + foundWidget + "\" for type " + type + ". Supported: " + Object.keys(widgets[type]).join(","));
    } else {
      throw new Error("No widget \"" + foundWidget + "\" for type " + type + "}");
    }
  }
};

var toConstant = function toConstant(schema) {
  if (Array.isArray(schema["enum"]) && schema["enum"].length === 1) {
    return schema["enum"][0];
  } else if (schema["const"]) {
    return schema["const"];
  } else {
    throw new Error("schema cannot be inferred as a constant");
  }
};

var ADDITIONAL_PROPERTY_FLAG = "__additional_property"; //add additional data definitions to schema

var resolveAdditional = (function (schema, rootSchema, data) {
  // Clone the schema so we don't ruin the consumer's original
  schema = _objectSpread2({}, schema);

  if (schema.properties) {
    schema.properties = _objectSpread2({}, schema.properties);
  } else {
    if (schema.type === "object") {
      schema.properties = {};
    }
  }

  data = isObject(data) ? data : {};
  Object.keys(data).forEach(function (key) {
    if (schema.properties[key]) {
      // No need to stub, our schema already has the property
      return;
    }

    var additionalProperties;

    if (schema.additionalProperties.$ref) {
      additionalProperties = retrieveSchema({
        $ref: schema.additionalProperties.$ref
      }, rootSchema, data);
    } else if (schema.additionalProperties.type) {
      additionalProperties = _objectSpread2({}, schema.additionalProperties);
    } else {
      var guessed = guessType(data[key]); //disable inference type from nullable value. set it to string

      additionalProperties = {
        type: guessed !== "null" ? guessed : "string"
      };
    } // The type of our new key should match the additionalProperties value;


    schema.properties[key] = additionalProperties; // Set our additional property flag so we know it was dynamically added

    schema.properties[key][ADDITIONAL_PROPERTY_FLAG] = true;
  });
  return schema;
});
var isAdditional = function isAdditional(schema) {
  return (schema == null ? void 0 : schema[ADDITIONAL_PROPERTY_FLAG]) !== undefined;
};

var _excluded$1 = ["allOf"];
var resolveAllOfMerge = function resolveAllOfMerge(schema, _rootSchema, _data) {
  try {
    return json_schema_merge_allof__WEBPACK_IMPORTED_MODULE_3___default()(_objectSpread2(_objectSpread2({}, schema), {}, {
      allOf: schema.allOf
    }));
  } catch (e) {
    var resolvedSchemaWithoutAllOf = _objectWithoutPropertiesLoose(schema, _excluded$1);

    return resolvedSchemaWithoutAllOf;
  }
};
var resolveAllOf = function resolveAllOf(schema, rootSchema, data) {
  return _objectSpread2(_objectSpread2({}, schema), {}, {
    allOf: schema.allOf.map(function (allOfSubschema) {
      return retrieveSchema(allOfSubschema, rootSchema, data);
    })
  });
};

var createAjvInstance = function createAjvInstance() {
  return new ajv__WEBPACK_IMPORTED_MODULE_4___default.a({
    allErrors: true,
    multipleOfPrecision: 8
  });
};

var _excluded$2 = ["if", "then", "else"];
var ID_PREFIX = "__jform_rootSchema";
var ajv = /*#__PURE__*/createAjvInstance();

var withIdRefPrefix = function withIdRefPrefix(schemaNode) {
  var obj = schemaNode;

  if (schemaNode.constructor === Object) {
    obj = _objectSpread2({}, schemaNode);

    for (var key in obj) {
      var value = obj[key];

      if (key === "$ref" && typeof value === "string" && value.startsWith("#")) {
        obj[key] = ID_PREFIX + value;
      } else {
        obj[key] = withIdRefPrefix(value);
      }
    }
  } else if (Array.isArray(schemaNode)) {
    obj = [].concat(schemaNode);

    for (var i = 0; i < obj.length; i++) {
      obj[i] = withIdRefPrefix(obj[i]);
    }
  }

  return obj;
};

var isValid = function isValid(schema, data, rootSchema) {
  try {
    // add the rootSchema ROOT_SCHEMA_PREFIX as id.
    // then rewrite the schema ref's to point to the rootSchema
    // this accounts for the case where schema have references to models
    // that lives in the rootSchema but not in the schema in question.
    return ajv.addSchema(rootSchema, ID_PREFIX).validate(withIdRefPrefix(schema), data);
  } catch (e) {
    return false;
  } finally {
    // make sure we remove the rootSchema from the global ajv instance
    ajv.removeSchema(ID_PREFIX);
  }
};
var resolveCondition = (function (schema, rootSchema, data) {
  var expression = schema["if"],
      then = schema.then,
      otherwise = schema["else"],
      resolvedSchemaLessConditional = _objectWithoutPropertiesLoose(schema, _excluded$2);

  var conditionalSchema = isValid(expression, data, rootSchema) ? then : otherwise;

  if (conditionalSchema) {
    return retrieveSchema(mergeSchemas({}, resolvedSchemaLessConditional, retrieveSchema(conditionalSchema, rootSchema, data)), rootSchema, data);
  } else {
    return retrieveSchema(resolvedSchemaLessConditional, rootSchema, data);
  }
});

var _excluded$3 = ["$ref"],
    _excluded2 = ["oneOf"],
    _excluded3 = ["dependencies"];

var resolveReference$1 = function resolveReference(schema, rootSchema, data) {
  var $refSchema = findSchemaDefinition(schema.$ref, rootSchema);

  var localSchema = _objectWithoutPropertiesLoose(schema, _excluded$3);

  return retrieveSchema(_objectSpread2(_objectSpread2({}, $refSchema), localSchema), rootSchema, data);
};

var withExactlyOneSubschema = function withExactlyOneSubschema(schema, rootSchema, data, dependencyKey, oneOf) {
  var validSubschemas = oneOf.filter(function (subschema) {
    if (!subschema.properties) {
      return false;
    }

    var conditionPropertySchema = subschema.properties[dependencyKey];

    if (conditionPropertySchema) {
      var _properties;

      var conditionSchema = {
        type: "object",
        properties: (_properties = {}, _properties[dependencyKey] = conditionPropertySchema, _properties)
      };
      return isValid(conditionSchema, data, rootSchema);
    }

    return false;
  });

  if (validSubschemas.length !== 1) {
    console.warn("ignoring oneOf in dependencies because there isn't exactly one subschema that is valid");
    return schema;
  }

  var subschema = validSubschemas[0];

  var _subschema$properties = subschema.properties,
      dependentSubschema = _objectWithoutPropertiesLoose(_subschema$properties, [dependencyKey].map(_toPropertyKey));

  var dependentSchema = _objectSpread2(_objectSpread2({}, subschema), {}, {
    properties: dependentSubschema
  });

  return mergeSchemas({}, schema, retrieveSchema(dependentSchema, rootSchema, data));
};

var withDependentSchema = function withDependentSchema(schema, rootSchema, data, dependencyKey, dependencyValue) {
  var _retrieveSchema = retrieveSchema(dependencyValue, rootSchema, data),
      oneOf = _retrieveSchema.oneOf,
      dependentSchema = _objectWithoutPropertiesLoose(_retrieveSchema, _excluded2);

  schema = mergeSchemas({}, schema, dependentSchema); // Since it does not contain oneOf, we return the original schema.

  if (oneOf === undefined) {
    return schema;
  } else if (!Array.isArray(oneOf)) {
    throw new Error("invalid: it is some " + typeof oneOf + " instead of an array");
  } // Resolve $refs inside oneOf.


  var resolvedOneOf = oneOf.map(function (subschema) {
    return subschema.$ref ? resolveReference$1(subschema, rootSchema, data) : subschema;
  });
  return withExactlyOneSubschema(schema, rootSchema, data, dependencyKey, resolvedOneOf);
};

var processDependencies = function processDependencies(dependencies, resolvedSchema, rootSchema, data) {
  // Process dependencies updating the local schema properties as appropriate.
  for (var dependencyKey in dependencies) {
    // Skip this dependency if its trigger property is not present.
    if (data[dependencyKey] === undefined) {
      continue;
    } // Skip this dependency if it is not included in the schema (such as when dependencyKey is itself a hidden dependency.)


    if (resolvedSchema.properties && !(dependencyKey in resolvedSchema.properties)) {
      continue;
    }

    var dependencyValue = dependencies[dependencyKey],
        remainingDependencies = _objectWithoutPropertiesLoose(dependencies, [dependencyKey].map(_toPropertyKey));

    if (Array.isArray(dependencyValue)) {
      resolvedSchema = withDependentProperties(resolvedSchema, dependencyValue);
    } else if (isObject(dependencyValue)) {
      resolvedSchema = withDependentSchema(resolvedSchema, rootSchema, data, dependencyKey, dependencyValue);
    }

    return processDependencies(remainingDependencies, resolvedSchema, rootSchema, data);
  }

  return resolvedSchema;
};

var withDependentProperties = function withDependentProperties(schema, additionallyRequired) {
  if (!additionallyRequired) {
    return schema;
  }

  var required = Array.isArray(schema.required) ? Array.from(new Set([].concat(schema.required, additionallyRequired))) : additionallyRequired;
  return _objectSpread2(_objectSpread2({}, schema), {}, {
    required: required
  });
};

function getMatchingOption(data, options, rootSchema) {
  // For performance, skip validating subschemas if formData is undefined. We just
  // want to get the first option in that case.
  if (data === undefined) {
    return 0;
  }

  for (var i = 0; i < options.length; i++) {
    var option = options[i]; // If the schema describes an object then we need to add slightly more
    // strict matching to the schema, because unless the schema uses the
    // "requires" keyword, an object will match the schema as long as it
    // doesn't have matching keys with a conflicting type. To do this we use an
    // "anyOf" with an array of requires. This augmentation expresses that the
    // schema should match if any of the keys in the schema are present on the
    // object and pass validation.

    if (option.properties) {
      // Create an "anyOf" schema that requires at least one of the keys in the
      // "properties" object
      var requiresAnyOf = {
        anyOf: Object.keys(option.properties).map(function (key) {
          return {
            required: [key]
          };
        })
      };
      var augmentedSchema = void 0; // If the "anyOf" keyword already exists, wrap the augmentation in an "allOf"

      if (option.anyOf) {
        // Create a shallow clone of the option
        var shallowClone = _extends({}, option);

        if (!shallowClone.allOf) {
          shallowClone.allOf = [];
        } else {
          // If "allOf" already exists, shallow clone the array
          shallowClone.allOf = shallowClone.allOf.slice();
        }

        shallowClone.allOf.push(requiresAnyOf);
        augmentedSchema = shallowClone;
      } else {
        augmentedSchema = Object.assign({}, option, requiresAnyOf);
      } // Remove the "required" field as it's likely that not all fields have
      // been filled in yet, which will mean that the schema is not valid


      delete augmentedSchema.required;

      if (isValid(augmentedSchema, data, rootSchema)) {
        return i;
      }
    } else if (isValid(option, data, rootSchema)) {
      return i;
    }
  }

  return 0;
}
var _resolveDependencies = function _resolveDependencies(schema, rootSchema, data) {
  // Drop the dependencies from the source schema.
  var _schema$dependencies = schema.dependencies,
      dependencies = _schema$dependencies === void 0 ? {} : _schema$dependencies,
      resolvedSchema = _objectWithoutPropertiesLoose(schema, _excluded3);

  if (resolvedSchema.oneOf !== undefined) {
    resolvedSchema = resolvedSchema.oneOf[getMatchingOption(data, resolvedSchema.oneOf, rootSchema)];
  } else if (resolvedSchema.anyOf !== undefined) {
    resolvedSchema = resolvedSchema.anyOf[getMatchingOption(data, resolvedSchema.anyOf, rootSchema)];
  }

  return processDependencies(dependencies, resolvedSchema, rootSchema, data);
};
var resolveDependencies = (function (schema, rootSchema, data) {
  var resolvedSchema = _resolveDependencies(schema, rootSchema, data);

  return retrieveSchema(resolvedSchema, rootSchema, data);
});

var resolveProperties = (function (schema, rootSchema, data) {
  var properties = {}; //@ts-ignore

  Object.entries(schema.properties).forEach(function (_ref) {
    var propName = _ref[0],
        propSchema = _ref[1];
    //@ts-ignore
    var rawPropData = data && data[propName];
    var propData = isObject(rawPropData) ? rawPropData : {};
    var resolvedPropSchema = retrieveSchema(propSchema, rootSchema, propData); //@ts-ignore

    properties[propName] = resolvedPropSchema;

    if (propSchema !== resolvedPropSchema && schema.properties !== properties) {
      schema = _objectSpread2(_objectSpread2({}, schema), {}, {
        properties: properties
      });
    }
  });
  return schema;
});

var handlers = {
  $ref: resolveReference,
  dependencies: resolveDependencies,
  allOf_before: resolveAllOf,
  "if": resolveCondition,
  properties: resolveProperties,
  allOf_after: resolveAllOfMerge,
  additionalProperties: resolveAdditional
};
var retrieveSchema = function retrieveSchema(schema, rootSchema, data) {
  if (!Object(lodash_es__WEBPACK_IMPORTED_MODULE_1__["isObject"])(schema)) {
    return {};
  }

  var resolvedSchema = schema;
  Object.entries(handlers).forEach(function (_ref) {
    var key = _ref[0],
        handler = _ref[1];
    var field = key.split("_")[0]; //@ts-ignore

    if (resolvedSchema[field]) {
      resolvedSchema = handler(resolvedSchema, rootSchema, data);
    }
  });
  return resolvedSchema;
};

function isConstant(schema) {
  return Array.isArray(schema["enum"]) && schema["enum"].length === 1 || schema["const"] !== undefined;
}

var isSelect = function isSelect(_schema) {
  var schema = retrieveSchema(_schema, _schema);
  var altSchemas = schema.oneOf || schema.anyOf;

  if (Array.isArray(schema["enum"])) {
    return true;
  } else if (Array.isArray(altSchemas)) {
    return altSchemas.every(function (altSchemas) {
      return isConstant(altSchemas);
    });
  }

  return false;
};

var schemaRequiresTrueValue = function schemaRequiresTrueValue(schema) {
  // Check if const is a truthy value
  if (schema["const"]) {
    return true;
  } // Check if an enum has a single value of true


  if (schema["enum"] && schema["enum"].length === 1 && schema["enum"][0] === true) {
    return true;
  } // If anyOf has a single value, evaluate the subschema


  if (schema.anyOf && schema.anyOf.length === 1) {
    return schemaRequiresTrueValue(schema.anyOf[0]);
  } // If oneOf has a single value, evaluate the subschema


  if (schema.oneOf && schema.oneOf.length === 1) {
    return schemaRequiresTrueValue(schema.oneOf[0]);
  } // Evaluate each subschema in allOf, to see if one of them requires a true
  // value


  if (schema.allOf) {
    return schema.allOf.some(schemaRequiresTrueValue);
  }

  return false;
};

var renderLayout = function renderLayout(layout, col, row) {
  return layout.map(function (rowProps, index) {
    var children = Object.keys(rowProps).map(function (name) {
      return col(name, rowProps[name]);
    });
    return row(children, index);
  });
};

var canExpand = function canExpand(schema, data, handler) {
  if (!handler) {
    return false;
  }

  if (!schema.additionalProperties) {
    return false;
  }

  if (schema.maxProperties !== undefined) {
    return Object.keys(data).length < schema.maxProperties;
  }

  return true;
};

var getOptions = function getOptions(schema, configSchema) {
  if (schema["enum"]) {
    return schema["enum"].map(function (value, i) {
      var label = (configSchema == null ? void 0 : configSchema.enumNames) && (configSchema == null ? void 0 : configSchema.enumNames[i]) || String(value);
      return {
        label: label,
        value: value
      };
    });
  } else {
    var altSchemas = schema.oneOf || schema.anyOf;
    return altSchemas == null ? void 0 : altSchemas.map(function (schema) {
      var value = toConstant(schema);
      var label = schema.title || String(value);
      return {
        schema: schema,
        label: label,
        value: value
      };
    });
  }
};




/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/components/common/editor/Editor.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader!./src/components/common/editor/Editor.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".editor-header {\r\n    border-bottom: 2px solid #1DA57A;\r\n}\r\n\r\n.jeditor .codicon-folding-collapsed:before {\r\n    content: '+';\r\n}\r\n\r\n.jeditor .codicon-folding-expanded:before {\r\n    content: '-';\r\n}\r\n\r\n.jeditor-panel {\r\n    border-color: #ddd;\r\n    margin-bottom: 20px;\r\n    background-color: #fff;\r\n    border: 1px solid transparent;\r\n    border-radius: 4px;\r\n    -webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);\r\n    box-shadow: 0 1px 1px rgb(0 0 0 / 5%);\r\n}\r\n\r\n.editor-hide-button.ant-btn {\r\n    position: absolute;\r\n    margin-left: -25px;\r\n    border: none;\r\n    background: none;\r\n    margin-top: 8px;\r\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/layout/Header.css":
/*!*********************************************************!*\
  !*** ./node_modules/css-loader!./src/layout/Header.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".header .menu-header-element.menu-collapse-button {\r\n    position: absolute;\r\n    left: 0;\r\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/layout/Layout.css":
/*!*********************************************************!*\
  !*** ./node_modules/css-loader!./src/layout/Layout.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".ant-layout .ant-layout-sider-trigger {\r\n    position: absolute\r\n}\r\n\r\n.header {\r\n    display: flex\r\n}\r\n\r\n.settings-menu {\r\n    flex-grow: 0.25;\r\n    justify-content: flex-end;\r\n}\r\n\r\n.menu {\r\n    flex-grow: 1;\r\n}\r\n\r\n.header .ant-menu-dark.ant-menu-horizontal >   .ant-menu-item:hover {\r\n    background-color: #4dc193;\r\n}\r\n\r\n.menu-collapse-button {\r\n    position: absolute;\r\n    left: 0;\r\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/layout/menu/Menu.css":
/*!************************************************************!*\
  !*** ./node_modules/css-loader!./src/layout/menu/Menu.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".header .menu-header-element {\r\n    font-size: 30px;\r\n    font-weight: bold;\r\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/store/model/theme.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader!./src/store/model/theme.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".user-form-control {\r\n    width: 100%;\r\n    height: 34px;\r\n    padding: 6px 12px;\r\n    font-size: 14px;\r\n    line-height: 1.42857143;\r\n    border: 1px solid #ccc;\r\n    border-radius: 4px;\r\n    -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);\r\n    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);\r\n    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;\r\n    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\r\n    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\r\n    margin-bottom: 15px;\r\n}\r\n\r\n.user-form-control select {\r\n    width: 100%\r\n}\r\n\r\n\r\n.user-form-control:focus {\r\n    border-color: #66afe9;\r\n    outline: 0;\r\n    -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%);\r\n    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%);\r\n}\r\n\r\n.user-boolean-layout {\r\n    position: relative;\r\n    display: block;\r\n    margin-top: 10px;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.user-boolean-layout label {\r\n    display: flex;\r\n}", ""]);

// exports


/***/ }),

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layout_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout/Layout */ "./src/layout/Layout.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");



var App = function App(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], {
    basename: "/jform"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layout_Layout__WEBPACK_IMPORTED_MODULE_1__["default"], null)));
};

/***/ }),

/***/ "./src/components/common/DemoForm.jsx":
/*!********************************************!*\
  !*** ./src/components/common/DemoForm.jsx ***!
  \********************************************/
/*! exports provided: DemoForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoForm", function() { return DemoForm; });
/* harmony import */ var _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/slicedToArray */ "../../node_modules/@babel/runtime-corejs3/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/objectWithoutProperties */ "../../node_modules/@babel/runtime-corejs3/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_set_timeout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/set-timeout */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/set-timeout.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_set_timeout__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_set_timeout__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_iframe_IFrame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/iframe/IFrame */ "./src/components/common/iframe/IFrame.jsx");
/* harmony import */ var _common_Form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/Form */ "./src/components/common/Form.jsx");
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! easy-peasy */ "./node_modules/easy-peasy/dist/index.js");
/* harmony import */ var _error_ErrorBoundary__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./error/ErrorBoundary */ "./src/components/common/error/ErrorBoundary.jsx");


var _excluded = ["height"];






var DemoForm = Object(_error_ErrorBoundary__WEBPACK_IMPORTED_MODULE_7__["withErrorBoundary"])(function (_ref) {
  var height = _ref.height,
      props = _babel_runtime_corejs3_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, _excluded);

  var selectedStyles = Object(easy_peasy__WEBPACK_IMPORTED_MODULE_6__["useStoreState"])(function (state) {
    return state.theme.selectedStyles;
  });

  var _useErrorBoundary = Object(_error_ErrorBoundary__WEBPACK_IMPORTED_MODULE_7__["useErrorBoundary"])(),
      _useErrorBoundary2 = _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useErrorBoundary, 2),
      error = _useErrorBoundary2[0],
      resetError = _useErrorBoundary2[1];

  if (error) {
    _babel_runtime_corejs3_core_js_stable_set_timeout__WEBPACK_IMPORTED_MODULE_2___default()(function () {
      return resetError();
    }, 1000);

    return error.toString();
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_common_iframe_IFrame__WEBPACK_IMPORTED_MODULE_4__["IFrame"], {
    height: height
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("link", {
    rel: "stylesheet",
    href: selectedStyles
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_common_Form__WEBPACK_IMPORTED_MODULE_5__["Form"], props));
});

/***/ }),

/***/ "./src/components/common/Form.jsx":
/*!****************************************!*\
  !*** ./src/components/common/Form.jsx ***!
  \****************************************/
/*! exports provided: Form */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return Form; });
/* harmony import */ var _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/extends */ "../../node_modules/@babel/runtime-corejs3/helpers/extends.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jform_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jform/core */ "../core/dist/core.esm.js");
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! easy-peasy */ "./node_modules/easy-peasy/dist/index.js");




var Form = function Form(props) {
  var defaults = Object(easy_peasy__WEBPACK_IMPORTED_MODULE_3__["useStoreState"])(function (state) {
    return state.theme.selectedDefaults;
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_jform_core__WEBPACK_IMPORTED_MODULE_2__["default"], _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    defaults: defaults
  }, props));
};

/***/ }),

/***/ "./src/components/common/editor/Editor.css":
/*!*************************************************!*\
  !*** ./src/components/common/editor/Editor.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader!./Editor.css */ "./node_modules/css-loader/index.js!./src/components/common/editor/Editor.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../../../node_modules/css-loader!./Editor.css */ "./node_modules/css-loader/index.js!./src/components/common/editor/Editor.css", function() {
			var newContent = __webpack_require__(/*! !../../../../node_modules/css-loader!./Editor.css */ "./node_modules/css-loader/index.js!./src/components/common/editor/Editor.css");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/common/editor/Editor.jsx":
/*!*************************************************!*\
  !*** ./src/components/common/editor/Editor.jsx ***!
  \*************************************************/
/*! exports provided: Editor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Editor", function() { return Editor; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/keys */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/for-each */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/define-properties */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-properties.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/define-property */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var antd_lib_row_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd/lib/row/style */ "./node_modules/antd/lib/row/style/index.js");
/* harmony import */ var antd_lib_row_style__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(antd_lib_row_style__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var antd_lib_row__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! antd/lib/row */ "./node_modules/antd/lib/row/index.js");
/* harmony import */ var antd_lib_row__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(antd_lib_row__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var antd_lib_col_style__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! antd/lib/col/style */ "./node_modules/antd/lib/col/style/index.js");
/* harmony import */ var antd_lib_col_style__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(antd_lib_col_style__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var antd_lib_col__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! antd/lib/col */ "./node_modules/antd/lib/col/index.js");
/* harmony import */ var antd_lib_col__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(antd_lib_col__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var antd_lib_button_style__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! antd/lib/button/style */ "./node_modules/antd/lib/button/style/index.js");
/* harmony import */ var antd_lib_button_style__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button_style__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! antd/lib/button */ "./node_modules/antd/lib/button/index.js");
/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/slicedToArray */ "../../node_modules/@babel/runtime-corejs3/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/extends */ "../../node_modules/@babel/runtime-corejs3/helpers/extends.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "../../node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var antd_lib_tabs_style__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! antd/lib/tabs/style */ "./node_modules/antd/lib/tabs/style/index.js");
/* harmony import */ var antd_lib_tabs_style__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(antd_lib_tabs_style__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var antd_lib_tabs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! antd/lib/tabs */ "./node_modules/antd/lib/tabs/index.js");
/* harmony import */ var antd_lib_tabs__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(antd_lib_tabs__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/json/stringify */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/map */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/filter */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_entries__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/entries */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/entries.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_entries__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_entries__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var components_common_DemoForm__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! components/common/DemoForm */ "./src/components/common/DemoForm.jsx");
/* harmony import */ var _Editor_css__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Editor.css */ "./src/components/common/editor/Editor.css");
/* harmony import */ var _Editor_css__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_Editor_css__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var react_monaco_editor__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! react-monaco-editor */ "./node_modules/react-monaco-editor/lib/index.js");
/* harmony import */ var _JsEditor__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./JsEditor */ "./src/components/common/editor/JsEditor.jsx");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");



















function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(object); if (_babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default.a) { var symbols = _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default()(object); enumerableOnly && (symbols = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_20___default()(symbols).call(symbols, function (sym) { return _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_2___default()(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context3, _context4; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_3___default()(_context3 = ownKeys(Object(source), !0)).call(_context3, function (key) { _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_15___default()(target, key, source[key]); }) : _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4___default.a ? _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_5___default()(target, _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4___default()(source)) : _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_3___default()(_context4 = ownKeys(Object(source))).call(_context4, function (key) { _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_6___default()(target, key, _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_2___default()(source, key)); }); } return target; }











var TabPane = antd_lib_tabs__WEBPACK_IMPORTED_MODULE_17___default.a.TabPane;
var monacoEditorOptions = {
  minimap: {
    enabled: false
  },
  automaticLayout: true
};

var createEditor = function createEditor(_ref) {
  var editor = _ref.editor,
      value = _ref.value,
      _onChange = _ref.onChange,
      options = _ref.options,
      height = _ref.height;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_22___default.a.createElement("div", {
    className: "jeditor-panel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_22___default.a.createElement(react_monaco_editor__WEBPACK_IMPORTED_MODULE_25__["default"], _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_14___default()({
    className: "jeditor",
    language: "json",
    value: _babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_18___default()(value, null, 2),
    theme: "vs-light",
    onChange: function onChange(x) {
      return _onChange(JSON.parse(x));
    },
    height: height || 400,
    options: _objectSpread(_objectSpread({}, monacoEditorOptions), options)
  }, editor)));
};

var Editor = function Editor(props) {
  var _context, _context2;

  var formProps = props.formProps,
      code = props.code,
      _props$show = props.show,
      show = _props$show === void 0 ? {
    schema: true,
    data: true,
    configSchema: true
  } : _props$show,
      _props$useTabs = props.useTabs,
      useTabs = _props$useTabs === void 0 ? true : _props$useTabs,
      height = props.height;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_22__["useState"])(props.schema),
      _useState2 = _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_13___default()(_useState, 2),
      schema = _useState2[0],
      changeSchema = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_22__["useState"])(props.configSchema),
      _useState4 = _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_13___default()(_useState3, 2),
      configSchema = _useState4[0],
      changeConfigSchema = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_22__["useState"])(props.data),
      _useState6 = _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_13___default()(_useState5, 2),
      data = _useState6[0],
      changeData = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_22__["useState"])(true),
      _useState8 = _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_13___default()(_useState7, 2),
      showEditor = _useState8[0],
      setShowEditor = _useState8[1];

  var onChange = function onChange(data) {
    if (props.onChange) {
      props.onChange();
    }

    changeData(data);
  };

  var editors = {
    schema: show.schema && schema && createEditor({
      height: height,
      value: schema,
      onChange: changeSchema
    }),
    configSchema: show.configSchema && schema && createEditor({
      height: height,
      value: configSchema,
      onChange: changeConfigSchema
    }),
    data: show.data && createEditor({
      value: data,
      height: height,
      onChange: onChange
    }),
    jsx: show.code && code && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_22___default.a.createElement(_JsEditor__WEBPACK_IMPORTED_MODULE_26__["JsEditor"], {
      height: height,
      code: code
    })
  };

  var content = _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_19___default()(_context = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_20___default()(_context2 = _babel_runtime_corejs3_core_js_stable_object_entries__WEBPACK_IMPORTED_MODULE_21___default()(editors)).call(_context2, function (_ref2) {
    var _ref3 = _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_13___default()(_ref2, 2),
        k = _ref3[0],
        v = _ref3[1];

    return v;
  })).call(_context, function (_ref4, i) {
    var _ref5 = _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_13___default()(_ref4, 2),
        k = _ref5[0],
        v = _ref5[1];

    return useTabs ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_22___default.a.createElement(TabPane, {
      key: i,
      tab: k
    }, v) : v;
  });

  var form = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_22___default.a.createElement(components_common_DemoForm__WEBPACK_IMPORTED_MODULE_23__["DemoForm"], _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_14___default()({}, formProps, {
    height: height,
    schema: schema,
    configSchema: configSchema,
    data: data,
    onChange: onChange,
    schemaInitialized: function schemaInitialized(_ref6) {
      var data = _ref6.data;
      return onChange(data);
    }
  }));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_22___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_22___default.a.createElement(antd_lib_row__WEBPACK_IMPORTED_MODULE_8___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_22___default.a.createElement(antd_lib_button__WEBPACK_IMPORTED_MODULE_12___default.a, {
    className: "editor-hide-button",
    onClick: function onClick() {
      return setShowEditor(!showEditor);
    },
    icon: showEditor ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_22___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_27__["LeftOutlined"], null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_22___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_27__["RightOutlined"], null)
  }), showEditor && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_22___default.a.createElement(antd_lib_col__WEBPACK_IMPORTED_MODULE_10___default.a, {
    span: 12
  }, useTabs ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_22___default.a.createElement(antd_lib_tabs__WEBPACK_IMPORTED_MODULE_17___default.a, {
    tabPosition: "top"
  }, content) : content), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_22___default.a.createElement(antd_lib_col__WEBPACK_IMPORTED_MODULE_10___default.a, {
    span: showEditor ? 12 : 24
  }, useTabs ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_22___default.a.createElement(antd_lib_tabs__WEBPACK_IMPORTED_MODULE_17___default.a, {
    tabPosition: "top"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_22___default.a.createElement(TabPane, {
    key: 1,
    tab: "Demo"
  }, form)) : form)));
};

/***/ }),

/***/ "./src/components/common/editor/JsEditor.jsx":
/*!***************************************************!*\
  !*** ./src/components/common/editor/JsEditor.jsx ***!
  \***************************************************/
/*! exports provided: JsEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsEditor", function() { return JsEditor; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/trim */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/trim.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_monaco_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-monaco-editor */ "./node_modules/react-monaco-editor/lib/index.js");




var rTabs = function rTabs(str) {
  return _babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_0___default()(str).call(str).replace(/^ {4}/gm, "");
};

var JsEditor = function JsEditor(_ref) {
  var height = _ref.height,
      code = _ref.code;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_monaco_editor__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "jeditor",
    language: "javascript",
    value: rTabs(code),
    theme: "vs-light",
    height: height || 700,
    options: {
      minimap: {
        enabled: false
      },
      automaticLayout: true,
      readOnly: true
    }
  });
};

/***/ }),

/***/ "./src/components/common/error/ErrorBoundary.jsx":
/*!*******************************************************!*\
  !*** ./src/components/common/error/ErrorBoundary.jsx ***!
  \*******************************************************/
/*! exports provided: ErrorBoundaryContext, withErrorBoundary, useErrorBoundary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorBoundaryContext", function() { return ErrorBoundaryContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withErrorBoundary", function() { return withErrorBoundary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useErrorBoundary", function() { return useErrorBoundary; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_reflect_construct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/reflect/construct */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/reflect/construct.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_reflect_construct__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_reflect_construct__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/keys */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/filter */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/for-each */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/define-properties */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-properties.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/define-property */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "../../node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/slicedToArray */ "../../node_modules/@babel/runtime-corejs3/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/classCallCheck */ "../../node_modules/@babel/runtime-corejs3/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/createClass */ "../../node_modules/@babel/runtime-corejs3/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/inherits */ "../../node_modules/@babel/runtime-corejs3/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime-corejs3/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime-corejs3/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_16__);

















function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_1___default()(object); if (_babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_2___default.a) { var symbols = _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_2___default()(object); enumerableOnly && (symbols = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3___default()(symbols).call(symbols, function (sym) { return _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4___default()(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_5___default()(_context = ownKeys(Object(source), !0)).call(_context, function (key) { _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(target, key, source[key]); }) : _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6___default.a ? _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_7___default()(target, _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6___default()(source)) : _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_5___default()(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_8___default()(target, key, _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4___default()(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_15___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_15___default()(this).constructor; result = _babel_runtime_corejs3_core_js_stable_reflect_construct__WEBPACK_IMPORTED_MODULE_0___default()(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_14___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_babel_runtime_corejs3_core_js_stable_reflect_construct__WEBPACK_IMPORTED_MODULE_0___default.a) return false; if (_babel_runtime_corejs3_core_js_stable_reflect_construct__WEBPACK_IMPORTED_MODULE_0___default.a.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_babel_runtime_corejs3_core_js_stable_reflect_construct__WEBPACK_IMPORTED_MODULE_0___default()(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var ErrorBoundary = /*#__PURE__*/function (_Component) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_13___default()(ErrorBoundary, _Component);

  var _super = _createSuper(ErrorBoundary);

  function ErrorBoundary() {
    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_11___default()(this, ErrorBoundary);

    return _super.apply(this, arguments);
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_12___default()(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch() {
      var _this$props;

      this.setState({});

      (_this$props = this.props).onError.apply(_this$props, arguments);
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return ErrorBoundary;
}(react__WEBPACK_IMPORTED_MODULE_16__["Component"]);

var noop = function noop() {
  return false;
};

var errorBoundaryContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_16__["createContext"])({
  componentDidCatch: {
    current: undefined
  },
  error: undefined,
  setError: noop
});
function ErrorBoundaryContext(_ref) {
  var children = _ref.children;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_16__["useState"])(),
      _useState2 = _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_10___default()(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var componentDidCatch = Object(react__WEBPACK_IMPORTED_MODULE_16__["useRef"])();
  var ctx = Object(react__WEBPACK_IMPORTED_MODULE_16__["useMemo"])(function () {
    return {
      componentDidCatch: componentDidCatch,
      error: error,
      setError: setError
    };
  }, [error]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(errorBoundaryContext.Provider, {
    value: ctx
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(ErrorBoundary, {
    error: error,
    onError: function onError(error, errorInfo) {
      var _componentDidCatch$cu;

      setError(error);
      (_componentDidCatch$cu = componentDidCatch.current) === null || _componentDidCatch$cu === void 0 ? void 0 : _componentDidCatch$cu.call(componentDidCatch, error, errorInfo);
    }
  }, children));
}
function withErrorBoundary(WrappedComponent) {
  function WithErrorBoundary(props) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(ErrorBoundaryContext, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_16___default.a.createElement(WrappedComponent, _objectSpread({
      key: "WrappedComponent"
    }, props)));
  }

  return WithErrorBoundary;
}
function useErrorBoundary(componentDidCatch) {
  var ctx = Object(react__WEBPACK_IMPORTED_MODULE_16__["useContext"])(errorBoundaryContext);
  ctx.componentDidCatch.current = componentDidCatch;
  var resetError = Object(react__WEBPACK_IMPORTED_MODULE_16__["useCallback"])(function () {
    ctx.setError(undefined);
  }, []);
  return [ctx.error, resetError];
}

/***/ }),

/***/ "./src/components/common/iframe/IFrame.jsx":
/*!*************************************************!*\
  !*** ./src/components/common/iframe/IFrame.jsx ***!
  \*************************************************/
/*! exports provided: IFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IFrame", function() { return IFrame; });
/* harmony import */ var _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/extends */ "../../node_modules/@babel/runtime-corejs3/helpers/extends.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/slicedToArray */ "../../node_modules/@babel/runtime-corejs3/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/objectWithoutProperties */ "../../node_modules/@babel/runtime-corejs3/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/for-each */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_set_interval__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/set-interval */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/set-interval.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_set_interval__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_set_interval__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_6__);



var _excluded = ["children", "height"];




var IFrame = function IFrame(_ref) {
  var _contentRef$contentWi, _contentRef$contentWi2;

  var children = _ref.children,
      height = _ref.height,
      props = _babel_runtime_corejs3_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2___default()(_ref, _excluded);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(null),
      _useState2 = _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      contentRef = _useState2[0],
      setContentRef = _useState2[1];

  var mountNode = contentRef === null || contentRef === void 0 ? void 0 : (_contentRef$contentWi = contentRef.contentWindow) === null || _contentRef$contentWi === void 0 ? void 0 : (_contentRef$contentWi2 = _contentRef$contentWi.document) === null || _contentRef$contentWi2 === void 0 ? void 0 : _contentRef$contentWi2.body;

  var sync = function sync() {
    var stylesHtml = document.querySelectorAll("head > style");
    var formFrame = document.querySelector('iframe#form-frame');

    if (!formFrame) {
      return;
    }

    var stylesFrame = formFrame.contentWindow.document.head.querySelectorAll('style');

    if (stylesFrame.length !== stylesHtml.length) {
      var _context;

      _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_3___default()(_context = formFrame.contentWindow.document.head.querySelectorAll('style')).call(_context, function (element) {
        return element.remove();
      });

      _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_3___default()(stylesHtml).call(stylesHtml, function (style) {
        var newStyleElement = document.createElement("style");
        newStyleElement.textContent = style.textContent;
        formFrame.contentWindow.document.head.appendChild(newStyleElement);
      });

      console.log('refresh-styles');
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_5__["useEffect"])(function () {
    return sync();
  }, []);

  _babel_runtime_corejs3_core_js_stable_set_interval__WEBPACK_IMPORTED_MODULE_4___default()(function () {
    sync();
  }, 1000);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("iframe", _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    id: "form-frame"
  }, props, {
    ref: setContentRef,
    frameborder: "0",
    style: {
      position: 'relative',
      width: '100%',
      height: height || 'calc(100vh - 64px)'
    }
  }), mountNode && /*#__PURE__*/Object(react_dom__WEBPACK_IMPORTED_MODULE_6__["createPortal"])(children, mountNode));
};

/***/ }),

/***/ "./src/components/documentation/types/BooleanTypeDocumentation.jsx":
/*!*************************************************************************!*\
  !*** ./src/components/documentation/types/BooleanTypeDocumentation.jsx ***!
  \*************************************************************************/
/*! exports provided: BooleanTypeDocumentation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BooleanTypeDocumentation", function() { return BooleanTypeDocumentation; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var BooleanTypeDocumentation = function BooleanTypeDocumentation() {
  return "b";
};

/***/ }),

/***/ "./src/components/home/Home.jsx":
/*!**************************************!*\
  !*** ./src/components/home/Home.jsx ***!
  \**************************************/
/*! exports provided: Home */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Home", function() { return Home; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/keys */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/filter */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/for-each */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/define-properties */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-properties.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/define-property */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/extends */ "../../node_modules/@babel/runtime-corejs3/helpers/extends.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "../../node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var components_common_editor_Editor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! components/common/editor/Editor */ "./src/components/common/editor/Editor.jsx");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./config */ "./src/components/home/config.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
/* harmony import */ var routes_constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! routes/constants */ "./src/routes/constants.js");











function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(object); if (_babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default.a) { var symbols = _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default()(object); enumerableOnly && (symbols = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2___default()(symbols).call(symbols, function (sym) { return _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_4___default()(_context = ownKeys(Object(source), !0)).call(_context, function (key) { _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(target, key, source[key]); }) : _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5___default.a ? _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_6___default()(target, _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5___default()(source)) : _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_4___default()(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_7___default()(target, key, _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } return target; }






var Home = function Home() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h1", {
    style: {
      textAlign: "center",
      paddingBottom: "0.3em",
      fontSize: "2em",
      borderBottom: "1px solid hsla(210,18%,87%,1)"
    }
  }, "JForm"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h3", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("a", {
    href: "http://facebook.github.io/react/"
  }, "React"), " компонент для декларативного построения форм на базе ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("a", {
    href: "http://json-schema.org/"
  }, "JsonSchema")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h1", {
    style: {
      paddingBottom: "0.3em",
      fontSize: "2em",
      borderBottom: "1px solid hsla(210,18%,87%,1)"
    }
  }, "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("li", null, "\u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0438\u0437 JsonSchema \u0441 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u043E\u0439 ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("a", {
    href: "https://json-schema.org/draft-07/json-schema-release-notes.html"
  }, "Draft 7")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_13__["Link"], {
    to: routes_constants__WEBPACK_IMPORTED_MODULE_14__["SOLUTIONS_PATH"] + "/0"
  }, "\u0414\u0438\u043D\u0430\u043C\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0432\u0435\u0440\u0441\u0442\u043A\u0430"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h1", {
    style: {
      paddingBottom: "0.3em",
      fontSize: "2em",
      borderBottom: "1px solid hsla(210,18%,87%,1)"
    }
  }, "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430"), "npm install @jform/core", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h1", {
    style: {
      paddingBottom: "0.3em",
      fontSize: "2em",
      borderBottom: "1px solid hsla(210,18%,87%,1)"
    }
  }, "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(components_common_editor_Editor__WEBPACK_IMPORTED_MODULE_11__["Editor"], _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_8___default()({}, _config__WEBPACK_IMPORTED_MODULE_12__["default"], {
    height: 390,
    show: {
      code: true
    },
    useTabs: false,
    formProps: _objectSpread(_objectSpread({}, _config__WEBPACK_IMPORTED_MODULE_12__["default"]), {}, {
      onSubmit: console.log
    })
  })));
};

/***/ }),

/***/ "./src/components/home/config.js":
/*!***************************************!*\
  !*** ./src/components/home/config.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var schema = {
  "title": "Форма регистрации",
  "description": "Пример формы",
  "type": "object",
  "required": ["firstName", "agree"],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "Имя"
    },
    "sex": {
      "type": "string",
      "title": "Пол",
      "enum": ["Мужской", "Женский"],
      "default": "Мужской"
    },
    "agree": {
      "type": "boolean",
      "title": "Согласие на обработку персональных данных",
      "const": true
    }
  }
};
var code = "import JForm from \"@jform/core\"\n\nconst schema = {\n    \"title\": \"\u0424\u043E\u0440\u043C\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438\",\n    \"description\": \"\u041F\u0440\u0438\u043C\u0435\u0440 \u0444\u043E\u0440\u043C\u044B\",\n    \"type\": \"object\",\n    \"required\": [\"firstName\",\"lastName\"],\n    \"properties\": {\n        \"firstName\": {\n            \"type\": \"string\",\n            \"title\": \"\u0418\u043C\u044F\"\n        },\n        \"sex\": {\n            \"type\": \"string\",\n             \"title\": \"\u041F\u043E\u043B\",\n            \"enum\": [\"\u041C\u0443\u0436\u0441\u043A\u043E\u0439\", \"\u0416\u0435\u043D\u0441\u043A\u0438\u0439\"]\n        },\n        \"agree\": {\n            \"type\": \"boolean\",\n            \"title\": \"\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445\",\n            \"const\": true\n        }\n    }\n}\n\nconst App = () => (\n <JForm schema={schema}/>\n)";
/* harmony default export */ __webpack_exports__["default"] = ({
  schema: schema,
  code: code
});

/***/ }),

/***/ "./src/components/solutions/Solutions.jsx":
/*!************************************************!*\
  !*** ./src/components/solutions/Solutions.jsx ***!
  \************************************************/
/*! exports provided: Solutions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Solutions", function() { return Solutions; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/keys */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/filter */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/for-each */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/for-each.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/define-properties */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-properties.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/define-property */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/extends */ "../../node_modules/@babel/runtime-corejs3/helpers/extends.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "../../node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_number_parse_int__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/number/parse-int */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/number/parse-int.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_number_parse_int__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_number_parse_int__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./config */ "./src/components/solutions/config.js");
/* harmony import */ var components_common_editor_Editor__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! components/common/editor/Editor */ "./src/components/common/editor/Editor.jsx");











function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(object); if (_babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default.a) { var symbols = _babel_runtime_corejs3_core_js_stable_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default()(object); enumerableOnly && (symbols = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2___default()(symbols).call(symbols, function (sym) { return _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_4___default()(_context = ownKeys(Object(source), !0)).call(_context, function (key) { _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(target, key, source[key]); }) : _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5___default.a ? _babel_runtime_corejs3_core_js_stable_object_define_properties__WEBPACK_IMPORTED_MODULE_6___default()(target, _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5___default()(source)) : _babel_runtime_corejs3_core_js_stable_instance_for_each__WEBPACK_IMPORTED_MODULE_4___default()(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _babel_runtime_corejs3_core_js_stable_object_define_property__WEBPACK_IMPORTED_MODULE_7___default()(target, key, _babel_runtime_corejs3_core_js_stable_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } return target; }






var Solutions = function Solutions(props) {
  var _useParams = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_12__["useParams"])(),
      id = _useParams.id;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(components_common_editor_Editor__WEBPACK_IMPORTED_MODULE_14__["Editor"], _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_8___default()({
    height: 600
  }, _config__WEBPACK_IMPORTED_MODULE_13__["default"][_babel_runtime_corejs3_core_js_stable_number_parse_int__WEBPACK_IMPORTED_MODULE_10___default()(id)], {
    formProps: _objectSpread(_objectSpread({}, _config__WEBPACK_IMPORTED_MODULE_13__["default"][_babel_runtime_corejs3_core_js_stable_number_parse_int__WEBPACK_IMPORTED_MODULE_10___default()(id)]), {}, {
      onSubmit: console.log
    })
  }));
};

/***/ }),

/***/ "./src/components/solutions/config.js":
/*!********************************************!*\
  !*** ./src/components/solutions/config.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _configs_0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configs/0 */ "./src/components/solutions/configs/0.js");

/* harmony default export */ __webpack_exports__["default"] = ([_configs_0__WEBPACK_IMPORTED_MODULE_0__["default"]]);

/***/ }),

/***/ "./src/components/solutions/configs/0.js":
/*!***********************************************!*\
  !*** ./src/components/solutions/configs/0.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  schema: {
    title: 'Tell m',
    type: 'object',
    required: ['firstName'],
    properties: {
      'image': {
        type: 'string',
        title: 'image'
      },
      user: {
        type: 'object',
        title: 'user',
        'properties': {
          'password': {
            'type': 'string',
            'title': 'Password'
          },
          'username': {
            'type': 'string',
            'title': 'username'
          }
        }
      },
      'details': {
        type: 'boolean',
        title: 'details'
      },
      'lastName': {
        'type': 'string',
        'title': 'Last name'
      },
      'bio': {
        'type': 'string',
        'title': 'Bio'
      },
      'firstName': {
        'type': 'string',
        'title': 'First name'
      },
      'age': {
        'type': 'string',
        'title': 'Age'
      }
    }
  },
  configSchema: {
    widget: {
      layout: [{
        firstName: {
          md: 6
        },
        lastName: {
          md: 6,
          optional: function optional(_ref) {
            var isFilled = _ref.isFilled;
            return isFilled('firstName');
          }
        }
      }, {
        image: {
          md: 3,
          optional: function optional(_ref2) {
            var isFilled = _ref2.isFilled;
            return isFilled('lastName');
          }
        },
        user: {
          md: 9,
          optional: function optional(_ref3) {
            var isFilled = _ref3.isFilled;
            return isFilled('lastName');
          }
        }
      }, {
        details: {
          md: 12
        }
      }, {
        'description': {
          md: 12,
          optional: function optional(_ref4) {
            var isFilled = _ref4.isFilled;
            return isFilled('lastName');
          },
          render: function render(props) {
            var data = props.data,
                errorSchema = props.errorSchema;
            var firstName = data.firstName,
                lastName = data.lastName;
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Hello, ", firstName, " ", lastName, "!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sad"));
          }
        }
      }, {
        age: {
          md: 12,
          optional: function optional(_ref5) {
            var isTrue = _ref5.isTrue;
            return isTrue('details');
          }
        }
      }, {
        bio: {
          md: 12,
          optional: function optional(_ref6) {
            var isTrue = _ref6.isTrue;
            return isTrue('details');
          }
        }
      }]
    },
    $user: {
      widget: {
        layout: [{
          username: {
            md: 12
          }
        }, {
          password: {
            md: 12
          }
        }]
      }
    },
    $image: {
      title: {
        display: false
      },
      style: {
        height: "158px",
        width: "158px",
        marginBottom: "1px"
      }
    }
  }
});

/***/ }),

/***/ "./src/components/theme/Theme.jsx":
/*!****************************************!*\
  !*** ./src/components/theme/Theme.jsx ***!
  \****************************************/
/*! exports provided: Theme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Theme", function() { return Theme; });
/* harmony import */ var _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/extends */ "../../node_modules/@babel/runtime-corejs3/helpers/extends.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/components/theme/config.js");
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! easy-peasy */ "./node_modules/easy-peasy/dist/index.js");
/* harmony import */ var _common_Form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/Form */ "./src/components/common/Form.jsx");
/* harmony import */ var _store_defaults_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/defaults/user */ "./src/store/defaults/user.js");






var Theme = function Theme() {
  var _useStoreState = Object(easy_peasy__WEBPACK_IMPORTED_MODULE_3__["useStoreState"])(function (state) {
    return state.theme;
  }),
      defaultsKey = _useStoreState.defaultsKey,
      defaultTypes = _useStoreState.defaultTypes,
      stylesKey = _useStoreState.stylesKey,
      stylesTypes = _useStoreState.stylesTypes;

  var changeDefaults = Object(easy_peasy__WEBPACK_IMPORTED_MODULE_3__["useStoreActions"])(function (state) {
    return state.theme.setDefaults;
  });
  var changeStyles = Object(easy_peasy__WEBPACK_IMPORTED_MODULE_3__["useStoreActions"])(function (state) {
    return state.theme.setStyles;
  });
  var data = {
    defaults: defaultsKey,
    styles: stylesKey
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_common_Form__WEBPACK_IMPORTED_MODULE_4__["Form"], _babel_runtime_corejs3_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    defaults: _store_defaults_user__WEBPACK_IMPORTED_MODULE_5__["default"],
    data: data
  }, Object(_config__WEBPACK_IMPORTED_MODULE_2__["default"])(changeDefaults, defaultTypes, changeStyles, stylesTypes, data)));
};

/***/ }),

/***/ "./src/components/theme/config.js":
/*!****************************************!*\
  !*** ./src/components/theme/config.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (setDefaults, defaultTypes, setStyles, stylesTypes, data) {
  return {
    schema: {
      type: "object",
      properties: {
        defaults: {
          title: "Умолчания",
          "enum": defaultTypes
        },
        styles: {
          title: "Стили",
          "enum": stylesTypes
        }
      }
    },
    configSchema: {
      $styles: {
        empty: "",
        hidden: data.defaults !== "Bootstrap"
      }
    },
    eventSchema: {
      $defaults: {
        onChange: function onChange(x) {
          return setDefaults(x);
        }
      },
      $styles: {
        onChange: function onChange(x) {
          return setStyles(x);
        }
      }
    }
  };
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/App.jsx");
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! easy-peasy */ "./node_modules/easy-peasy/dist/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store */ "./src/store/index.js");
/* harmony import */ var react_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-head */ "./node_modules/react-head/dist/index.esm.js");






Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_head__WEBPACK_IMPORTED_MODULE_5__["HeadProvider"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(easy_peasy__WEBPACK_IMPORTED_MODULE_3__["StoreProvider"], {
  store: _store__WEBPACK_IMPORTED_MODULE_4__["default"]
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_2__["App"], null))), document.getElementById("app"));

/***/ }),

/***/ "./src/layout/Content.jsx":
/*!********************************!*\
  !*** ./src/layout/Content.jsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_layout_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/layout/style */ "./node_modules/antd/lib/layout/style/index.js");
/* harmony import */ var antd_lib_layout_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_layout_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/layout */ "./node_modules/antd/lib/layout/index.js");
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_layout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_model_theme_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/model/theme.css */ "./src/store/model/theme.css");
/* harmony import */ var _store_model_theme_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_store_model_theme_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../routes */ "./src/routes/index.js");






var Content = antd_lib_layout__WEBPACK_IMPORTED_MODULE_1___default.a.Content;
/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  var routes = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["useRoutes"])(_routes__WEBPACK_IMPORTED_MODULE_5__["default"]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Content, {
    style: {
      padding: '0 24px',
      minHeight: 280
    }
  }, routes));
});

/***/ }),

/***/ "./src/layout/Header.css":
/*!*******************************!*\
  !*** ./src/layout/Header.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader!./Header.css */ "./node_modules/css-loader/index.js!./src/layout/Header.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../node_modules/css-loader!./Header.css */ "./node_modules/css-loader/index.js!./src/layout/Header.css", function() {
			var newContent = __webpack_require__(/*! !../../node_modules/css-loader!./Header.css */ "./node_modules/css-loader/index.js!./src/layout/Header.css");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/layout/Header.jsx":
/*!*******************************!*\
  !*** ./src/layout/Header.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_layout_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/layout/style */ "./node_modules/antd/lib/layout/style/index.js");
/* harmony import */ var antd_lib_layout_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_layout_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/layout */ "./node_modules/antd/lib/layout/index.js");
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_layout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Header_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Header.css */ "./src/layout/Header.css");
/* harmony import */ var _Header_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Header_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _menu_Menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu/Menu */ "./src/layout/menu/Menu.jsx");
/* harmony import */ var _menu_SettingsMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./menu/SettingsMenu */ "./src/layout/menu/SettingsMenu.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! easy-peasy */ "./node_modules/easy-peasy/dist/index.js");









var Header = antd_lib_layout__WEBPACK_IMPORTED_MODULE_1___default.a.Header;
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var collapsed = Object(easy_peasy__WEBPACK_IMPORTED_MODULE_8__["useStoreState"])(function (state) {
    return state.menu.collapsed;
  });
  var toggleCollapse = Object(easy_peasy__WEBPACK_IMPORTED_MODULE_8__["useStoreActions"])(function (state) {
    return state.menu.toggleCollapse;
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Header, {
    className: "header",
    style: {
      position: 'fixed',
      zIndex: 1,
      width: '100%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", {
    className: "ant-menu-overflow ant-menu ant-menu-root ant-menu-horizontal ant-menu-dark menu",
    role: "menu",
    tabIndex: "0",
    "data-menu-list": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
    className: "ant-menu-overflow-item ant-menu-item ant-menu-item-only-child menu-header-element menu-collapse-button"
  }, collapsed ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_7__["MenuUnfoldOutlined"], {
    className: "menu-header-element",
    onClick: toggleCollapse
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_7__["MenuFoldOutlined"], {
    className: "menu-header-element",
    onClick: toggleCollapse
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
    className: "ant-menu-overflow-item ant-menu-item ant-menu-item-only-child menu-header-element"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Link"], {
    to: "/"
  }, "@Jform - API"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_menu_Menu__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_menu_SettingsMenu__WEBPACK_IMPORTED_MODULE_5__["default"], null));
});

/***/ }),

/***/ "./src/layout/Layout.css":
/*!*******************************!*\
  !*** ./src/layout/Layout.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader!./Layout.css */ "./node_modules/css-loader/index.js!./src/layout/Layout.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../node_modules/css-loader!./Layout.css */ "./node_modules/css-loader/index.js!./src/layout/Layout.css", function() {
			var newContent = __webpack_require__(/*! !../../node_modules/css-loader!./Layout.css */ "./node_modules/css-loader/index.js!./src/layout/Layout.css");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/layout/Layout.jsx":
/*!*******************************!*\
  !*** ./src/layout/Layout.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_layout_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/layout/style */ "./node_modules/antd/lib/layout/style/index.js");
/* harmony import */ var antd_lib_layout_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_layout_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/layout */ "./node_modules/antd/lib/layout/index.js");
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_layout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Layout_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Layout.css */ "./src/layout/Layout.css");
/* harmony import */ var _Layout_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Layout_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Header */ "./src/layout/Header.jsx");
/* harmony import */ var _menu_Sider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./menu/Sider */ "./src/layout/menu/Sider.jsx");
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Content */ "./src/layout/Content.jsx");







var Content = antd_lib_layout__WEBPACK_IMPORTED_MODULE_1___default.a.Content;
/* harmony default export */ __webpack_exports__["default"] = (function () {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(antd_lib_layout__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Header__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Content, {
    style: {
      marginTop: 64
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(antd_lib_layout__WEBPACK_IMPORTED_MODULE_1___default.a, {
    className: "site-layout-background"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_menu_Sider__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Content__WEBPACK_IMPORTED_MODULE_6__["default"], null))));
});

/***/ }),

/***/ "./src/layout/menu/Menu.css":
/*!**********************************!*\
  !*** ./src/layout/menu/Menu.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader!./Menu.css */ "./node_modules/css-loader/index.js!./src/layout/menu/Menu.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../../node_modules/css-loader!./Menu.css */ "./node_modules/css-loader/index.js!./src/layout/menu/Menu.css", function() {
			var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!./Menu.css */ "./node_modules/css-loader/index.js!./src/layout/menu/Menu.css");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/layout/menu/Menu.jsx":
/*!**********************************!*\
  !*** ./src/layout/menu/Menu.jsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_menu_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/menu/style */ "./node_modules/antd/lib/menu/style/index.js");
/* harmony import */ var antd_lib_menu_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_menu_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/menu */ "./node_modules/antd/lib/menu/index.js");
/* harmony import */ var antd_lib_menu__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_menu__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Menu_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Menu.css */ "./src/layout/menu/Menu.css");
/* harmony import */ var _Menu_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Menu_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! easy-peasy */ "./node_modules/easy-peasy/dist/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/index.js");






/* harmony default export */ __webpack_exports__["default"] = (function () {
  var header = Object(easy_peasy__WEBPACK_IMPORTED_MODULE_4__["useStoreState"])(function (state) {
    return state.menu.header;
  });
  var selectMenu = Object(easy_peasy__WEBPACK_IMPORTED_MODULE_4__["useStoreActions"])(function (state) {
    return state.menu.selectMenu;
  });
  var navigate = Object(react_router__WEBPACK_IMPORTED_MODULE_5__["useNavigate"])();

  var _useLocation = Object(react_router__WEBPACK_IMPORTED_MODULE_5__["useLocation"])(),
      pathname = _useLocation.pathname;

  var key = "/" + pathname.split('/')[1];
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    selectMenu(key);
  }, [key]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(antd_lib_menu__WEBPACK_IMPORTED_MODULE_1___default.a, {
    selectedKeys: [key],
    onSelect: function onSelect(_ref) {
      var key = _ref.key;
      navigate(key);
    },
    className: "menu",
    theme: "dark",
    mode: "horizontal",
    items: header
  });
});

/***/ }),

/***/ "./src/layout/menu/SettingsMenu.jsx":
/*!******************************************!*\
  !*** ./src/layout/menu/SettingsMenu.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_menu_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/menu/style */ "./node_modules/antd/lib/menu/style/index.js");
/* harmony import */ var antd_lib_menu_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_menu_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/menu */ "./node_modules/antd/lib/menu/index.js");
/* harmony import */ var antd_lib_menu__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_menu__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_drawer_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/lib/drawer/style */ "./node_modules/antd/lib/drawer/style/index.js");
/* harmony import */ var antd_lib_drawer_style__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_drawer_style__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_drawer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/lib/drawer */ "./node_modules/antd/lib/drawer/index.js");
/* harmony import */ var antd_lib_drawer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_drawer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/slicedToArray */ "../../node_modules/@babel/runtime-corejs3/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Menu_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Menu.css */ "./src/layout/menu/Menu.css");
/* harmony import */ var _Menu_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Menu_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! easy-peasy */ "./node_modules/easy-peasy/dist/index.js");
/* harmony import */ var _components_theme_Theme__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/theme/Theme */ "./src/components/theme/Theme.jsx");









/* harmony default export */ __webpack_exports__["default"] = (function () {
  var settings = Object(easy_peasy__WEBPACK_IMPORTED_MODULE_7__["useStoreState"])(function (state) {
    return state.menu.settings;
  });

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_5__["useState"])(false),
      _useState2 = _babel_runtime_corejs3_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_4___default()(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var handleSettingSelect = function handleSettingSelect(_ref) {
    var key = _ref.key;

    switch (key) {
      case "settings":
        setVisible(true);
        break;
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(antd_lib_drawer__WEBPACK_IMPORTED_MODULE_3___default.a, {
    title: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",
    placement: "right",
    onClose: function onClose() {
      return setVisible(false);
    },
    visible: visible
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_components_theme_Theme__WEBPACK_IMPORTED_MODULE_8__["Theme"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(antd_lib_menu__WEBPACK_IMPORTED_MODULE_1___default.a, {
    onClick: handleSettingSelect,
    selectable: false,
    className: "settings-menu",
    theme: "dark",
    mode: "horizontal",
    items: settings
  }));
});

/***/ }),

/***/ "./src/layout/menu/Sider.jsx":
/*!***********************************!*\
  !*** ./src/layout/menu/Sider.jsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_menu_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/menu/style */ "./node_modules/antd/lib/menu/style/index.js");
/* harmony import */ var antd_lib_menu_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_menu_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/menu */ "./node_modules/antd/lib/menu/index.js");
/* harmony import */ var antd_lib_menu__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_menu__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_layout_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/lib/layout/style */ "./node_modules/antd/lib/layout/style/index.js");
/* harmony import */ var antd_lib_layout_style__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_layout_style__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/lib/layout */ "./node_modules/antd/lib/layout/index.js");
/* harmony import */ var antd_lib_layout__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_layout__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Menu_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Menu.css */ "./src/layout/menu/Menu.css");
/* harmony import */ var _Menu_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Menu_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! easy-peasy */ "./node_modules/easy-peasy/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");









var Sider = antd_lib_layout__WEBPACK_IMPORTED_MODULE_3___default.a.Sider;
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var sider = Object(easy_peasy__WEBPACK_IMPORTED_MODULE_6__["useStoreState"])(function (state) {
    return state.menu.sider;
  });
  var collapsed = Object(easy_peasy__WEBPACK_IMPORTED_MODULE_6__["useStoreState"])(function (state) {
    return state.menu.collapsed;
  });
  var navigate = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["useNavigate"])();

  var _useLocation = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["useLocation"])(),
      pathname = _useLocation.pathname;

  return sider ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Sider, {
    className: "site-layout-background",
    width: collapsed ? 0 : 200
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd_lib_menu__WEBPACK_IMPORTED_MODULE_1___default.a, {
    mode: "inline",
    style: {
      height: '100%'
    },
    items: sider,
    onSelect: function onSelect(_ref) {
      var key = _ref.key;
      navigate(key);
    },
    selectedKeys: [pathname]
  })) : null;
});

/***/ }),

/***/ "./src/routes/constants.js":
/*!*********************************!*\
  !*** ./src/routes/constants.js ***!
  \*********************************/
/*! exports provided: COMPONENTS_PATH, COMPONENTS_STRING_PATH, COMPONENTS_STRING_TEXT_PATH, COMPONENTS_STRING_SELECT_PATH, COMPONENTS_BOOLEAN_PATH, COMPONENTS_BOOLEAN_CHECKBOX_PATH, COMPONENTS_BOOLEAN_SELECT_PATH, COMPONENTS_OBJECT_PATH, COMPONENTS_OBJECT_GRID_PATH, DOCUMENTATION_PATH, DOCUMENTATION_SCHEMA_PATH, DOCUMENTATION_CONFIG_SCHEMA_PATH, DOCUMENTATION_CONFIG_SCHEMA_ELEMENTS_PATH, DOCUMENTATION_CONFIG_SCHEMA_LAYOUT_PATH, DOCUMENTATION_CONFIG_SCHEMA_STYLES_PATH, DOCUMENTATION_TYPES_PATH, DOCUMENTATION_TYPES_STRING_PATH, DOCUMENTATION_TYPES_BOOLEAN_PATH, DOCUMENTATION_TYPES_OBJECT_PATH, DOCUMENTATION_EVENTS_PATH, DOCUMENTATION_DEFAULTS_PATH, EXAMPLES_PATH, SOLUTIONS_PATH */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPONENTS_PATH", function() { return COMPONENTS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPONENTS_STRING_PATH", function() { return COMPONENTS_STRING_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPONENTS_STRING_TEXT_PATH", function() { return COMPONENTS_STRING_TEXT_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPONENTS_STRING_SELECT_PATH", function() { return COMPONENTS_STRING_SELECT_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPONENTS_BOOLEAN_PATH", function() { return COMPONENTS_BOOLEAN_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPONENTS_BOOLEAN_CHECKBOX_PATH", function() { return COMPONENTS_BOOLEAN_CHECKBOX_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPONENTS_BOOLEAN_SELECT_PATH", function() { return COMPONENTS_BOOLEAN_SELECT_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPONENTS_OBJECT_PATH", function() { return COMPONENTS_OBJECT_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPONENTS_OBJECT_GRID_PATH", function() { return COMPONENTS_OBJECT_GRID_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENTATION_PATH", function() { return DOCUMENTATION_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENTATION_SCHEMA_PATH", function() { return DOCUMENTATION_SCHEMA_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENTATION_CONFIG_SCHEMA_PATH", function() { return DOCUMENTATION_CONFIG_SCHEMA_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENTATION_CONFIG_SCHEMA_ELEMENTS_PATH", function() { return DOCUMENTATION_CONFIG_SCHEMA_ELEMENTS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENTATION_CONFIG_SCHEMA_LAYOUT_PATH", function() { return DOCUMENTATION_CONFIG_SCHEMA_LAYOUT_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENTATION_CONFIG_SCHEMA_STYLES_PATH", function() { return DOCUMENTATION_CONFIG_SCHEMA_STYLES_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENTATION_TYPES_PATH", function() { return DOCUMENTATION_TYPES_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENTATION_TYPES_STRING_PATH", function() { return DOCUMENTATION_TYPES_STRING_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENTATION_TYPES_BOOLEAN_PATH", function() { return DOCUMENTATION_TYPES_BOOLEAN_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENTATION_TYPES_OBJECT_PATH", function() { return DOCUMENTATION_TYPES_OBJECT_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENTATION_EVENTS_PATH", function() { return DOCUMENTATION_EVENTS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENTATION_DEFAULTS_PATH", function() { return DOCUMENTATION_DEFAULTS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXAMPLES_PATH", function() { return EXAMPLES_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SOLUTIONS_PATH", function() { return SOLUTIONS_PATH; });
var COMPONENTS_PATH = "/components";
var COMPONENTS_STRING_PATH = COMPONENTS_PATH + "/string";
var COMPONENTS_STRING_TEXT_PATH = COMPONENTS_STRING_PATH + "/text";
var COMPONENTS_STRING_SELECT_PATH = COMPONENTS_STRING_PATH + "/select";
var COMPONENTS_BOOLEAN_PATH = COMPONENTS_PATH + "/boolean";
var COMPONENTS_BOOLEAN_CHECKBOX_PATH = COMPONENTS_BOOLEAN_PATH + "/checkbox";
var COMPONENTS_BOOLEAN_SELECT_PATH = COMPONENTS_BOOLEAN_PATH + "/select";
var COMPONENTS_OBJECT_PATH = COMPONENTS_PATH + "/object";
var COMPONENTS_OBJECT_GRID_PATH = COMPONENTS_OBJECT_PATH + "/grid";
var DOCUMENTATION_PATH = "/documentation";
var DOCUMENTATION_SCHEMA_PATH = DOCUMENTATION_PATH + "/schema";
var DOCUMENTATION_CONFIG_SCHEMA_PATH = DOCUMENTATION_PATH + "/configSchema";
var DOCUMENTATION_CONFIG_SCHEMA_ELEMENTS_PATH = DOCUMENTATION_CONFIG_SCHEMA_PATH + "/elements";
var DOCUMENTATION_CONFIG_SCHEMA_LAYOUT_PATH = DOCUMENTATION_CONFIG_SCHEMA_PATH + "/layout";
var DOCUMENTATION_CONFIG_SCHEMA_STYLES_PATH = DOCUMENTATION_CONFIG_SCHEMA_PATH + "/styles";
var DOCUMENTATION_TYPES_PATH = DOCUMENTATION_PATH + "/types";
var DOCUMENTATION_TYPES_STRING_PATH = DOCUMENTATION_TYPES_PATH + "/string";
var DOCUMENTATION_TYPES_BOOLEAN_PATH = DOCUMENTATION_TYPES_PATH + "/boolean";
var DOCUMENTATION_TYPES_OBJECT_PATH = DOCUMENTATION_TYPES_PATH + "/object";
var DOCUMENTATION_EVENTS_PATH = DOCUMENTATION_PATH + "/events";
var DOCUMENTATION_DEFAULTS_PATH = DOCUMENTATION_PATH + "/defaults";
var EXAMPLES_PATH = "/examples";
var SOLUTIONS_PATH = "/solutions";

/***/ }),

/***/ "./src/routes/index.js":
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_solutions_Solutions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/solutions/Solutions */ "./src/components/solutions/Solutions.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
/* harmony import */ var _components_home_Home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/home/Home */ "./src/components/home/Home.jsx");
/* harmony import */ var routes_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! routes/constants */ "./src/routes/constants.js");
/* harmony import */ var components_documentation_types_BooleanTypeDocumentation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/documentation/types/BooleanTypeDocumentation */ "./src/components/documentation/types/BooleanTypeDocumentation.jsx");






/* harmony default export */ __webpack_exports__["default"] = ([{
  path: "",
  element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_home_Home__WEBPACK_IMPORTED_MODULE_3__["Home"], null)
}, {
  path: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_PATH"],
  children: [{
    path: "",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Navigate"], {
      to: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_SCHEMA_PATH"],
      replace: true
    })
  }, {
    path: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_SCHEMA_PATH"],
    element: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_SCHEMA_PATH"]
  }, {
    path: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_CONFIG_SCHEMA_PATH"],
    children: [{
      path: "",
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Navigate"], {
        to: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_CONFIG_SCHEMA_ELEMENTS_PATH"],
        replace: true
      })
    }, {
      path: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_CONFIG_SCHEMA_ELEMENTS_PATH"],
      element: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_CONFIG_SCHEMA_ELEMENTS_PATH"]
    }, {
      path: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_CONFIG_SCHEMA_LAYOUT_PATH"],
      element: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_CONFIG_SCHEMA_LAYOUT_PATH"]
    }, {
      path: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_CONFIG_SCHEMA_STYLES_PATH"],
      element: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_CONFIG_SCHEMA_STYLES_PATH"]
    }]
  }, {
    path: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_TYPES_PATH"],
    children: [{
      path: "",
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Navigate"], {
        to: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_TYPES_STRING_PATH"],
        replace: true
      })
    }, {
      path: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_TYPES_STRING_PATH"],
      element: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_TYPES_STRING_PATH"]
    }, {
      path: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_TYPES_BOOLEAN_PATH"],
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_documentation_types_BooleanTypeDocumentation__WEBPACK_IMPORTED_MODULE_5__["BooleanTypeDocumentation"], null)
    }, {
      path: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_TYPES_OBJECT_PATH"],
      element: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_TYPES_OBJECT_PATH"]
    }]
  }, {
    path: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_EVENTS_PATH"],
    element: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_EVENTS_PATH"]
  }, {
    path: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_DEFAULTS_PATH"],
    element: routes_constants__WEBPACK_IMPORTED_MODULE_4__["DOCUMENTATION_DEFAULTS_PATH"]
  }]
}, {
  path: routes_constants__WEBPACK_IMPORTED_MODULE_4__["COMPONENTS_PATH"]
}, {
  path: routes_constants__WEBPACK_IMPORTED_MODULE_4__["EXAMPLES_PATH"]
}, {
  path: routes_constants__WEBPACK_IMPORTED_MODULE_4__["SOLUTIONS_PATH"],
  children: [{
    path: "",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Navigate"], {
      to: "/solutions/0",
      replace: true
    })
  }, {
    path: ":id",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_solutions_Solutions__WEBPACK_IMPORTED_MODULE_1__["Solutions"], null)
  }]
}]);

/***/ }),

/***/ "./src/store/defaults/bootstrap.jsx":
/*!******************************************!*\
  !*** ./src/store/defaults/bootstrap.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  common: {
    configSchema: {
      layout: {
        className: "form-group",
        style: {
          width: "100%",
          paddingRight: "10px"
        }
      }
    }
  },
  type: {
    string: {
      configSchema: {
        className: 'form-control'
      }
    }
  },
  widget: {
    "boolean": {
      checkbox: {
        configSchema: {
          title: {
            tag: "span"
          },
          layout: {
            className: 'checkbox'
          }
        }
      }
    }
  }
});

/***/ }),

/***/ "./src/store/defaults/styles.js":
/*!**************************************!*\
  !*** ./src/store/defaults/styles.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  cerulean: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/cerulean/bootstrap.min.css"
  },
  cosmo: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/cosmo/bootstrap.min.css"
  },
  cyborg: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/cyborg/bootstrap.min.css"
  },
  darkly: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/darkly/bootstrap.min.css"
  },
  flatly: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/flatly/bootstrap.min.css"
  },
  journal: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/journal/bootstrap.min.css"
  },
  lumen: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/lumen/bootstrap.min.css"
  },
  paper: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/paper/bootstrap.min.css"
  },
  readable: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/readable/bootstrap.min.css"
  },
  sandstone: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/sandstone/bootstrap.min.css"
  },
  simplex: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/simplex/bootstrap.min.css"
  },
  slate: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/slate/bootstrap.min.css"
  },
  spacelab: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/spacelab/bootstrap.min.css"
  },
  "solarized-dark": {
    stylesheet: "//cdn.rawgit.com/aalpern/bootstrap-solarized/master/bootstrap-solarized-dark.css"
  },
  "solarized-light": {
    stylesheet: "//cdn.rawgit.com/aalpern/bootstrap-solarized/master/bootstrap-solarized-light.css"
  },
  superhero: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/superhero/bootstrap.min.css"
  },
  united: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/united/bootstrap.min.css"
  },
  yeti: {
    stylesheet: "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/yeti/bootstrap.min.css"
  },
  "bootstrap-4": {
    stylesheet: "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  }
});

/***/ }),

/***/ "./src/store/defaults/user.js":
/*!************************************!*\
  !*** ./src/store/defaults/user.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  common: {
    configSchema: {
      title: {
        style: {
          fontWeight: 700
        }
      },
      layout: {
        render: [{
          title: {}
        }, {
          children: {}
        }, {
          description: {}
        }, {
          help: {}
        }, {
          errors: {}
        }],
        style: {
          width: "100%",
          paddingRight: "10px"
        }
      }
    }
  },
  type: {
    object: {
      configSchema: {
        title: {
          style: {
            marginBottom: "20px",
            fontSize: "21px",
            borderBottom: "1px solid #e5e5e5"
          }
        }
      }
    },
    string: {
      configSchema: {
        className: "user-form-control"
      }
    },
    "boolean": {
      configSchema: {
        layout: {
          className: "user-boolean-layout"
        },
        style: {
          width: "20px",
          height: "20px"
        },
        title: {
          style: {
            fontWeight: 400,
            cursor: "pointer",
            marginLeft: "10px",
            alignSelf: "end"
          }
        }
      }
    }
  },
  widget: {
    object: {
      grid: {
        configSchema: {
          widget: {
            itemStyle: {
              display: "flex",
              alignItems: "flex-end"
            }
          }
        }
      }
    }
  }
});

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! easy-peasy */ "./node_modules/easy-peasy/dist/index.js");
/* harmony import */ var _model_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/menu */ "./src/store/model/menu.jsx");
/* harmony import */ var _model_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model/theme */ "./src/store/model/theme.js");



/* harmony default export */ __webpack_exports__["default"] = (Object(easy_peasy__WEBPACK_IMPORTED_MODULE_0__["createStore"])({
  menu: _model_menu__WEBPACK_IMPORTED_MODULE_1__["default"],
  theme: _model_theme__WEBPACK_IMPORTED_MODULE_2__["default"]
}));

/***/ }),

/***/ "./src/store/model/menu.jsx":
/*!**********************************!*\
  !*** ./src/store/model/menu.jsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/find */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/find.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! easy-peasy */ "./node_modules/easy-peasy/dist/index.js");
/* harmony import */ var _sider_documentation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sider/documentation */ "./src/store/model/sider/documentation.jsx");
/* harmony import */ var _sider_examples__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sider/examples */ "./src/store/model/sider/examples.jsx");
/* harmony import */ var _sider_solutions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sider/solutions */ "./src/store/model/sider/solutions.jsx");
/* harmony import */ var _sider_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sider/components */ "./src/store/model/sider/components.jsx");
/* harmony import */ var routes_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! routes/constants */ "./src/routes/constants.js");









/* harmony default export */ __webpack_exports__["default"] = ({
  header: [{
    label: "Документация",
    sider: _sider_documentation__WEBPACK_IMPORTED_MODULE_4__["default"],
    key: routes_constants__WEBPACK_IMPORTED_MODULE_8__["DOCUMENTATION_PATH"]
  }, {
    label: "Виджеты",
    sider: _sider_components__WEBPACK_IMPORTED_MODULE_7__["default"],
    key: routes_constants__WEBPACK_IMPORTED_MODULE_8__["COMPONENTS_PATH"]
  }, {
    label: "Примеры",
    sider: _sider_examples__WEBPACK_IMPORTED_MODULE_5__["default"],
    key: routes_constants__WEBPACK_IMPORTED_MODULE_8__["EXAMPLES_PATH"]
  }, {
    label: "Решения",
    sider: _sider_solutions__WEBPACK_IMPORTED_MODULE_6__["default"],
    key: routes_constants__WEBPACK_IMPORTED_MODULE_8__["SOLUTIONS_PATH"]
  }],
  settings: [{
    key: "settings",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["SettingOutlined"], {
      className: "menu-header-element"
    })
  }],
  menuKey: "/",
  collapsed: false,
  sider: Object(easy_peasy__WEBPACK_IMPORTED_MODULE_3__["computed"])(function (state) {
    var _context;

    var header = _babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_0___default()(_context = state.header).call(_context, function (x) {
      return x.key === state.menuKey;
    });

    if (header) {
      return header.sider;
    } else {
      return null;
    }
  }),
  selectMenu: Object(easy_peasy__WEBPACK_IMPORTED_MODULE_3__["action"])(function (state, payload) {
    state.menuKey = payload;
  }),
  toggleCollapse: Object(easy_peasy__WEBPACK_IMPORTED_MODULE_3__["action"])(function (state, payload) {
    state.collapsed = !state.collapsed;
  })
});

/***/ }),

/***/ "./src/store/model/sider/components.jsx":
/*!**********************************************!*\
  !*** ./src/store/model/sider/components.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var routes_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! routes/constants */ "./src/routes/constants.js");

/* harmony default export */ __webpack_exports__["default"] = ([{
  label: "string",
  key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["COMPONENTS_STRING_PATH"],
  children: [{
    label: "text",
    key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["COMPONENTS_STRING_TEXT_PATH"]
  }, {
    label: "select",
    key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["COMPONENTS_STRING_SELECT_PATH"]
  }]
}, {
  label: "boolean",
  key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["COMPONENTS_BOOLEAN_PATH"],
  children: [{
    label: "checkbox",
    key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["COMPONENTS_BOOLEAN_CHECKBOX_PATH"]
  }, {
    label: "select",
    key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["COMPONENTS_BOOLEAN_SELECT_PATH"]
  }]
}, {
  label: "object",
  key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["COMPONENTS_OBJECT_PATH"],
  children: [{
    label: "grid",
    key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["COMPONENTS_OBJECT_GRID_PATH"]
  }]
}]);

/***/ }),

/***/ "./src/store/model/sider/documentation.jsx":
/*!*************************************************!*\
  !*** ./src/store/model/sider/documentation.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var routes_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! routes/constants */ "./src/routes/constants.js");

/* harmony default export */ __webpack_exports__["default"] = ([{
  label: "Схема",
  key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["DOCUMENTATION_SCHEMA_PATH"]
}, {
  label: "Визуальная схема",
  key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["DOCUMENTATION_CONFIG_SCHEMA_PATH"],
  children: [{
    label: "Элементы",
    key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["DOCUMENTATION_CONFIG_SCHEMA_ELEMENTS_PATH"]
  }, {
    label: "Верстка",
    key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["DOCUMENTATION_CONFIG_SCHEMA_LAYOUT_PATH"]
  }, {
    label: "Стилизация",
    key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["DOCUMENTATION_CONFIG_SCHEMA_STYLES_PATH"]
  }]
}, {
  label: "Типы",
  key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["DOCUMENTATION_TYPES_PATH"],
  children: [{
    label: "Строка",
    key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["DOCUMENTATION_TYPES_STRING_PATH"]
  }, {
    label: "Логическое",
    key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["DOCUMENTATION_TYPES_BOOLEAN_PATH"]
  }, {
    label: "Объект",
    key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["DOCUMENTATION_TYPES_OBJECT_PATH"]
  }]
}, {
  label: "События",
  key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["DOCUMENTATION_EVENTS_PATH"]
}, {
  label: "Умолчания",
  key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["DOCUMENTATION_DEFAULTS_PATH"]
}]);

/***/ }),

/***/ "./src/store/model/sider/examples.jsx":
/*!********************************************!*\
  !*** ./src/store/model/sider/examples.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([]);

/***/ }),

/***/ "./src/store/model/sider/solutions.jsx":
/*!*********************************************!*\
  !*** ./src/store/model/sider/solutions.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var routes_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! routes/constants */ "./src/routes/constants.js");

/* harmony default export */ __webpack_exports__["default"] = ([{
  label: "Динамическая верстка",
  key: routes_constants__WEBPACK_IMPORTED_MODULE_0__["SOLUTIONS_PATH"] + "/0"
}]);

/***/ }),

/***/ "./src/store/model/theme.css":
/*!***********************************!*\
  !*** ./src/store/model/theme.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader!./theme.css */ "./node_modules/css-loader/index.js!./src/store/model/theme.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../../node_modules/css-loader!./theme.css */ "./node_modules/css-loader/index.js!./src/store/model/theme.css", function() {
			var newContent = __webpack_require__(/*! !../../../node_modules/css-loader!./theme.css */ "./node_modules/css-loader/index.js!./src/store/model/theme.css");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/store/model/theme.js":
/*!**********************************!*\
  !*** ./src/store/model/theme.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/map */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/keys */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/find */ "../../node_modules/@babel/runtime-corejs3/core-js-stable/instance/find.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var easy_peasy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! easy-peasy */ "./node_modules/easy-peasy/dist/index.js");
/* harmony import */ var _defaults_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../defaults/user */ "./src/store/defaults/user.js");
/* harmony import */ var _defaults_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../defaults/bootstrap */ "./src/store/defaults/bootstrap.jsx");
/* harmony import */ var _defaults_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../defaults/styles */ "./src/store/defaults/styles.js");
/* harmony import */ var _theme_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./theme.css */ "./src/store/model/theme.css");
/* harmony import */ var _theme_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_theme_css__WEBPACK_IMPORTED_MODULE_7__);








/* harmony default export */ __webpack_exports__["default"] = ({
  defaultsKey: "Пользовательские стили",
  stylesKey: null,
  templates: [{
    title: "Пользовательские стили",
    value: _defaults_user__WEBPACK_IMPORTED_MODULE_4__["default"]
  }, {
    title: "Bootstrap",
    value: _defaults_bootstrap__WEBPACK_IMPORTED_MODULE_5__["default"]
  }],
  styles: _defaults_styles__WEBPACK_IMPORTED_MODULE_6__["default"],
  defaultTypes: Object(easy_peasy__WEBPACK_IMPORTED_MODULE_3__["computed"])(function (state) {
    var _context;

    return _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0___default()(_context = state.templates).call(_context, function (template) {
      return template.title;
    });
  }),
  stylesTypes: Object(easy_peasy__WEBPACK_IMPORTED_MODULE_3__["computed"])(function (state) {
    return _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_1___default()(state.styles);
  }),
  selectedDefaults: Object(easy_peasy__WEBPACK_IMPORTED_MODULE_3__["computed"])(function (state) {
    var _context2;

    return (_babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_2___default()(_context2 = state.templates).call(_context2, function (template) {
      return template.title === state.defaultsKey;
    }) || {
      value: {}
    }).value;
  }),
  selectedStyles: Object(easy_peasy__WEBPACK_IMPORTED_MODULE_3__["computed"])(function (state) {
    if (state.stylesKey && state.defaultsKey === "Bootstrap") {
      return state.styles[state.stylesKey].stylesheet;
    }

    return null;
  }),
  setDefaults: Object(easy_peasy__WEBPACK_IMPORTED_MODULE_3__["action"])(function (state, payload) {
    state.defaultsKey = payload;

    if (payload !== "Bootstrap") {
      state.stylesKey = "";
    }
  }),
  setStyles: Object(easy_peasy__WEBPACK_IMPORTED_MODULE_3__["action"])(function (state, payload) {
    state.stylesKey = payload;
  })
});

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvc3JjL2Zvcm0vc2NoZW1hL3R5cGVzL3N0cmluZy50c3giLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvc3JjL2Zvcm0vc2NoZW1hL3R5cGVzL2Jvb2xlYW4udHN4Iiwid2VicGFjazovLy8uLi9jb3JlL3NyYy9mb3JtL3NjaGVtYS90eXBlcy9vYmplY3QudHN4Iiwid2VicGFjazovLy8uLi9jb3JlL3NyYy9mb3JtL3NjaGVtYS90eXBlcy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvc3JjL2Zvcm0vc2NoZW1hL1NjaGVtYS50c3giLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvc3JjL2Zvcm0vc2NoZW1hL3RlbXBsYXRlcy9sYXlvdXQudHN4Iiwid2VicGFjazovLy8uLi9jb3JlL3NyYy9mb3JtL3NjaGVtYS90ZW1wbGF0ZXMvdGl0bGUudHN4Iiwid2VicGFjazovLy8uLi9jb3JlL3NyYy9mb3JtL3NjaGVtYS90ZW1wbGF0ZXMvaGVscC50c3giLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvc3JjL2Zvcm0vc2NoZW1hL3RlbXBsYXRlcy9kZXNjcmlwdGlvbi50c3giLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvc3JjL2Zvcm0vc2NoZW1hL3RlbXBsYXRlcy9lcnJvci50c3giLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvc3JjL2Zvcm0vc2NoZW1hL3RlbXBsYXRlcy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvc3JjL2Zvcm0vc2NoZW1hL3dpZGdldHMvc3RyaW5nL3RleHQudHN4Iiwid2VicGFjazovLy8uLi9jb3JlL3NyYy9mb3JtL3NjaGVtYS93aWRnZXRzL3N0cmluZy9zZWxlY3QudHN4Iiwid2VicGFjazovLy8uLi9jb3JlL3NyYy9mb3JtL3NjaGVtYS93aWRnZXRzL2Jvb2xlYW4vY2hlY2tib3gudHN4Iiwid2VicGFjazovLy8uLi9jb3JlL3NyYy9mb3JtL3NjaGVtYS93aWRnZXRzL29iamVjdC9ncmlkLnRzeCIsIndlYnBhY2s6Ly8vLi4vY29yZS9zcmMvZm9ybS9zY2hlbWEvd2lkZ2V0cy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvc3JjL2Zvcm0vZGVmYXVsdHMvY2Fub25pemUvcnVsZXMudHN4Iiwid2VicGFjazovLy8uLi9jb3JlL3NyYy9mb3JtL2RlZmF1bHRzL2NvbmZpZy50c3giLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvc3JjL2Zvcm0vZGVmYXVsdHMvc2NoZW1hLnRzeCIsIndlYnBhY2s6Ly8vLi4vY29yZS9zcmMvZm9ybS9kZWZhdWx0cy9jYW5vbml6ZS9jYW5vbml6ZS50c3giLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvc3JjL2Zvcm0vZGVmYXVsdHMvZGF0YS50c3giLCJ3ZWJwYWNrOi8vLy4uL2NvcmUvc3JjL2Zvcm0vaG9va3MvdXNlTGlmZUN5Y2xlLnRzeCIsIndlYnBhY2s6Ly8vLi4vY29yZS9zcmMvZm9ybS9Gb3JtLnRzeCIsIndlYnBhY2s6Ly8vLi4vdXRpbHMvc3JjL2ZpbmRTY2hlbWFEZWZpbml0aW9uLnRzIiwid2VicGFjazovLy8uLi91dGlscy9zcmMvZ3Vlc3NUeXBlLnRzIiwid2VicGFjazovLy8uLi91dGlscy9zcmMvZ2V0U2NoZW1hVHlwZS50cyIsIndlYnBhY2s6Ly8vLi4vdXRpbHMvc3JjL2lzT2JqZWN0LnRzIiwid2VicGFjazovLy8uLi91dGlscy9zcmMvbWVyZ2VTY2hlbWFzLnRzIiwid2VicGFjazovLy8uLi91dGlscy9zcmMvdHJhdmVyc2UudHMiLCJ3ZWJwYWNrOi8vLy4uL3V0aWxzL3NyYy9yZXNvbHZlUmVmZXJlbmNlLnRzIiwid2VicGFjazovLy8uLi91dGlscy9zcmMvZ2V0V2lkZ2V0LnRzIiwid2VicGFjazovLy8uLi91dGlscy9zcmMvdG9Db25zdGFudC50cyIsIndlYnBhY2s6Ly8vLi4vdXRpbHMvc3JjL2hhbmRsZXJzL2FkZGl0aW9uYWxQcm9wZXJ0aWVzLnRzeCIsIndlYnBhY2s6Ly8vLi4vdXRpbHMvc3JjL2hhbmRsZXJzL2FsbE9mLnRzeCIsIndlYnBhY2s6Ly8vLi4vdXRpbHMvc3JjL3V0aWxzLnRzIiwid2VicGFjazovLy8uLi91dGlscy9zcmMvaGFuZGxlcnMvaWYudHN4Iiwid2VicGFjazovLy8uLi91dGlscy9zcmMvaGFuZGxlcnMvZGVwZW5kZW5jaWVzLnRzeCIsIndlYnBhY2s6Ly8vLi4vdXRpbHMvc3JjL2hhbmRsZXJzL3Byb3BlcnRpZXMudHN4Iiwid2VicGFjazovLy8uLi91dGlscy9zcmMvaGFuZGxlcnMvaW5kZXgudHN4Iiwid2VicGFjazovLy8uLi91dGlscy9zcmMvaXNDb25zdGFudC50cyIsIndlYnBhY2s6Ly8vLi4vdXRpbHMvc3JjL2lzU2VsZWN0LnRzIiwid2VicGFjazovLy8uLi91dGlscy9zcmMvc2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUudHMiLCJ3ZWJwYWNrOi8vLy4uL3V0aWxzL3NyYy9yZW5kZXJMYXlvdXQudHN4Iiwid2VicGFjazovLy8uLi91dGlscy9zcmMvY2FuRXhwYW5kLnRzIiwid2VicGFjazovLy8uLi91dGlscy9zcmMvZ2V0T3B0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb21tb24vZWRpdG9yL0VkaXRvci5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9IZWFkZXIuY3NzIiwid2VicGFjazovLy8uL3NyYy9sYXlvdXQvTGF5b3V0LmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L21lbnUvTWVudS5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL21vZGVsL3RoZW1lLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb21tb24vRGVtb0Zvcm0uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9Gb3JtLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb21tb24vZWRpdG9yL0VkaXRvci5jc3M/MzI4YyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9jb21tb24vZWRpdG9yL0VkaXRvci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY29tbW9uL2VkaXRvci9Kc0VkaXRvci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvY29tbW9uL2Vycm9yL0Vycm9yQm91bmRhcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pZnJhbWUvSUZyYW1lLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kb2N1bWVudGF0aW9uL3R5cGVzL0Jvb2xlYW5UeXBlRG9jdW1lbnRhdGlvbi5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvaG9tZS9Ib21lLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9ob21lL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zb2x1dGlvbnMvU29sdXRpb25zLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zb2x1dGlvbnMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3NvbHV0aW9ucy9jb25maWdzLzAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGhlbWUvVGhlbWUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RoZW1lL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9Db250ZW50LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L0hlYWRlci5jc3M/YzJjNSIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L0hlYWRlci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9MYXlvdXQuY3NzP2I3YWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dC9MYXlvdXQuanN4Iiwid2VicGFjazovLy8uL3NyYy9sYXlvdXQvbWVudS9NZW51LmNzcz8yMWQxIiwid2VicGFjazovLy8uL3NyYy9sYXlvdXQvbWVudS9NZW51LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L21lbnUvU2V0dGluZ3NNZW51LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvbGF5b3V0L21lbnUvU2lkZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL2RlZmF1bHRzL2Jvb3RzdHJhcC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL2RlZmF1bHRzL3N0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvZGVmYXVsdHMvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL21vZGVsL21lbnUuanN4Iiwid2VicGFjazovLy8uL3NyYy9zdG9yZS9tb2RlbC9zaWRlci9jb21wb25lbnRzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvbW9kZWwvc2lkZXIvZG9jdW1lbnRhdGlvbi5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL21vZGVsL3NpZGVyL2V4YW1wbGVzLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvbW9kZWwvc2lkZXIvc29sdXRpb25zLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvbW9kZWwvdGhlbWUuY3NzPzM5YTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL21vZGVsL3RoZW1lLmpzIl0sIm5hbWVzIjpbIlN0cmluZ0ZpZWxkIiwicHJvcHMiLCJzY2hlbWEiLCJjb25maWdTY2hlbWEiLCJkYXRhIiwicmVxdWlyZWQiLCJkaXNhYmxlZCIsImF1dG9mb2N1cyIsImVycm9ycyIsIndpZGdldCIsIldpZGdldCIsIm9uQmx1ciIsIm9uRm9jdXMiLCJvbkNoYW5nZSIsImV2ZW50cyIsIm9wdGlvbnMiLCJnZXRPcHRpb25zIiwiZXhhbXBsZXMiLCJwbGFjZWhvbGRlciIsImRpc2FibGVkT3B0aW9ucyIsImNsYXNzTmFtZSIsImlkIiwic3R5bGUiLCJ0aGVtZSIsIndpZGdldFByb3BzIiwidmFsdWUiLCJSZWFjdCIsImdldEJvb2xlYW5PcHRpb25zIiwiQXJyYXkiLCJpc0FycmF5Iiwib25lT2YiLCJtYXAiLCJvcHRpb24iLCJ0aXRsZSIsImNvbnN0IiwiZW51bSIsImVudW1OYW1lcyIsIkJvb2xlYW5GaWVsZCIsInNjaGVtYVJlcXVpcmVzVHJ1ZVZhbHVlIiwib3JkZXJQcm9wZXJ0aWVzIiwicHJvcGVydGllcyIsIm9yZGVyIiwiYXJyYXlUb0hhc2giLCJhcnIiLCJyZWR1Y2UiLCJwcmV2IiwiY3VyciIsImVycm9yUHJvcExpc3QiLCJsZW5ndGgiLCJqb2luIiwicHJvcGVydHlIYXNoIiwib3JkZXJGaWx0ZXJlZCIsImZpbHRlciIsInByb3AiLCJvcmRlckhhc2giLCJyZXN0IiwicmVzdEluZGV4IiwiaW5kZXhPZiIsIkVycm9yIiwibGFzdEluZGV4T2YiLCJjb21wbGV0ZSIsInNwbGljZSIsImlzUmVxdWlyZWQiLCJuYW1lIiwib25Qcm9wZXJ0eUNoYW5nZWQiLCJuZXdEYXRhIiwiaXNPYmplY3QiLCJPYmplY3RGaWVsZCIsImV2ZW50U2NoZW1hIiwicmVhZFNjaGVtYSIsInByb3BlcnRpZXNMaXN0IiwiT2JqZWN0Iiwia2V5cyIsIl9zY2hlbWEiLCJhZGRpdGlvbmFsIiwiaXNBZGRpdGlvbmFsIiwibWVyZ2VTY2hlbWFzIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJhIiwiYiIsInR5cGVzIiwic3RyaW5nIiwibnVtYmVyIiwiaW50ZWdlciIsImJvb2xlYW4iLCJvYmplY3QiLCJhcnJheSIsIm51bGwiLCJjYW5vbml6ZUZpZWxkSXRlbVByb3BzIiwiaXRlbSIsInN0YW5kYXJkIiwidW5kZWZpbmVkIiwidGV4dCIsImNhbm9uaXplRXJyb3JGaWVsZFByb3BzIiwicHVzaCIsImdldFR5cGVUZW1wbGF0ZSIsInR5cGUiLCJmaWVsZCIsImdldEZpZWxkVGVtcGxhdGUiLCJ0ZW1wbGF0ZSIsImxheW91dCIsImNvbW1vbiIsInByb2Nlc3NWYWx1ZSIsImVtcHR5Iiwid3JhcEV2ZW50IiwiZXZlbnQiLCJ1c2VySGFuZGxlciIsInZhbCIsIndyYXBOb0FyZ0V2ZW50IiwiY2hpbGRyZW4iLCJrZXkiLCJzdGFydHNXaXRoIiwib2JqIiwib25DaGFuZ2VFdmVudCIsIm9uQmx1ckV2ZW50Iiwib25Gb2N1c0V2ZW50IiwiX29uQ2hhbmdlIiwieCIsIl9vbkJsdXIiLCJfb25Gb2N1cyIsIndpZGdldHMiLCJkZWZhdWx0cyIsInVzZUNvbnRleHQiLCJKRm9ybUNvbnRleHQiLCJ0aXRsZVByb3BzIiwiZGlzcGxheSIsInVzZU5hbWUiLCJkZXNjUHJvcHMiLCJkZXNjcmlwdGlvbiIsImhlbHBQcm9wcyIsImhlbHAiLCJlcnJvclByb3BzIiwiZXJyb3IiLCJjb21wdXRlZFNjaGVtYSIsInVzZU1lbW8iLCJyZXRyaWV2ZVNjaGVtYSIsIkZpZWxkVGVtcGxhdGUiLCJUeXBlVGVtcGxhdGUiLCJnZXRXaWRnZXQiLCJoaWRkZW4iLCJlcnJvckNsYXNzTmFtZSIsInJvb3RDbGFzc05hbWUiLCJ0YWciLCJyZW5kZXIiLCJyZWFkT25seSIsImNvbXB1dGVJdGVtIiwiY2ZnIiwiY29tcHV0ZUR5bmFtaWNDb25maWd1cmFibGUiLCJkeW5hIiwiZW50cmllcyIsIl9uYW1lIiwiZ2V0RmllbGRJdGVtSGFuZGxlciIsIl9kZWYiLCJvdGhlclByb3BzIiwiZGVmIiwibWVyZ2VkIiwibWVyZ2VkSXRlbSIsImRlZmF1bHRMYXlvdXRTdHlsZXMiLCJicmVha3BvaW50cyIsInhzIiwic20iLCJtZCIsImxnIiwieGwiLCJjb250YWluZXJNYXhXaWR0aHMiLCJjb2x1bW5zIiwiZ3V0dGVyV2lkdGgiLCJkZWZhdWx0TGF5b3V0IiwiY29uZmlnIiwiVGFnIiwiVGl0bGVGaWVsZCIsIkRlc2NyaXB0aW9uRmllbGQiLCJIZWxwRmllbGQiLCJFcnJvcnNGaWVsZCIsImVuYWJsZSIsImVycm9yQ2xhc3MiLCJyb3dFbGVtZW50cyIsIl9yZW5kZXIiLCJUaXRsZSIsIkRlc2NyaXB0aW9uIiwiRXJyb3JzIiwiSGVscCIsInJlbmRlckxheW91dCIsInJvd1Byb3BzIiwiQ29sIiwic3R5bGVzIiwiaW5kZXgiLCJSb3ciLCJDb250YWluZXIiLCJSZXF1aXJlZFRhZyIsImVsZW0iLCJkZWZhdWx0VGVtcGxhdGUiLCJzdGF0ZSIsInZpZXciLCJsb2FkaW5nIiwiYWN0aW9ucyIsImJ1dHRvbiIsInRpcCIsImNsb25lRGVlcCIsIlRleHRXaWRnZXQiLCJhdXRvRm9jdXMiLCJlIiwidGFyZ2V0IiwiU2V0IiwiY29uY2F0IiwiZGVmYXVsdCIsImV4YW1wbGUiLCJTZWxlY3RXaWRnZXQiLCJsYWJlbCIsImkiLCJDaGVja2JveFdpZGdldCIsImNoZWNrZWQiLCJoYW5kbGVSZW1vdmVLZXkiLCJoYW5kbGVyIiwicmVzdWx0IiwicmVtb3ZlS2V5IiwiaGFuZGxlQWRkS2V5IiwiR3JpZFdpZGdldCIsIm9uQ2hhbmdlT2JqZWN0IiwiaXRlbUNsYXNzTmFtZSIsIml0ZW1TdHlsZSIsImFkZGl0aW9uYWxJdGVtQ2xhc3NOYW1lIiwiYWN0aW9uc0NsYXNzTmFtZSIsImFjdGlvbkNsYXNzTmFtZSIsImFkZEtleUJ1dHRvbiIsInJlbW92ZUtleUJ1dHRvbiIsIm9uQWRkS2V5Iiwib25SZW1vdmVLZXkiLCJfbGF5b3V0Iiwib3B0aW9uYWwiLCJvdGhlciIsIl9zdHlsZSIsImlzRmlsbGVkIiwiZmllbGROYW1lIiwiaXNUcnVlIiwib3B0aW9uYWxBcGkiLCJVSUNvbXBvbmVudCIsIlNjaGVtYSIsIm9uQ2xpY2siLCJjYW5FeHBhbmQiLCJkZWZhdWx0V2lkZ2V0cyIsInNlbGVjdCIsImNoZWNrYm94IiwiZ3JpZCIsInN0ck9yRnVuYyIsImFyZyIsImFycmF5T3JGdW5jIiwiY2Fub25pemF0aW9uUnVsZXMiLCJydWxlcyIsImRlZmF1bHRSdWxlcyIsImdldFNjaGVtYVR5cGUiLCJfYXBwbHlEZWZhdWx0cyIsInJlc29sdmVSZWZlcmVuY2UiLCJ0cmF2ZXJzZSIsIm1lcmdlQ2FzZXMiLCJkZWZpbmVkIiwibWVyZ2VTY2hlbWEiLCJtZXJnZU90aGVyIiwiZnV0dXJlV2lkZ2V0IiwiaXNUcnV0aFNjaGVtYSIsImFwcGx5RGVmYXVsdHMiLCJjYW5vbml6ZURlZmF1bHRzIiwiZm9yRWFjaCIsInJ1bGUiLCJ0eXBlS2V5Iiwid2lkZ2V0S2V5Iiwid2lkZ2V0RWxlbWVudEtleSIsIm1lcmdlIiwiX2NvbXB1dGVJbml0aWFscyIsInBhcmVudERlZmF1bHRzIiwicm9vdFNjaGVtYSIsIl9kYXRhIiwiJHJlZiIsInJlZlNjaGVtYSIsImZpbmRTY2hlbWFEZWZpbml0aW9uIiwiZGVwZW5kZW5jaWVzIiwicmVzb2x2ZWRTY2hlbWEiLCJyZXNvbHZlRGVwZW5kZW5jaWVzIiwiZ2V0TWF0Y2hpbmdPcHRpb24iLCJhbnlPZiIsImFjYyIsImNvbXB1dGVkRGVmYXVsdCIsImlkeCIsIml0ZW1zIiwiYWRkaXRpb25hbEl0ZW1zIiwibWVyZ2VEZWZhdWx0c1dpdGhGb3JtRGF0YSIsImFzc2lnbiIsImNvbXB1dGVJbml0aWFscyIsImluaXQiLCJzZXRJbml0IiwidXNlU3RhdGUiLCJsb2FkaW5nSW5pdCIsInNldExvYWRpbmdJbml0IiwiZGlkTW91bnQiLCJkaWRVcGRhdGUiLCJkZXBzIiwidXNlRWZmZWN0IiwiZXh0cmFjdFNjaGVtYUZyb21Qcm9wcyIsInZhbGlkYXRpb25TY2hlbWEiLCJydWxlc1NjaGVtYSIsImNyZWF0ZUNvbnRleHQiLCJGb3JtIiwic2NoZW1hSW5pdGlhbGl6ZWQiLCJzZXREYXRhIiwiYmVmb3JlRGVmYXVsdHMiLCJzZXRCZWZvcmVEZWZhdWx0cyIsImpzY2hlbWEiLCJzZXRKc2NoZW1hIiwiY29tcHV0ZWRUZW1wbGF0ZSIsImdldERlZmF1bHRUZW1wbGF0ZSIsImNvbXB1dGVkV2lkZ2V0cyIsImdldERlZmF1bHRXaWRnZXRzIiwiY29tcHV0ZWREZWZhdWx0cyIsImdldERlZmF1bHRzIiwiaXNFcXVhbCIsInVwZGF0ZURhdGEiLCJvblN1Ym1pdCIsImV4dGVuZFNjaGVtYXMiLCJpbml0aWFsU2NoZW1hIiwiZGF0YVdpdGhEZWZhdWx0cyIsInVzZUxpZmVDeWNsZSIsImRpZFVwZGF0ZURhdGEiLCJQcm92aWRlciIsInJlZiIsImRlY29kZVVSSUNvbXBvbmVudCIsInN1YnN0cmluZyIsImN1cnJlbnQiLCJqc29ucG9pbnRlciIsImdldCIsInN1YlNjaGVtYSIsIm9taXQiLCJndWVzc1R5cGUiLCJpc05hTiIsImluY2x1ZGVzIiwiZmluZCIsInRoaW5nIiwiRmlsZSIsImN1c3RvbWl6ZXIiLCJzb3VyY2UiLCJ1bmlvbiIsImVuZHNXaXRoIiwic3BsaXQiLCJhcmdzIiwibWVyZ2VXaXRoIiwiaWdub3JlIiwiY29udGFpbnMiLCJwcm9wZXJ0eU5hbWVzIiwibm90IiwidGhlbiIsImFsbE9mIiwiJGRlZnMiLCJkZWZpbml0aW9ucyIsInBhdHRlcm5Qcm9wZXJ0aWVzIiwiaWdub3JlUGF0aHMiLCJfYWRkaXRpb25hbFNjaGVtYXMiLCJfdHJhdmVyc2UiLCJzY2hlbWFPclN1YnNjaGVtYSIsIl9iIiwiX3BhdGgiLCJwcm9wZXJ0eVBhdGgiLCJyZXBsYWNlIiwiUmVnRXhwIiwib2JqZWN0UGF0aCIsIl9hZGRpdGlvbmFsU3ViU2NoZW1hcyIsImsiLCJ2IiwiXyIsIm11dGF0aW9uIiwiX211dGF0ZWRTdWJzY2hlbWFzIiwic2V0IiwiYmZzIiwibXV0YWJsZSIsImNvcHlPck5vdCIsInMxIiwiczIiLCJyZWZsZXNzQ29weSIsIkRlcmVmZXJlbmNlciIsInJlY3Vyc2l2ZSIsIiRpZCIsInJlZkNhY2hlIiwicmVmcyIsImNvbGxlY3RSZWZzIiwicmVzb2x2ZSIsInJlZk1hcCIsInVuZmV0Y2hlZFJlZnMiLCJyIiwiZmV0Y2hlZCIsInN1YkRlcmVmZmVyT3B0cyIsInN1YkRlcmVmZmVyIiwic3ViRmV0Y2hlZFByb20iLCJzIiwicmVmZmVkU2NoZW1hIiwiZm91bmRXaWRnZXQiLCJ0b0NvbnN0YW50IiwiQURESVRJT05BTF9QUk9QRVJUWV9GTEFHIiwiZ3Vlc3NlZCIsInJlc29sdmVBbGxPZk1lcmdlIiwiX3Jvb3RTY2hlbWEiLCJtZXJnZUFsbE9mIiwicmVzb2x2ZWRTY2hlbWFXaXRob3V0QWxsT2YiLCJyZXNvbHZlQWxsT2YiLCJhbGxPZlN1YnNjaGVtYSIsImNyZWF0ZUFqdkluc3RhbmNlIiwiQWp2IiwiYWxsRXJyb3JzIiwibXVsdGlwbGVPZlByZWNpc2lvbiIsIklEX1BSRUZJWCIsImFqdiIsIndpdGhJZFJlZlByZWZpeCIsInNjaGVtYU5vZGUiLCJjb25zdHJ1Y3RvciIsImlzVmFsaWQiLCJhZGRTY2hlbWEiLCJ2YWxpZGF0ZSIsInJlbW92ZVNjaGVtYSIsImV4cHJlc3Npb24iLCJvdGhlcndpc2UiLCJyZXNvbHZlZFNjaGVtYUxlc3NDb25kaXRpb25hbCIsImNvbmRpdGlvbmFsU2NoZW1hIiwiJHJlZlNjaGVtYSIsImxvY2FsU2NoZW1hIiwid2l0aEV4YWN0bHlPbmVTdWJzY2hlbWEiLCJkZXBlbmRlbmN5S2V5IiwidmFsaWRTdWJzY2hlbWFzIiwic3Vic2NoZW1hIiwiY29uZGl0aW9uUHJvcGVydHlTY2hlbWEiLCJjb25kaXRpb25TY2hlbWEiLCJjb25zb2xlIiwid2FybiIsImRlcGVuZGVudFN1YnNjaGVtYSIsImRlcGVuZGVudFNjaGVtYSIsIndpdGhEZXBlbmRlbnRTY2hlbWEiLCJkZXBlbmRlbmN5VmFsdWUiLCJyZXNvbHZlZE9uZU9mIiwicHJvY2Vzc0RlcGVuZGVuY2llcyIsInJlbWFpbmluZ0RlcGVuZGVuY2llcyIsIndpdGhEZXBlbmRlbnRQcm9wZXJ0aWVzIiwiYWRkaXRpb25hbGx5UmVxdWlyZWQiLCJmcm9tIiwicmVxdWlyZXNBbnlPZiIsImF1Z21lbnRlZFNjaGVtYSIsInNoYWxsb3dDbG9uZSIsInNsaWNlIiwiX3Jlc29sdmVEZXBlbmRlbmNpZXMiLCJwcm9wTmFtZSIsInByb3BTY2hlbWEiLCJyYXdQcm9wRGF0YSIsInByb3BEYXRhIiwicmVzb2x2ZWRQcm9wU2NoZW1hIiwiaGFuZGxlcnMiLCJhbGxPZl9iZWZvcmUiLCJyZXNvbHZlQ29uZGl0aW9uIiwicmVzb2x2ZVByb3BlcnRpZXMiLCJhbGxPZl9hZnRlciIsInJlc29sdmVBZGRpdGlvbmFsIiwiaXNDb25zdGFudCIsImlzU2VsZWN0IiwiYWx0U2NoZW1hcyIsImV2ZXJ5Iiwic29tZSIsImNvbCIsInJvdyIsIm1heFByb3BlcnRpZXMiLCJTdHJpbmciLCJBcHAiLCJEZW1vRm9ybSIsIndpdGhFcnJvckJvdW5kYXJ5IiwiaGVpZ2h0Iiwic2VsZWN0ZWRTdHlsZXMiLCJ1c2VTdG9yZVN0YXRlIiwidXNlRXJyb3JCb3VuZGFyeSIsInJlc2V0RXJyb3IiLCJ0b1N0cmluZyIsInNlbGVjdGVkRGVmYXVsdHMiLCJUYWJQYW5lIiwibW9uYWNvRWRpdG9yT3B0aW9ucyIsIm1pbmltYXAiLCJlbmFibGVkIiwiYXV0b21hdGljTGF5b3V0IiwiY3JlYXRlRWRpdG9yIiwiZWRpdG9yIiwiSlNPTiIsInBhcnNlIiwiRWRpdG9yIiwiZm9ybVByb3BzIiwiY29kZSIsInNob3ciLCJ1c2VUYWJzIiwiY2hhbmdlU2NoZW1hIiwiY2hhbmdlQ29uZmlnU2NoZW1hIiwiY2hhbmdlRGF0YSIsInNob3dFZGl0b3IiLCJzZXRTaG93RWRpdG9yIiwiZWRpdG9ycyIsImpzeCIsImNvbnRlbnQiLCJmb3JtIiwiclRhYnMiLCJzdHIiLCJKc0VkaXRvciIsIkVycm9yQm91bmRhcnkiLCJzZXRTdGF0ZSIsIm9uRXJyb3IiLCJDb21wb25lbnQiLCJub29wIiwiZXJyb3JCb3VuZGFyeUNvbnRleHQiLCJjb21wb25lbnREaWRDYXRjaCIsInNldEVycm9yIiwiRXJyb3JCb3VuZGFyeUNvbnRleHQiLCJ1c2VSZWYiLCJjdHgiLCJjcmVhdGVFbGVtZW50IiwiZXJyb3JJbmZvIiwiV3JhcHBlZENvbXBvbmVudCIsIldpdGhFcnJvckJvdW5kYXJ5IiwidXNlQ2FsbGJhY2siLCJJRnJhbWUiLCJjb250ZW50UmVmIiwic2V0Q29udGVudFJlZiIsIm1vdW50Tm9kZSIsImNvbnRlbnRXaW5kb3ciLCJkb2N1bWVudCIsImJvZHkiLCJzeW5jIiwic3R5bGVzSHRtbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JtRnJhbWUiLCJxdWVyeVNlbGVjdG9yIiwic3R5bGVzRnJhbWUiLCJoZWFkIiwiZWxlbWVudCIsInJlbW92ZSIsIm5ld1N0eWxlRWxlbWVudCIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJsb2ciLCJwb3NpdGlvbiIsIndpZHRoIiwiY3JlYXRlUG9ydGFsIiwiQm9vbGVhblR5cGVEb2N1bWVudGF0aW9uIiwiSG9tZSIsInRleHRBbGlnbiIsInBhZGRpbmdCb3R0b20iLCJmb250U2l6ZSIsImJvcmRlckJvdHRvbSIsIlNPTFVUSU9OU19QQVRIIiwiU29sdXRpb25zIiwidXNlUGFyYW1zIiwiXzAiLCJ1c2VyIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJpbWFnZSIsImRldGFpbHMiLCJlcnJvclNjaGVtYSIsImFnZSIsImJpbyIsIiR1c2VyIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsIiRpbWFnZSIsIm1hcmdpbkJvdHRvbSIsIlRoZW1lIiwiZGVmYXVsdHNLZXkiLCJkZWZhdWx0VHlwZXMiLCJzdHlsZXNLZXkiLCJzdHlsZXNUeXBlcyIsImNoYW5nZURlZmF1bHRzIiwidXNlU3RvcmVBY3Rpb25zIiwic2V0RGVmYXVsdHMiLCJjaGFuZ2VTdHlsZXMiLCJzZXRTdHlsZXMiLCIkc3R5bGVzIiwiJGRlZmF1bHRzIiwic3RvcmUiLCJnZXRFbGVtZW50QnlJZCIsIkNvbnRlbnQiLCJyb3V0ZXMiLCJ1c2VSb3V0ZXMiLCJyb3V0ZXNDb25maWciLCJwYWRkaW5nIiwibWluSGVpZ2h0IiwiSGVhZGVyIiwiY29sbGFwc2VkIiwibWVudSIsInRvZ2dsZUNvbGxhcHNlIiwiekluZGV4IiwibWFyZ2luVG9wIiwiaGVhZGVyIiwic2VsZWN0TWVudSIsIm5hdmlnYXRlIiwidXNlTmF2aWdhdGUiLCJ1c2VMb2NhdGlvbiIsInBhdGhuYW1lIiwic2V0dGluZ3MiLCJ2aXNpYmxlIiwic2V0VmlzaWJsZSIsImhhbmRsZVNldHRpbmdTZWxlY3QiLCJTaWRlciIsInNpZGVyIiwiQ09NUE9ORU5UU19QQVRIIiwiQ09NUE9ORU5UU19TVFJJTkdfUEFUSCIsIkNPTVBPTkVOVFNfU1RSSU5HX1RFWFRfUEFUSCIsIkNPTVBPTkVOVFNfU1RSSU5HX1NFTEVDVF9QQVRIIiwiQ09NUE9ORU5UU19CT09MRUFOX1BBVEgiLCJDT01QT05FTlRTX0JPT0xFQU5fQ0hFQ0tCT1hfUEFUSCIsIkNPTVBPTkVOVFNfQk9PTEVBTl9TRUxFQ1RfUEFUSCIsIkNPTVBPTkVOVFNfT0JKRUNUX1BBVEgiLCJDT01QT05FTlRTX09CSkVDVF9HUklEX1BBVEgiLCJET0NVTUVOVEFUSU9OX1BBVEgiLCJET0NVTUVOVEFUSU9OX1NDSEVNQV9QQVRIIiwiRE9DVU1FTlRBVElPTl9DT05GSUdfU0NIRU1BX1BBVEgiLCJET0NVTUVOVEFUSU9OX0NPTkZJR19TQ0hFTUFfRUxFTUVOVFNfUEFUSCIsIkRPQ1VNRU5UQVRJT05fQ09ORklHX1NDSEVNQV9MQVlPVVRfUEFUSCIsIkRPQ1VNRU5UQVRJT05fQ09ORklHX1NDSEVNQV9TVFlMRVNfUEFUSCIsIkRPQ1VNRU5UQVRJT05fVFlQRVNfUEFUSCIsIkRPQ1VNRU5UQVRJT05fVFlQRVNfU1RSSU5HX1BBVEgiLCJET0NVTUVOVEFUSU9OX1RZUEVTX0JPT0xFQU5fUEFUSCIsIkRPQ1VNRU5UQVRJT05fVFlQRVNfT0JKRUNUX1BBVEgiLCJET0NVTUVOVEFUSU9OX0VWRU5UU19QQVRIIiwiRE9DVU1FTlRBVElPTl9ERUZBVUxUU19QQVRIIiwiRVhBTVBMRVNfUEFUSCIsInBhdGgiLCJwYWRkaW5nUmlnaHQiLCJjZXJ1bGVhbiIsInN0eWxlc2hlZXQiLCJjb3NtbyIsImN5Ym9yZyIsImRhcmtseSIsImZsYXRseSIsImpvdXJuYWwiLCJsdW1lbiIsInBhcGVyIiwicmVhZGFibGUiLCJzYW5kc3RvbmUiLCJzaW1wbGV4Iiwic2xhdGUiLCJzcGFjZWxhYiIsInN1cGVyaGVybyIsInVuaXRlZCIsInlldGkiLCJmb250V2VpZ2h0IiwiY3Vyc29yIiwibWFyZ2luTGVmdCIsImFsaWduU2VsZiIsImFsaWduSXRlbXMiLCJjcmVhdGVTdG9yZSIsImRvY3VtZW50YXRpb24iLCJjb21wb25lbnRzIiwic29sdXRpb25zIiwiaWNvbiIsIm1lbnVLZXkiLCJjb21wdXRlZCIsImFjdGlvbiIsInBheWxvYWQiLCJ0ZW1wbGF0ZXMiLCJ1c2VyRGVmYXVsdHMiLCJib290c3RyYXBEZWZhdWx0cyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxHQUFHOztRQUVIO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQSw2QkFBNkI7UUFDN0IsNkJBQTZCO1FBQzdCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EscUJBQXFCLGdCQUFnQjtRQUNyQztRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLHFCQUFxQixnQkFBZ0I7UUFDckM7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQSxrQkFBa0IsOEJBQThCO1FBQ2hEO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLG9CQUFvQiwyQkFBMkI7UUFDL0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0EsbUJBQW1CLGNBQWM7UUFDakM7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQixLQUFLO1FBQ3JCO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsZ0JBQWdCLFlBQVk7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQSxjQUFjLDRCQUE0QjtRQUMxQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7O1FBRUo7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQSxlQUFlLDRCQUE0QjtRQUMzQztRQUNBO1FBQ0E7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TyxLQUFLLENBQUNxWCxTQUFuQixFQUE4QjRELFVBQXJDO0lBQ0g7O0lBQ0QsT0FBTyxJQUFQO0VBQ0gsQ0FMdUIsQ0E3QmI7RUFvQ1h4RCxXQUFXLEVBQUVvRix5REFBTSxDQUFDLFVBQUM3YyxLQUFELEVBQVE4YyxPQUFSLEVBQW9CO0lBQ3BDOWMsS0FBSyxDQUFDbVgsV0FBTixHQUFvQjJGLE9BQXBCOztJQUNBLElBQUdBLE9BQU8sS0FBSyxXQUFmLEVBQTRCO01BQ3hCOWMsS0FBSyxDQUFDcVgsU0FBTixHQUFrQixFQUFsQjtJQUNIO0VBQ0osQ0FMa0IsQ0FwQ1I7RUEyQ1hNLFNBQVMsRUFBRWtGLHlEQUFNLENBQUMsVUFBQzdjLEtBQUQsRUFBUThjLE9BQVIsRUFBb0I7SUFDbEM5YyxLQUFLLENBQUNxWCxTQUFOLEdBQWtCeUYsT0FBbEI7RUFDSCxDQUZnQjtBQTNDTixDQUFmLEUiLCJmaWxlIjoiQGpmb3JtL2RlbW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjVhNzYyZDdmZmZhYzhlNGVhMDM5XCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmSW52YWxpZGF0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcbiBcdFx0XHRpbnZhbGlkYXRlOiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdHRoaXMuX3NlbGZJbnZhbGlkYXRlZCA9IHRydWU7XG4gXHRcdFx0XHRzd2l0Y2ggKGhvdFN0YXR1cykge1xuIFx0XHRcdFx0XHRjYXNlIFwiaWRsZVwiOlxuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInJlYWR5XCI6XG4gXHRcdFx0XHRcdFx0aG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZShtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJwcmVwYXJlXCI6XG4gXHRcdFx0XHRcdGNhc2UgXCJjaGVja1wiOlxuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZVwiOlxuIFx0XHRcdFx0XHRjYXNlIFwiYXBwbHlcIjpcbiBcdFx0XHRcdFx0XHQoaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID1cbiBcdFx0XHRcdFx0XHRcdGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyB8fCBbXSkucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0Ly8gaWdub3JlIHJlcXVlc3RzIGluIGVycm9yIHN0YXRlc1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoLCBob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXM7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSA/IFwicmVhZHlcIiA6IFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiBcdFx0cmV0dXJuIGhvdEFwcGx5SW50ZXJuYWwob3B0aW9ucyk7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5SW50ZXJuYWwob3B0aW9ucykge1xuIFx0XHRob3RBcHBseUludmFsaWRhdGVkTW9kdWxlcygpO1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdCFtb2R1bGUgfHxcbiBcdFx0XHRcdFx0KG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCAmJiAhbW9kdWxlLmhvdC5fc2VsZkludmFsaWRhdGVkKVxuIFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkICYmXG4gXHRcdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlICYmXG4gXHRcdFx0XHQvLyB3aGVuIGNhbGxlZCBpbnZhbGlkYXRlIHNlbGYtYWNjZXB0aW5nIGlzIG5vdCBwb3NzaWJsZVxuIFx0XHRcdFx0IWluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkludmFsaWRhdGVkXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdHBhcmVudHM6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLnBhcmVudHMuc2xpY2UoKSxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aWYgKGhvdFVwZGF0ZU5ld0hhc2ggIT09IHVuZGVmaW5lZCkge1xuIFx0XHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdW5kZWZpbmVkO1xuIFx0XHR9XG4gXHRcdGhvdFVwZGF0ZSA9IHVuZGVmaW5lZDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gaXRlbS5wYXJlbnRzO1xuIFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IG1vZHVsZUlkO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRpZiAoaG90UXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG4gXHRcdFx0cmV0dXJuIGhvdEFwcGx5SW50ZXJuYWwob3B0aW9ucykudGhlbihmdW5jdGlvbihsaXN0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbihtb2R1bGVJZCkge1xuIFx0XHRcdFx0XHRpZiAobGlzdC5pbmRleE9mKG1vZHVsZUlkKSA8IDApIGxpc3QucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHJldHVybiBsaXN0O1xuIFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseUludmFsaWRhdGVkTW9kdWxlcygpIHtcbiBcdFx0aWYgKGhvdFF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuIFx0XHRcdGlmICghaG90VXBkYXRlKSBob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHRob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMuZm9yRWFjaChob3RBcHBseUludmFsaWRhdGVkTW9kdWxlKTtcbiBcdFx0XHRob3RRdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgPSB1bmRlZmluZWQ7XG4gXHRcdFx0cmV0dXJuIHRydWU7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHlJbnZhbGlkYXRlZE1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHRpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIG1vZHVsZUlkKSlcbiBcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9kdWxlc1ttb2R1bGVJZF07XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm1haW5cIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJAamZvcm0vXCIgKyBjaHVua0lkICsgXCIuZGVtby5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcbiBcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi9cIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9yc35tYWluXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0IFJlYWN0LCB7UmVhY3RFbGVtZW50fSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHtUeXBlUHJvcHN9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7U3RyaW5nV2lkZ2V0UHJvcHN9IGZyb20gXCIuLi93aWRnZXRzL2luZGV4XCI7XHJcbmltcG9ydCB7Z2V0T3B0aW9uc30gZnJvbSBcIkBqZm9ybS91dGlsc1wiO1xyXG5cclxuY29uc3QgU3RyaW5nRmllbGQgPSAocHJvcHM6IFR5cGVQcm9wcyk6IFJlYWN0RWxlbWVudDxTdHJpbmdXaWRnZXRQcm9wcywgYW55PiA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgICAgc2NoZW1hLFxyXG4gICAgICAgIGNvbmZpZ1NjaGVtYSA9IHt9LFxyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgcmVxdWlyZWQsXHJcbiAgICAgICAgZGlzYWJsZWQsXHJcbiAgICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICAgIGVycm9ycyxcclxuICAgICAgICB3aWRnZXQ6IFdpZGdldCxcclxuICAgICAgICBvbkJsdXIsXHJcbiAgICAgICAgb25Gb2N1cyxcclxuICAgICAgICBvbkNoYW5nZSxcclxuICAgICAgICBldmVudHNcclxuICAgIH0gPSBwcm9wcztcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IGdldE9wdGlvbnM8c3RyaW5nPihzY2hlbWEsIGNvbmZpZ1NjaGVtYSk7XHJcblxyXG4gICAgY29uc3Qge2V4YW1wbGVzfSA9IHNjaGVtYTtcclxuICAgIGNvbnN0IHtwbGFjZWhvbGRlciwgZGlzYWJsZWRPcHRpb25zLCBjbGFzc05hbWUsIGlkLCBzdHlsZSwgdGhlbWUsIHdpZGdldH0gPSBjb25maWdTY2hlbWE7XHJcblxyXG4gICAgY29uc3Qgd2lkZ2V0UHJvcHMgPSB7XHJcbiAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICBkaXNhYmxlZE9wdGlvbnMsXHJcbiAgICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICAgIHNjaGVtYSxcclxuICAgICAgICBjb25maWdTY2hlbWEsXHJcbiAgICAgICAgZGlzYWJsZWQsXHJcbiAgICAgICAgdmFsdWU6IGRhdGEsXHJcbiAgICAgICAgcmVxdWlyZWQsXHJcbiAgICAgICAgb25DaGFuZ2UsXHJcbiAgICAgICAgb25CbHVyLFxyXG4gICAgICAgIG9uRm9jdXMsXHJcbiAgICAgICAgZXJyb3JzLFxyXG4gICAgICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgICAgIGNsYXNzTmFtZSxcclxuICAgICAgICBpZCxcclxuICAgICAgICBzdHlsZSxcclxuICAgICAgICBldmVudHMsXHJcbiAgICAgICAgZXhhbXBsZXMsXHJcbiAgICAgICAgdGhlbWUsXHJcbiAgICAgICAgd2lkZ2V0XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIDxXaWRnZXQgey4uLndpZGdldFByb3BzfS8+XHJcbiAgICApXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdHJpbmdGaWVsZDsiLCJpbXBvcnQgUmVhY3QsIHtSZWFjdEVsZW1lbnR9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQge0Jvb2xlYW5XaWRnZXRQcm9wc30gZnJvbSBcIi4uL3dpZGdldHNcIjtcclxuaW1wb3J0IHtUeXBlUHJvcHN9IGZyb20gXCIuLi8uLi9zY2hlbWEvdHlwZXNcIjtcclxuaW1wb3J0IHtnZXRPcHRpb25zLCBzY2hlbWFSZXF1aXJlc1RydWVWYWx1ZX0gZnJvbSBcIkBqZm9ybS91dGlsc1wiO1xyXG5pbXBvcnQge0pTT05TY2hlbWE3fSBmcm9tIFwianNvbi1zY2hlbWFcIjtcclxuaW1wb3J0IHtDb25maWdTY2hlbWF9IGZyb20gXCJ0eXBlc1wiO1xyXG5cclxuY29uc3QgZ2V0Qm9vbGVhbk9wdGlvbnMgPSAoc2NoZW1hOiBKU09OU2NoZW1hNywgY29uZmlnU2NoZW1hOiBDb25maWdTY2hlbWEpID0+IHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5vbmVPZikpIHtcclxuICAgICAgICByZXR1cm4gZ2V0T3B0aW9ucyh7XHJcbiAgICAgICAgICAgIG9uZU9mOiBzY2hlbWEub25lT2YubWFwKChvcHRpb24pID0+ICh7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIC4uLm9wdGlvbiwgdGl0bGU6IG9wdGlvbi50aXRsZSB8fCAob3B0aW9uLmNvbnN0ID09PSB0cnVlID8gXCJZZXNcIiA6IFwiTm9cIiksXHJcbiAgICAgICAgICAgIH0pKSxcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGdldE9wdGlvbnMoe1xyXG4gICAgICAgICAgICBlbnVtOiBzY2hlbWEuZW51bSB8fCBbdHJ1ZSwgZmFsc2VdXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBlbnVtTmFtZXM6XHJcbiAgICAgICAgICAgICAgICBjb25maWdTY2hlbWE/LmVudW1OYW1lcyB8fFxyXG4gICAgICAgICAgICAgICAgKHNjaGVtYS5lbnVtICYmIHNjaGVtYS5lbnVtWzBdID09PSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFtcIk5vXCIsIFwiWWVzXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogW1wiWWVzXCIsIFwiTm9cIl1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IEJvb2xlYW5GaWVsZCA9IChwcm9wczogVHlwZVByb3BzKTogUmVhY3RFbGVtZW50PEJvb2xlYW5XaWRnZXRQcm9wcywgYW55PiA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgICAgc2NoZW1hLFxyXG4gICAgICAgIGNvbmZpZ1NjaGVtYSA9IHt9LFxyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgZGlzYWJsZWQsXHJcbiAgICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICAgIGVycm9ycyxcclxuICAgICAgICB3aWRnZXQ6IFdpZGdldCxcclxuICAgICAgICBvbkJsdXIsXHJcbiAgICAgICAgb25Gb2N1cyxcclxuICAgICAgICBvbkNoYW5nZSxcclxuICAgICAgICBldmVudHNcclxuICAgIH0gPSBwcm9wcztcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9IGdldEJvb2xlYW5PcHRpb25zKHNjaGVtYSwgY29uZmlnU2NoZW1hKTtcclxuXHJcbiAgICBjb25zdCB7ZXhhbXBsZXN9ID0gc2NoZW1hO1xyXG4gICAgY29uc3Qge3BsYWNlaG9sZGVyLCBjbGFzc05hbWUsIGlkLCBzdHlsZSwgdGhlbWUsIHdpZGdldH0gPSBjb25maWdTY2hlbWE7XHJcblxyXG4gICAgY29uc3Qgd2lkZ2V0UHJvcHMgPSB7XHJcbiAgICAgICAgb3B0aW9ucyxcclxuICAgICAgICBhdXRvZm9jdXMsXHJcbiAgICAgICAgc2NoZW1hLFxyXG4gICAgICAgIHJlcXVpcmVkOiBzY2hlbWFSZXF1aXJlc1RydWVWYWx1ZShzY2hlbWEpLFxyXG4gICAgICAgIGNvbmZpZ1NjaGVtYSxcclxuICAgICAgICBkaXNhYmxlZCxcclxuICAgICAgICB2YWx1ZTogZGF0YSxcclxuICAgICAgICBvbkNoYW5nZSxcclxuICAgICAgICBvbkJsdXIsXHJcbiAgICAgICAgb25Gb2N1cyxcclxuICAgICAgICBlcnJvcnMsXHJcbiAgICAgICAgcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgY2xhc3NOYW1lLFxyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIHN0eWxlLFxyXG4gICAgICAgIGV2ZW50cyxcclxuICAgICAgICBleGFtcGxlcyxcclxuICAgICAgICB0aGVtZSxcclxuICAgICAgICB3aWRnZXRcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICA8V2lkZ2V0IHsuLi53aWRnZXRQcm9wc30vPlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQm9vbGVhbkZpZWxkOyIsImltcG9ydCB7VHlwZVByb3BzfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQgUmVhY3QsIHtSZWFjdEVsZW1lbnR9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQge0pTT05TY2hlbWE3fSBmcm9tIFwianNvbi1zY2hlbWFcIjtcclxuaW1wb3J0IHttZXJnZVNjaGVtYXMsIGlzQWRkaXRpb25hbH0gZnJvbSBcIkBqZm9ybS91dGlsc1wiO1xyXG5pbXBvcnQge2lzT2JqZWN0fSBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5jb25zdCBvcmRlclByb3BlcnRpZXMgPSAocHJvcGVydGllczogc3RyaW5nW10sIG9yZGVyPzogc3RyaW5nW10pID0+IHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShvcmRlcikpIHtcclxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhcnJheVRvSGFzaCA9IChhcnI6IHN0cmluZ1tdKSA9PlxyXG4gICAgICAgIGFyci5yZWR1Y2UoKHByZXY6IGFueSwgY3VycikgPT4ge1xyXG4gICAgICAgICAgICBwcmV2W2N1cnJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHByZXY7XHJcbiAgICAgICAgfSwge30pO1xyXG5cclxuICAgIGNvbnN0IGVycm9yUHJvcExpc3QgPSAoYXJyOiBzdHJpbmdbXSkgPT5cclxuICAgICAgICBhcnIubGVuZ3RoID4gMVxyXG4gICAgICAgICAgICA/IGBwcm9wZXJ0aWVzICcke2Fyci5qb2luKFwiJywgJ1wiKX0nYFxyXG4gICAgICAgICAgICA6IGBwcm9wZXJ0eSAnJHthcnJbMF19J2A7XHJcbiAgICBjb25zdCBwcm9wZXJ0eUhhc2ggPSBhcnJheVRvSGFzaChwcm9wZXJ0aWVzKTtcclxuICAgIGNvbnN0IG9yZGVyRmlsdGVyZWQgPSBvcmRlci5maWx0ZXIocHJvcCA9PiBwcm9wID09PSBcIipcIiB8fCBwcm9wZXJ0eUhhc2hbcHJvcF0pO1xyXG4gICAgY29uc3Qgb3JkZXJIYXNoID0gYXJyYXlUb0hhc2gob3JkZXJGaWx0ZXJlZCk7XHJcblxyXG4gICAgY29uc3QgcmVzdCA9IHByb3BlcnRpZXMuZmlsdGVyKHByb3AgPT4gIW9yZGVySGFzaFtwcm9wXSk7XHJcbiAgICBjb25zdCByZXN0SW5kZXggPSBvcmRlckZpbHRlcmVkLmluZGV4T2YoXCIqXCIpO1xyXG4gICAgaWYgKHJlc3RJbmRleCA9PT0gLTEpIHtcclxuICAgICAgICBpZiAocmVzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjb25maWdTY2hlbWEgb3JkZXIgbGlzdCBkb2VzIG5vdCBjb250YWluICR7ZXJyb3JQcm9wTGlzdChyZXN0KX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9yZGVyRmlsdGVyZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAocmVzdEluZGV4ICE9PSBvcmRlckZpbHRlcmVkLmxhc3RJbmRleE9mKFwiKlwiKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNvbmZpZ1NjaGVtYSBvcmRlciBsaXN0IGNvbnRhaW5zIG1vcmUgdGhhbiBvbmUgd2lsZGNhcmQgaXRlbVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb21wbGV0ZSA9IFsuLi5vcmRlckZpbHRlcmVkXTtcclxuICAgIGNvbXBsZXRlLnNwbGljZShyZXN0SW5kZXgsIDEsIC4uLnJlc3QpO1xyXG4gICAgcmV0dXJuIGNvbXBsZXRlO1xyXG59XHJcblxyXG5jb25zdCBpc1JlcXVpcmVkID0gKHNjaGVtYTogSlNPTlNjaGVtYTcsIG5hbWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoc2NoZW1hLnJlcXVpcmVkKSAmJiBzY2hlbWEucmVxdWlyZWQuaW5kZXhPZihuYW1lKSAhPT0gLTFcclxufVxyXG5cclxuY29uc3Qgb25Qcm9wZXJ0eUNoYW5nZWQgPSAobmFtZTogc3RyaW5nLCBkYXRhOiBhbnksIG9uQ2hhbmdlOiBGdW5jdGlvbik6ICgoYXJnOiBhbnkpID0+IHZvaWQpID0+IHtcclxuICAgIHJldHVybiAodmFsdWU6IGFueSkgPT4ge1xyXG4gICAgICAgIGxldCBuZXdEYXRhO1xyXG4gICAgICAgIGlmIChpc09iamVjdChkYXRhKSkge1xyXG4gICAgICAgICAgICBuZXdEYXRhID0gey4uLmRhdGEsIFtuYW1lXTogdmFsdWV9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld0RhdGEgPSB7W25hbWVdOiB2YWx1ZX1cclxuICAgICAgICB9XHJcbiAgICAgICAgb25DaGFuZ2UobmV3RGF0YSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5jb25zdCBPYmplY3RGaWVsZCA9IChwcm9wczogVHlwZVByb3BzKTogUmVhY3RFbGVtZW50PGFueSwgYW55PiA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICBzY2hlbWEsXHJcbiAgICAgICAgY29uZmlnU2NoZW1hLFxyXG4gICAgICAgIGV2ZW50U2NoZW1hLFxyXG4gICAgICAgIHJlYWRTY2hlbWEsXHJcbiAgICAgICAgb25CbHVyLFxyXG4gICAgICAgIG9uRm9jdXMsXHJcbiAgICAgICAgb25DaGFuZ2UsXHJcbiAgICAgICAgd2lkZ2V0OiBXaWRnZXQsXHJcbiAgICAgICAgcmVxdWlyZWQsXHJcbiAgICAgICAgZGlzYWJsZWQsXHJcbiAgICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICAgIGVycm9ycyxcclxuICAgICAgICBldmVudHMsXHJcbiAgICB9ID0gcHJvcHM7XHJcblxyXG4gICAgbGV0IHByb3BlcnRpZXNMaXN0ID0gb3JkZXJQcm9wZXJ0aWVzKE9iamVjdC5rZXlzKHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHt9KSwgY29uZmlnU2NoZW1hPy5vcmRlcik7XHJcbiAgICBsZXQgcHJvcGVydGllcyA9IHt9O1xyXG4gICAgaWYgKHByb3BlcnRpZXNMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllc0xpc3QubWFwKG5hbWUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBfc2NoZW1hID0gc2NoZW1hPy5wcm9wZXJ0aWVzPy5bbmFtZV07XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBjb25zdCBhZGRpdGlvbmFsID0gaXNBZGRpdGlvbmFsKF9zY2hlbWEpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgW25hbWVdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IG9uUHJvcGVydHlDaGFuZ2VkKG5hbWUsIGRhdGEsIG9uQ2hhbmdlKSxcclxuICAgICAgICAgICAgICAgICAgICBvbkJsdXIsXHJcbiAgICAgICAgICAgICAgICAgICAgb25Gb2N1cyxcclxuICAgICAgICAgICAgICAgICAgICBzY2hlbWE6IF9zY2hlbWEsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnU2NoZW1hOiBtZXJnZVNjaGVtYXMoe30sIGNvbmZpZ1NjaGVtYT8uYWRkaXRpb25hbFByb3BlcnRpZXMgfHwge30sIGNvbmZpZ1NjaGVtYT8uW2AkJHtuYW1lfWBdKSxcclxuICAgICAgICAgICAgICAgICAgICBldmVudFNjaGVtYTogbWVyZ2VTY2hlbWFzKHt9LCBldmVudFNjaGVtYT8uYWRkaXRpb25hbFByb3BlcnRpZXMgfHwge30sIGV2ZW50U2NoZW1hPy5bYCQke25hbWV9YF0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRTY2hlbWE6IG1lcmdlU2NoZW1hcyh7fSwgcmVhZFNjaGVtYT8uYWRkaXRpb25hbFByb3BlcnRpZXMgfHwge30sIHJlYWRTY2hlbWE/LltgJCR7bmFtZX1gXSksXHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IGlzUmVxdWlyZWQoc2NoZW1hLCBuYW1lKSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YVtuYW1lXSxcclxuICAgICAgICAgICAgICAgICAgICBpc0FkZGl0aW9uYWw6IGFkZGl0aW9uYWxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnJlZHVjZSgoYSwgYikgPT4gKHsuLi5hLCAuLi5ifSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qge2NsYXNzTmFtZSwgaWQsIHN0eWxlLCB0aGVtZSwgd2lkZ2V0fSA9IGNvbmZpZ1NjaGVtYSB8fCB7fTtcclxuXHJcbiAgICBjb25zdCB3aWRnZXRQcm9wcyA9IHtcclxuICAgICAgICBwcm9wZXJ0aWVzLFxyXG4gICAgICAgIGNsYXNzTmFtZSxcclxuICAgICAgICBpZCxcclxuICAgICAgICBzdHlsZSxcclxuICAgICAgICByZXF1aXJlZCxcclxuICAgICAgICBkaXNhYmxlZCxcclxuICAgICAgICBzY2hlbWEsXHJcbiAgICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICAgIGVycm9ycyxcclxuICAgICAgICBldmVudHMsXHJcbiAgICAgICAgdmFsdWU6IGRhdGEsXHJcbiAgICAgICAgdGhlbWUsXHJcbiAgICAgICAgd2lkZ2V0LFxyXG4gICAgICAgIG9uQ2hhbmdlLFxyXG4gICAgICAgIG9uQmx1cixcclxuICAgICAgICBvbkZvY3VzXHJcbiAgICB9XHJcblxyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICByZXR1cm4gPFdpZGdldCB7Li4ud2lkZ2V0UHJvcHN9Lz5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdEZpZWxkOyIsImltcG9ydCBSZWFjdCwge0Z1bmN0aW9uQ29tcG9uZW50LCBQcm9wc1dpdGhDaGlsZHJlbn0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtKU09OU2NoZW1hNywgSlNPTlNjaGVtYTdUeXBlTmFtZX0gZnJvbSBcImpzb24tc2NoZW1hXCI7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSBcIi4vc3RyaW5nXCI7XHJcbmltcG9ydCB7Q29uZmlnU2NoZW1hLCBFdmVudFNjaGVtYSwgRmllbGRFcnJvciwgSHRtbENvbmZpZ3VyYWJsZSwgUmVhZFNjaGVtYX0gZnJvbSBcInR5cGVzXCI7XHJcbmltcG9ydCB7V2lkZ2V0UHJvcHN9IGZyb20gXCJmb3JtL3NjaGVtYS93aWRnZXRzXCI7XHJcbmltcG9ydCBib29sZWFuIGZyb20gXCIuL2Jvb2xlYW5cIjtcclxuaW1wb3J0IG9iamVjdCBmcm9tIFwiLi9vYmplY3RcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHlwZXMgZXh0ZW5kcyBSZWNvcmQ8SlNPTlNjaGVtYTdUeXBlTmFtZSwgRnVuY3Rpb25Db21wb25lbnQ8UHJvcHNXaXRoQ2hpbGRyZW48VHlwZVByb3BzPj4+IHtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUeXBlUHJvcHMgZXh0ZW5kcyBIdG1sQ29uZmlndXJhYmxlIHtcclxuICAgIHNjaGVtYTogSlNPTlNjaGVtYTcsXHJcbiAgICBjb25maWdTY2hlbWE/OiBDb25maWdTY2hlbWEsXHJcbiAgICBkaXNhYmxlZDogYm9vbGVhbixcclxuICAgIGF1dG9mb2N1czogYm9vbGVhbixcclxuICAgIGRhdGE6IGFueSxcclxuICAgIHJlcXVpcmVkOiBib29sZWFuLFxyXG4gICAgZXZlbnRTY2hlbWE/OiBFdmVudFNjaGVtYSxcclxuICAgIHJlYWRTY2hlbWE/OiBSZWFkU2NoZW1hLFxyXG4gICAgZXJyb3JzOiBGaWVsZEVycm9yLFxyXG4gICAgd2lkZ2V0OiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxXaWRnZXRQcm9wczxhbnk+PixcclxuICAgIG9uQ2hhbmdlOiAoYXJnOiBhbnkpID0+IHZvaWQsXHJcbiAgICBvbkJsdXI6ICgpID0+IHZvaWQsXHJcbiAgICBvbkZvY3VzOiAoKSA9PiB2b2lkLFxyXG4gICAgZXZlbnRzOiB7IFtrOiBzdHJpbmddOiBGdW5jdGlvbiB9LFxyXG4gICAgbmFtZT86IHN0cmluZ1xyXG59XHJcblxyXG5jb25zdCB0eXBlczogVHlwZXMgPSB7XHJcbiAgICBzdHJpbmc6IHN0cmluZyxcclxuICAgIG51bWJlcjogKCkgPT4gPD48Lz4sXHJcbiAgICBpbnRlZ2VyOiAoKSA9PiA8PjwvPixcclxuICAgIGJvb2xlYW46IGJvb2xlYW4sXHJcbiAgICBvYmplY3Q6IG9iamVjdCxcclxuICAgIGFycmF5OiAoKSA9PiA8PjwvPixcclxuICAgIG51bGw6ICgpID0+IDw+PC8+XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0eXBlczsiLCJpbXBvcnQgUmVhY3QsIHtGdW5jdGlvbkNvbXBvbmVudCwgUHJvcHNXaXRoQ2hpbGRyZW4sIHVzZUNvbnRleHQsIHVzZU1lbW99IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7XHJcbiAgICBDb25maWdTY2hlbWEsXHJcbiAgICBFdmVudFNjaGVtYSxcclxuICAgIEZpZWxkRXJyb3IsXHJcbiAgICBGaWVsZEhpZGRlbixcclxuICAgIEZpZWxkU3RhdGljSW5mbyxcclxuICAgIEZpZWxkVGl0bGUsXHJcbiAgICBIdG1sQ29uZmlndXJhYmxlLFxyXG4gICAgUmVhZFNjaGVtYSxcclxuICAgIFdpZGdldFxyXG59IGZyb20gXCJ0eXBlc1wiO1xyXG5pbXBvcnQge0pTT05TY2hlbWE3LCBKU09OU2NoZW1hN1R5cGVOYW1lfSBmcm9tIFwianNvbi1zY2hlbWFcIjtcclxuaW1wb3J0IHtnZXRXaWRnZXQsIHJldHJpZXZlU2NoZW1hfSBmcm9tIFwiQGpmb3JtL3V0aWxzXCI7XHJcbmltcG9ydCB0eXBlcywge1R5cGVQcm9wc30gZnJvbSBcIi4vdHlwZXNcIjtcclxuaW1wb3J0IHtKRm9ybUNvbnRleHR9IGZyb20gXCIuLi9Gb3JtXCI7XHJcbmltcG9ydCB7Rm9ybVRlbXBsYXRlfSBmcm9tIFwiLi90ZW1wbGF0ZXNcIjtcclxuaW1wb3J0IHtGaWVsZExheW91dFByb3BzfSBmcm9tIFwiLi90ZW1wbGF0ZXMvbGF5b3V0XCI7XHJcbmltcG9ydCB7U3RyaW5nV2lkZ2V0UHJvcHN9IGZyb20gXCJmb3JtL3NjaGVtYS93aWRnZXRzXCI7XHJcblxyXG5pbnRlcmZhY2UgU2NoZW1hUHJvcHMgZXh0ZW5kcyBIdG1sQ29uZmlndXJhYmxlIHtcclxuICAgIGRhdGE6IHN0cmluZyxcclxuICAgIHNjaGVtYTogSlNPTlNjaGVtYTcsXHJcbiAgICBjb25maWdTY2hlbWE/OiBDb25maWdTY2hlbWEsXHJcbiAgICByZWFkU2NoZW1hPzogUmVhZFNjaGVtYSxcclxuICAgIGV2ZW50U2NoZW1hPzogRXZlbnRTY2hlbWEsXHJcbiAgICBlcnJvcnM/OiBzdHJpbmdbXSxcclxuICAgIHByb3BlcnR5S2V5TW9kaWZpZWQ/OiBib29sZWFuLFxyXG4gICAgbW9kaWZpZWROYW1lPzogc3RyaW5nLFxyXG4gICAgcmVxdWlyZWQ/OiBib29sZWFuLFxyXG4gICAgb25DaGFuZ2U6IChhcmc6IGFueSkgPT4gdm9pZCxcclxuICAgIG9uQmx1cjogKCkgPT4gdm9pZCxcclxuICAgIG9uRm9jdXM6ICgpID0+IHZvaWQsXHJcbiAgICBuYW1lPzogc3RyaW5nXHJcbn1cclxuXHJcbmNvbnN0IGNhbm9uaXplRmllbGRJdGVtUHJvcHMgPSAoaXRlbT86IEZpZWxkU3RhdGljSW5mbzxhbnksIGFueT4sIHN0YW5kYXJkPzogc3RyaW5nKTogRmllbGRTdGF0aWNJbmZvPGFueSwgYW55PiA9PiB7XHJcbiAgICBpZiAoaXRlbSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIHt0ZXh0OiBzdGFuZGFyZH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gey4uLml0ZW0sIHRleHQ6IGl0ZW0udGV4dCB8fCBzdGFuZGFyZH07XHJcbn1cclxuXHJcbmNvbnN0IGNhbm9uaXplRXJyb3JGaWVsZFByb3BzID0gKGl0ZW0/OiBGaWVsZEVycm9yLCBzdGFuZGFyZD86IHN0cmluZ1tdKTogRmllbGRFcnJvciA9PiB7XHJcbiAgICBsZXQgZXJyb3JzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgaWYgKHN0YW5kYXJkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBlcnJvcnMucHVzaCguLi5zdGFuZGFyZCk7XHJcbiAgICB9XHJcbiAgICBpZiAoaXRlbSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIHt0ZXh0OiBlcnJvcnN9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChpdGVtLnRleHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gey4uLml0ZW0sIHRleHQ6IFsuLi5lcnJvcnNdfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVtLnRleHQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7Li4uaXRlbSwgdGV4dDogWy4uLmVycm9ycywgLi4uaXRlbS50ZXh0XX1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHJldHVybiB7Li4uaXRlbSwgdGV4dDogKCkgPT4gaXRlbS50ZXh0KGVycm9ycyl9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUeXBlVGVtcGxhdGUodHlwZTogSlNPTlNjaGVtYTdUeXBlTmFtZSwgY29uZmlnU2NoZW1hPzogQ29uZmlnU2NoZW1hKTogRnVuY3Rpb25Db21wb25lbnQ8VHlwZVByb3BzPiB7XHJcbiAgICBpZiAoY29uZmlnU2NoZW1hPy5maWVsZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZ1NjaGVtYS5maWVsZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyAvLyBJZiB0aGUgdHlwZSBpcyBub3QgZGVmaW5lZCBhbmQgdGhlIHNjaGVtYSB1c2VzICdhbnlPZicgb3IgJ29uZU9mJywgZG9uJ3RcclxuICAgIC8vIC8vIHJlbmRlciBhIGZpZWxkIGFuZCBsZXQgdGhlIE11bHRpU2NoZW1hRmllbGQgY29tcG9uZW50IGhhbmRsZSB0aGUgZm9ybSBkaXNwbGF5XHJcbiAgICAvLyBpZiAoIWNvbXBvbmVudE5hbWUgJiYgKHNjaGVtYS5hbnlPZiB8fCBzY2hlbWEub25lT2YpKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuICgpID0+IG51bGw7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5rbm93biB0eXBlICR7dHlwZX0uIFN1cHBvcnRlZDogJHtPYmplY3Qua2V5cyh0eXBlcykuam9pbihcIixcIil9YClcclxuICAgIH1cclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgcmV0dXJuIHR5cGVzW3R5cGVdO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RmllbGRUZW1wbGF0ZSh0eXBlOiBKU09OU2NoZW1hN1R5cGVOYW1lLCBjb25maWdTY2hlbWE6IENvbmZpZ1NjaGVtYSB8IHVuZGVmaW5lZCwgdGVtcGxhdGU6IFBhcnRpYWw8Rm9ybVRlbXBsYXRlPik6IEZ1bmN0aW9uQ29tcG9uZW50PEZpZWxkTGF5b3V0UHJvcHM+IHtcclxuICAgIGlmICh0eXBlb2YgY29uZmlnU2NoZW1hPy5sYXlvdXQgIT09IFwiZnVuY3Rpb25cIiAmJiBjb25maWdTY2hlbWE/LmxheW91dD8udGVtcGxhdGUgJiYgdHlwZW9mIGNvbmZpZ1NjaGVtYS5sYXlvdXQ/LnRlbXBsYXRlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZ1NjaGVtYS5sYXlvdXQ/LnRlbXBsYXRlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGVtcGxhdGU/LnR5cGU/Llt0eXBlXT8ubGF5b3V0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlPy50eXBlPy5bdHlwZV0/LmxheW91dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlIS5jb21tb24hLmZpZWxkIS5sYXlvdXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHByb2Nlc3NWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nLCBlbXB0eT86IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgICBpZiAodmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICByZXR1cm4gZW1wdHk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3Qgd3JhcEV2ZW50ID0gKGV2ZW50OiBGdW5jdGlvbiwgdXNlckhhbmRsZXI/OiBGdW5jdGlvbik6IChhcmc6IGFueSkgPT4gdm9pZCA9PiB7XHJcbiAgICBpZiAodXNlckhhbmRsZXIpIHtcclxuICAgICAgICByZXR1cm4gKHZhbHVlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdXNlckhhbmRsZXIodmFsdWUpO1xyXG4gICAgICAgICAgICBldmVudCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdmFsID0+IGV2ZW50KHZhbCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCB3cmFwTm9BcmdFdmVudCA9IChldmVudDogRnVuY3Rpb24sIHVzZXJIYW5kbGVyPzogRnVuY3Rpb24pOiAoKSA9PiB2b2lkID0+IHtcclxuICAgIGlmICh1c2VySGFuZGxlcikge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHVzZXJIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIGV2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gKCkgPT4gZXZlbnQoKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChwcm9wczogUHJvcHNXaXRoQ2hpbGRyZW48U2NoZW1hUHJvcHM+KSA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgICAgc2NoZW1hLFxyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgY29uZmlnU2NoZW1hLFxyXG4gICAgICAgIGV2ZW50U2NoZW1hLFxyXG4gICAgICAgIGVycm9ycyxcclxuICAgICAgICByZXF1aXJlZCxcclxuICAgICAgICBvbkJsdXIsXHJcbiAgICAgICAgb25Gb2N1cyxcclxuICAgICAgICBvbkNoYW5nZSxcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGNoaWxkcmVuXHJcbiAgICB9ID0gcHJvcHM7XHJcblxyXG4gICAgbGV0IHtcclxuICAgICAgICBvbkNoYW5nZTogb25DaGFuZ2VFdmVudCxcclxuICAgICAgICBvbkJsdXI6IG9uQmx1ckV2ZW50LFxyXG4gICAgICAgIG9uRm9jdXM6IG9uRm9jdXNFdmVudCxcclxuICAgICAgICAuLi5ldmVudHNcclxuICAgIH0gPSBPYmplY3Qua2V5cyhldmVudFNjaGVtYSB8fCB7fSlcclxuICAgICAgICAuZmlsdGVyKGtleSA9PiAha2V5LnN0YXJ0c1dpdGgoXCIkXCIpKVxyXG4gICAgICAgIC5yZWR1Y2UoKG9iaiwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBvYmpba2V5XSA9IGV2ZW50U2NoZW1hW2tleV07XHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfSwge30pIGFzIEV2ZW50U2NoZW1hO1xyXG5cclxuICAgIGNvbnN0IHR5cGUgPSBzY2hlbWEudHlwZSBhcyBKU09OU2NoZW1hN1R5cGVOYW1lO1xyXG5cclxuICAgIGNvbnN0IF9vbkNoYW5nZSA9IHdyYXBFdmVudCgoeDogYW55KSA9PiBvbkNoYW5nZShwcm9jZXNzVmFsdWUoeCwgY29uZmlnU2NoZW1hPy5lbXB0eSkpLCBvbkNoYW5nZUV2ZW50KTtcclxuICAgIGNvbnN0IF9vbkJsdXIgPSB3cmFwTm9BcmdFdmVudChvbkJsdXIsIG9uQmx1ckV2ZW50KTtcclxuICAgIGNvbnN0IF9vbkZvY3VzID0gd3JhcE5vQXJnRXZlbnQob25Gb2N1cywgb25Gb2N1c0V2ZW50KTtcclxuXHJcbiAgICBjb25zdCB7dGVtcGxhdGUsIHdpZGdldHMsIGRlZmF1bHRzfSA9IHVzZUNvbnRleHQoSkZvcm1Db250ZXh0KTtcclxuXHJcbiAgICBjb25zdCB0aXRsZVByb3BzOiBGaWVsZFRpdGxlID0gY2Fub25pemVGaWVsZEl0ZW1Qcm9wcyhjb25maWdTY2hlbWE/LnRpdGxlIGFzIEZpZWxkU3RhdGljSW5mbzxhbnksIGFueT4sIHNjaGVtYS50aXRsZSkgYXMgRmllbGRUaXRsZTtcclxuXHJcbiAgICBpZiggdGl0bGVQcm9wcz8ucmVxdWlyZWQpIHtcclxuICAgICAgICB0aXRsZVByb3BzLnJlcXVpcmVkLmRpc3BsYXkgPSByZXF1aXJlZCB8fCB0aXRsZVByb3BzPy5yZXF1aXJlZD8uZGlzcGxheSB8fCBmYWxzZTtcclxuICAgIH1cclxuICAgIHRpdGxlUHJvcHMudGV4dCA9IHRpdGxlUHJvcHM/LnRleHQgfHwgKHRpdGxlUHJvcHM/LnVzZU5hbWUgJiYgbmFtZSB8fCB1bmRlZmluZWQpO1xyXG5cclxuICAgIGNvbnN0IGRlc2NQcm9wczogRmllbGRTdGF0aWNJbmZvPHN0cmluZywgYW55PiA9IGNhbm9uaXplRmllbGRJdGVtUHJvcHMoY29uZmlnU2NoZW1hPy5kZXNjcmlwdGlvbiBhcyBGaWVsZFN0YXRpY0luZm88YW55LCBhbnk+LCBzY2hlbWEuZGVzY3JpcHRpb24pO1xyXG4gICAgY29uc3QgaGVscFByb3BzOiBGaWVsZFN0YXRpY0luZm88c3RyaW5nLCBhbnk+ID0gY2Fub25pemVGaWVsZEl0ZW1Qcm9wcyhjb25maWdTY2hlbWE/LmhlbHAgYXMgRmllbGRTdGF0aWNJbmZvPGFueSwgYW55Pik7XHJcbiAgICBjb25zdCBlcnJvclByb3BzOiBGaWVsZEVycm9yID0gY2Fub25pemVFcnJvckZpZWxkUHJvcHMoY29uZmlnU2NoZW1hPy5lcnJvciBhcyBGaWVsZEVycm9yLCBlcnJvcnMpO1xyXG5cclxuICAgIGNvbnN0IGNvbXB1dGVkU2NoZW1hID0gdXNlTWVtbygoKSA9PiByZXRyaWV2ZVNjaGVtYShzY2hlbWEsIHNjaGVtYSwgZGF0YSksIFtzY2hlbWEsIGRhdGFdKTtcclxuXHJcbiAgICBjb25zdCBGaWVsZFRlbXBsYXRlID0gZ2V0RmllbGRUZW1wbGF0ZSh0eXBlLCBjb25maWdTY2hlbWEsIHRlbXBsYXRlKTtcclxuICAgIGNvbnN0IFR5cGVUZW1wbGF0ZSA9IGdldFR5cGVUZW1wbGF0ZSh0eXBlLCBjb25maWdTY2hlbWEpO1xyXG4gICAgbGV0IHdpZGdldCA9IGdldFdpZGdldDxTdHJpbmdXaWRnZXRQcm9wcz4odHlwZSwgKGNvbmZpZ1NjaGVtYT8ud2lkZ2V0IGFzIFdpZGdldCk/LnR5cGUsIHdpZGdldHMsIGRlZmF1bHRzKTtcclxuXHJcbiAgICBjb25zdCBsYXlvdXQgPSAoY29uZmlnU2NoZW1hPy5sYXlvdXQgfHwge30pIGFzIEZpZWxkTGF5b3V0UHJvcHM7XHJcbiAgICByZXR1cm4gPEZpZWxkVGVtcGxhdGUgdGl0bGU9e3RpdGxlUHJvcHN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb249e2Rlc2NQcm9wc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBoZWxwPXtoZWxwUHJvcHN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuPXtjb25maWdTY2hlbWE/LmhpZGRlbiBhcyBGaWVsZEhpZGRlbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnM9e2Vycm9yUHJvcHN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnU2NoZW1hPXtjb25maWdTY2hlbWF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT17bmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2xheW91dC5jbGFzc05hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDbGFzc05hbWU9e2xheW91dC5lcnJvckNsYXNzTmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICByb290Q2xhc3NOYW1lPXtsYXlvdXQucm9vdENsYXNzTmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17bGF5b3V0LnN0eWxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtsYXlvdXQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnPXtsYXlvdXQudGFnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcj17bGF5b3V0LnJlbmRlcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXt0eXBlfVxyXG4gICAgPlxyXG4gICAgICAgIDxUeXBlVGVtcGxhdGVcclxuICAgICAgICAgICAgd2lkZ2V0PXt3aWRnZXR9XHJcbiAgICAgICAgICAgIHNjaGVtYT17Y29tcHV0ZWRTY2hlbWF9XHJcbiAgICAgICAgICAgIGNvbmZpZ1NjaGVtYT17Y29uZmlnU2NoZW1hfVxyXG4gICAgICAgICAgICBhdXRvZm9jdXM9eyEhKGNvbmZpZ1NjaGVtYT8uYXV0b2ZvY3VzKX1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9eyEhKGNvbmZpZ1NjaGVtYT8uZGlzYWJsZWQgfHwgc2NoZW1hLnJlYWRPbmx5KX1cclxuICAgICAgICAgICAgZGF0YT17ZGF0YX1cclxuICAgICAgICAgICAgcmVxdWlyZWQ9eyEhcmVxdWlyZWR9XHJcbiAgICAgICAgICAgIGV2ZW50U2NoZW1hPXtldmVudFNjaGVtYX1cclxuICAgICAgICAgICAgZXJyb3JzPXtlcnJvclByb3BzfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17X29uQ2hhbmdlfVxyXG4gICAgICAgICAgICBvbkJsdXI9e19vbkJsdXJ9XHJcbiAgICAgICAgICAgIG9uRm9jdXM9e19vbkZvY3VzfVxyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgZXZlbnRzPXtldmVudHN9XHJcbiAgICAgICAgICAgIG5hbWU9e25hbWV9XHJcbiAgICAgICAgLz5cclxuICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICA8L0ZpZWxkVGVtcGxhdGU+O1xyXG59IiwiaW1wb3J0IFJlYWN0LCB7RnVuY3Rpb25Db21wb25lbnQsIFByb3BzV2l0aENoaWxkcmVuLCB1c2VDb250ZXh0LCB1c2VNZW1vfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0NvbmZpZ1NjaGVtYSwgRmllbGRFcnJvciwgRmllbGRIaWRkZW4sIEZpZWxkU3RhdGljSW5mbywgRmllbGRUaXRsZSwgSHRtbENvbmZpZ3VyYWJsZX0gZnJvbSBcInR5cGVzXCI7XHJcbmltcG9ydCB7RGVzY3JpcHRpb25Qcm9wcywgRXJyb3JQcm9wcywgSGVscFByb3BzLCBUaXRsZVByb3BzfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0pGb3JtQ29udGV4dH0gZnJvbSBcIi4uLy4uL0Zvcm1cIjtcclxuaW1wb3J0IHtKU09OU2NoZW1hN1R5cGVOYW1lfSBmcm9tIFwianNvbi1zY2hlbWFcIjtcclxuaW1wb3J0IHtpc0FycmF5fSBmcm9tIFwibG9kYXNoXCI7XHJcbi8vQHRzLWlnbm9yZVxyXG5pbXBvcnQge0NvbnRhaW5lciwgUm93LCBDb2x9IGZyb20gJ3JlYWN0LWdyaWQnO1xyXG5pbXBvcnQge3JlbmRlckxheW91dH0gZnJvbSBcIkBqZm9ybS91dGlsc1wiO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRMYXlvdXRQcm9wcyBleHRlbmRzIEh0bWxDb25maWd1cmFibGUge1xyXG4gICAgdGl0bGU6IEZpZWxkVGl0bGUsXHJcbiAgICBkZXNjcmlwdGlvbjogRmllbGRTdGF0aWNJbmZvPHN0cmluZywgRGVzY3JpcHRpb25Qcm9wcz4sXHJcbiAgICBoZWxwOiBGaWVsZFN0YXRpY0luZm88c3RyaW5nLCBIZWxwUHJvcHM+LFxyXG4gICAgZXJyb3JzOiBGaWVsZEVycm9yLFxyXG4gICAgaGlkZGVuPzogRmllbGRIaWRkZW4sXHJcbiAgICBjb25maWdTY2hlbWE/OiBDb25maWdTY2hlbWEsXHJcbiAgICBuYW1lPzogc3RyaW5nLFxyXG4gICAgdHlwZTogSlNPTlNjaGVtYTdUeXBlTmFtZSxcclxuICAgIHJlbmRlcjogYW55LFxyXG4gICAgZXJyb3JDbGFzc05hbWU6IHN0cmluZyxcclxuICAgIHJvb3RDbGFzc05hbWU6IHN0cmluZyxcclxufVxyXG5cclxuY29uc3QgY29tcHV0ZUl0ZW0gPSAoY2ZnOiBvYmplY3QsIHByb3BzOiBvYmplY3QsIG5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgc3dpdGNoICh0eXBlb2YgY2ZnKSB7XHJcbiAgICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBjZmcocHJvcHMpO1xyXG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcclxuICAgICAgICAgICAgaWYgKGlzQXJyYXkoY2ZnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNmZ1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcHV0ZUR5bmFtaWNDb25maWd1cmFibGUoY2ZnLCBwcm9wc1tuYW1lXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBjZmc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGNvbXB1dGVEeW5hbWljQ29uZmlndXJhYmxlID0gKGR5bmE6IG9iamVjdCwgcHJvcHM6IGFueSk6IEh0bWxDb25maWd1cmFibGUgfCBudWxsID0+IHtcclxuICAgIGlmIChkeW5hID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMoZHluYSkubWFwKChbX25hbWUsIGNmZ10pID0+ICh7W19uYW1lXTogY29tcHV0ZUl0ZW0oY2ZnLCBwcm9wcywgX25hbWUpfSkpLnJlZHVjZSgoYSwgYikgPT4gKHsuLi5hLCAuLi5ifSkpO1xyXG59XHJcblxyXG5jb25zdCBnZXRGaWVsZEl0ZW1IYW5kbGVyID0gKGl0ZW06IEZpZWxkU3RhdGljSW5mbzxhbnksIGFueT4sIF9kZWY6IEZ1bmN0aW9uQ29tcG9uZW50LCB0eXBlPzogRnVuY3Rpb25Db21wb25lbnQpOiBGdW5jdGlvbkNvbXBvbmVudDxhbnk+ID0+IHtcclxuICAgIGNvbnN0IHt0ZW1wbGF0ZSwgLi4ub3RoZXJQcm9wc30gPSBpdGVtO1xyXG4gICAgaWYgKHRlbXBsYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIChwcm9wcykgPT4gdGVtcGxhdGUoey4uLnByb3BzLCAuLi5vdGhlclByb3BzfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGRlZiA9IHR5cGUgfHwgX2RlZjtcclxuICAgICAgICByZXR1cm4gKHByb3BzKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtZXJnZWQgPSB7Li4ucHJvcHMsIC4uLm90aGVyUHJvcHN9O1xyXG4gICAgICAgICAgICBsZXQgbWVyZ2VkSXRlbSA9IGNvbXB1dGVEeW5hbWljQ29uZmlndXJhYmxlKGl0ZW0sIG1lcmdlZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYoey4uLm1lcmdlZCwgLi4ubWVyZ2VkSXRlbX0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZGVmYXVsdExheW91dFN0eWxlcyA9ICgpID0+ICh7XHJcbiAgICBicmVha3BvaW50czoge3hzOiAwLCBzbTogNTc2LCBtZDogNzY4LCBsZzogOTkyLCB4bDogMTIwMH0sXHJcbiAgICBjb250YWluZXJNYXhXaWR0aHM6IHtzbTogNTQwLCBtZDogNzIwLCBsZzogOTYwLCB4bDogMTE0MH0sXHJcbiAgICBjb2x1bW5zOiAxMixcclxuICAgIGd1dHRlcldpZHRoOiAwXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRMYXlvdXQgPSAocHJvcGVydGllczogYW55LCBjb25maWcgPSAoe21kOiAxMn0pKSA9PiBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKS5tYXAoeCA9PiAoe1t4XTogey4uLmNvbmZpZ319KSlcclxuXHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0TGF5b3V0UmVuZGVyID0gW1xyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOiB7fSxcclxuICAgICAgICBjaGlsZHJlbjoge31cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgZGVzY3JpcHRpb246IHt9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGhlbHA6IHt9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGVycm9yczoge31cclxuICAgIH1cclxuXVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHByb3BzOiBQcm9wc1dpdGhDaGlsZHJlbjxGaWVsZExheW91dFByb3BzPikgPT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIGhlbHAsXHJcbiAgICAgICAgZXJyb3JzLFxyXG4gICAgICAgIGhpZGRlbixcclxuICAgICAgICBjaGlsZHJlbixcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIHR5cGUsXHJcbiAgICAgICAgY2xhc3NOYW1lID0gXCJcIixcclxuICAgICAgICBlcnJvckNsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICAgICAgcm9vdENsYXNzTmFtZSA9IFwiXCIsXHJcbiAgICAgICAgc3R5bGUsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgdGFnOiBUYWcgPSBcImRpdlwiLFxyXG4gICAgICAgIHJlbmRlclxyXG4gICAgfSA9IHByb3BzO1xyXG5cclxuICAgIGNvbnN0IHt0ZW1wbGF0ZX0gPSB1c2VDb250ZXh0KEpGb3JtQ29udGV4dCk7XHJcblxyXG4gICAgY29uc3QgVGl0bGVGaWVsZDogRnVuY3Rpb25Db21wb25lbnQ8VGl0bGVQcm9wcz4gPSB1c2VNZW1vKCgpID0+XHJcbiAgICAgICAgZ2V0RmllbGRJdGVtSGFuZGxlcih0aXRsZSwgdGVtcGxhdGUhLmNvbW1vbiEuZmllbGQhLnRpdGxlIGFzIEZ1bmN0aW9uQ29tcG9uZW50LCB0ZW1wbGF0ZT8udHlwZT8uW3R5cGVdPy50aXRsZSksIFt0aXRsZV0pO1xyXG4gICAgY29uc3QgRGVzY3JpcHRpb25GaWVsZDogRnVuY3Rpb25Db21wb25lbnQ8RGVzY3JpcHRpb25Qcm9wcz4gPSB1c2VNZW1vKCgpID0+XHJcbiAgICAgICAgZ2V0RmllbGRJdGVtSGFuZGxlcihkZXNjcmlwdGlvbiwgdGVtcGxhdGUhLmNvbW1vbiEuZmllbGQhLmRlc2NyaXB0aW9uLCB0ZW1wbGF0ZT8udHlwZT8uW3R5cGVdPy5kZXNjcmlwdGlvbiksIFtkZXNjcmlwdGlvbl0pO1xyXG4gICAgY29uc3QgSGVscEZpZWxkOiBGdW5jdGlvbkNvbXBvbmVudDxIZWxwUHJvcHM+ID0gdXNlTWVtbygoKSA9PlxyXG4gICAgICAgIGdldEZpZWxkSXRlbUhhbmRsZXIoaGVscCwgdGVtcGxhdGUhLmNvbW1vbiEuZmllbGQhLmhlbHAsIHRlbXBsYXRlPy50eXBlPy5bdHlwZV0/LmhlbHApLCBbaGVscF0pO1xyXG4gICAgY29uc3QgRXJyb3JzRmllbGQ6IEZ1bmN0aW9uQ29tcG9uZW50PEVycm9yUHJvcHM+ID0gdXNlTWVtbygoKSA9PlxyXG4gICAgICAgIGdldEZpZWxkSXRlbUhhbmRsZXIoZXJyb3JzLCB0ZW1wbGF0ZSEuY29tbW9uIS5maWVsZCEuZXJyb3IsIHRlbXBsYXRlPy50eXBlPy5bdHlwZV0/LmVycm9yKSwgW2Vycm9yc10pO1xyXG5cclxuICAgIGlmIChoaWRkZW4/LmVuYWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGNvbnN0IHtjbGFzc05hbWUgPSBcIlwiLCBpZCwgc3R5bGV9ID0gaGlkZGVuO1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBpZD17aWR9IHN0eWxlPXtzdHlsZX0vPjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZXJyb3JDbGFzcyA9IFwiXCI7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIGlmIChlcnJvcnM/LmRpc3BsYXkgIT09IGZhbHNlICYmIGVycm9ycz8udGV4dD8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGVycm9yQ2xhc3MgPSBlcnJvckNsYXNzTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByb3dFbGVtZW50czogYW55ID0ge1xyXG4gICAgICAgIHRpdGxlOiB0aXRsZS5kaXNwbGF5ICE9PSBmYWxzZSAmJiAoKCkgPT4gPFRpdGxlRmllbGQga2V5PVwidGl0bGVcIiBuYW1lPXtuYW1lfS8+KSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24uZGlzcGxheSAhPT0gZmFsc2UgJiYgKCgpID0+IDxEZXNjcmlwdGlvbkZpZWxkIGtleT1cImRlc2NyaXB0aW9uXCIvPiksXHJcbiAgICAgICAgZXJyb3JzOiBlcnJvcnMuZGlzcGxheSAhPT0gZmFsc2UgJiYgKCgpID0+IDxFcnJvcnNGaWVsZCBrZXk9XCJlcnJvcnNcIi8+KSxcclxuICAgICAgICBoZWxwOiBoZWxwLmRpc3BsYXkgIT09IGZhbHNlICYmICgoKSA9PiA8SGVscEZpZWxkIGtleT1cImhlbHBcIi8+KSxcclxuICAgICAgICBjaGlsZHJlbjogKCkgPT4gY2hpbGRyZW5cclxuICAgIH1cclxuXHJcbiAgICBsZXQgX3JlbmRlcjtcclxuICAgIGlmICh0eXBlb2YgcmVuZGVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBfcmVuZGVyID0gcmVuZGVyKHtcclxuICAgICAgICAgICAgVGl0bGU6IHJvd0VsZW1lbnRzLnRpdGxlIHx8ICgoKSA9PiBudWxsKSxcclxuICAgICAgICAgICAgRGVzY3JpcHRpb246IHJvd0VsZW1lbnRzLmRlc2NyaXB0aW9uIHx8ICgoKSA9PiBudWxsKSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IHJvd0VsZW1lbnRzLmNoaWxkcmVuKCkgfHwgKCgpID0+IG51bGwpLFxyXG4gICAgICAgICAgICBFcnJvcnM6IHJvd0VsZW1lbnRzLmVycm9ycyB8fCAoKCkgPT4gbnVsbCksXHJcbiAgICAgICAgICAgIEhlbHA6IHJvd0VsZW1lbnRzLmhlbHAgfHwgKCgpID0+IG51bGwpXHJcbiAgICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX3JlbmRlciA9IHJlbmRlckxheW91dChyZW5kZXIgfHwgZGVmYXVsdExheW91dChyb3dFbGVtZW50cyksXHJcbiAgICAgICAgICAgIChuYW1lLCByb3dQcm9wcykgPT4gPENvbCBzdHlsZXM9e2RlZmF1bHRMYXlvdXRTdHlsZXMoKX0gey4uLnJvd1Byb3BzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtuYW1lIHx8IFwicm9vdFwifT57cm93RWxlbWVudHNbbmFtZV0gJiYgcm93RWxlbWVudHNbbmFtZV0oKX08L0NvbD4sXHJcbiAgICAgICAgICAgICgoY2hpbGRyZW4sIGluZGV4KSA9PiA8Um93IHN0eWxlcz17ZGVmYXVsdExheW91dFN0eWxlcygpfSBrZXk9e2luZGV4fT57Y2hpbGRyZW59PC9Sb3c+KSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIDxUYWdcclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtbbmFtZSA/IHVuZGVmaW5lZCA6IHJvb3RDbGFzc05hbWUsIGNsYXNzTmFtZSwgZXJyb3JDbGFzc10uZmlsdGVyKHggPT4geCAmJiB4Lmxlbmd0aCA+IDApLmpvaW4oXCIgXCIpfWB9XHJcbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZX0gaWQ9e2lkfT5cclxuICAgICAgICAgICAgPENvbnRhaW5lciBzdHlsZXM9e2RlZmF1bHRMYXlvdXRTdHlsZXMoKX0+XHJcbiAgICAgICAgICAgICAgICB7X3JlbmRlcn1cclxuICAgICAgICAgICAgPC9Db250YWluZXI+XHJcbiAgICAgICAgPC9UYWc+XHJcbiAgICApO1xyXG59IiwiaW1wb3J0IFJlYWN0LCB7UHJvcHNXaXRoQ2hpbGRyZW59IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7RmllbGRTdGF0aWNJbmZvUHJvcHN9IGZyb20gXCIuL2luZGV4XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRpdGxlUHJvcHMgZXh0ZW5kcyBGaWVsZFN0YXRpY0luZm9Qcm9wczxzdHJpbmc+IHtcclxuICAgIHJlcXVpcmVkPzogUmVxdWlyZWRQcm9wcyxcclxuICAgIG5hbWU/OiBzdHJpbmcsXHJcbiAgICB1c2VOYW1lPzogYm9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVpcmVkUHJvcHMgZXh0ZW5kcyBGaWVsZFN0YXRpY0luZm9Qcm9wczxzdHJpbmc+IHtcclxuICAgIGRpc3BsYXk/OiBib29sZWFuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IChwcm9wczogUHJvcHNXaXRoQ2hpbGRyZW48VGl0bGVQcm9wcz4pID0+IHtcclxuICAgIGNvbnN0IHt0ZXh0LCByZXF1aXJlZCA9IHt9LCBpZCwgY2xhc3NOYW1lID0gXCJcIiwgc3R5bGUsIHRhZzogVGFnID0gXCJsYWJlbFwifSA9IHByb3BzO1xyXG5cclxuICAgIGlmICh0ZXh0ID09IG51bGwpIHtcclxuICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29uc3QgUmVxdWlyZWRUYWcgPSByZXF1aXJlZD8udGFnIHx8IFwic3BhblwiO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICA8VGFnIHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IGlkPXtpZH0+XHJcbiAgICAgICAgICAgIHt0ZXh0fVxyXG4gICAgICAgICAgICB7cmVxdWlyZWQuZGlzcGxheSA9PT0gdHJ1ZSAmJiByZXF1aXJlZC50ZXh0ICYmXHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIDxSZXF1aXJlZFRhZyBjbGFzc05hbWU9e3JlcXVpcmVkLmNsYXNzTmFtZX0gc3R5bGU9e3JlcXVpcmVkLnN0eWxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtyZXF1aXJlZC5pZH0+e3JlcXVpcmVkLnRleHR9PC9SZXF1aXJlZFRhZz59XHJcbiAgICAgICAgPC9UYWc+XHJcbiAgICApO1xyXG59XHJcblxyXG4iLCJpbXBvcnQgUmVhY3QsIHtQcm9wc1dpdGhDaGlsZHJlbn0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtGaWVsZFN0YXRpY0luZm9Qcm9wc30gZnJvbSBcIi4vaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSGVscFByb3BzIGV4dGVuZHMgRmllbGRTdGF0aWNJbmZvUHJvcHM8c3RyaW5nPiB7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IChwcm9wczogUHJvcHNXaXRoQ2hpbGRyZW48SGVscFByb3BzPikgPT4ge1xyXG4gICAgY29uc3Qge3RleHQsIGlkLCBjbGFzc05hbWUgPSBcIlwiLCBzdHlsZSwgdGFnOiBUYWcgPSBcImRpdlwifSA9IHByb3BzO1xyXG4gICAgaWYgKCF0ZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIDxUYWcgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gaWQ9e2lkfT5cclxuICAgICAgICAgICAge3RleHR9XHJcbiAgICAgICAgPC9UYWc+XHJcbiAgICApO1xyXG59XHJcbiIsImltcG9ydCBSZWFjdCwge1Byb3BzV2l0aENoaWxkcmVufSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0ZpZWxkU3RhdGljSW5mb1Byb3BzfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEZXNjcmlwdGlvblByb3BzIGV4dGVuZHMgRmllbGRTdGF0aWNJbmZvUHJvcHM8c3RyaW5nPiB7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCAocHJvcHM6IFByb3BzV2l0aENoaWxkcmVuPERlc2NyaXB0aW9uUHJvcHM+KSA9PiB7XHJcbiAgICBjb25zdCB7dGV4dCwgaWQsIGNsYXNzTmFtZSA9IFwiXCIsIHN0eWxlLCB0YWc6IFRhZyA9IFwiZGl2XCJ9ID0gcHJvcHM7XHJcbiAgICBpZiAoIXRleHQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgPFRhZyBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBpZD17aWR9PlxyXG4gICAgICAgICAgICB7dGV4dH1cclxuICAgICAgICA8L1RhZz5cclxuICAgICk7XHJcbn0iLCJpbXBvcnQgUmVhY3QsIHtQcm9wc1dpdGhDaGlsZHJlbn0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtGaWVsZFN0YXRpY0luZm9Qcm9wc30gZnJvbSBcIi4vaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JQcm9wcyBleHRlbmRzIEZpZWxkU3RhdGljSW5mb1Byb3BzPHN0cmluZ1tdPiB7XHJcbiAgICBlcnJvckNsYXNzTmFtZT86IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCAocHJvcHM6IFByb3BzV2l0aENoaWxkcmVuPEVycm9yUHJvcHM+KSA9PiB7XHJcbiAgICBjb25zdCB7dGV4dCA9IFtdLCBpZCwgY2xhc3NOYW1lID0gXCJcIiwgc3R5bGUsIGVycm9yQ2xhc3NOYW1lID0gXCJcIix0YWc6IFRhZyA9IFwidWxcIn0gPSBwcm9wcztcclxuICAgIGlmICh0ZXh0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgey8qXHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZSAqL31cclxuICAgICAgICA8VGFnIGlkPXtpZH0gc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XHJcbiAgICAgICAgICAgIHt0ZXh0XHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGVsZW0gPT4gISFlbGVtKVxyXG4gICAgICAgICAgICAgICAgLm1hcCgoZXJyb3IsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17ZXJyb3JDbGFzc05hbWV9IGtleT17aW5kZXh9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Vycm9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICA8L1RhZz5cclxuICAgIDwvZGl2PlxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7SHRtbENvbmZpZ3VyYWJsZX0gZnJvbSBcInR5cGVzXCI7XHJcbmltcG9ydCBsYXlvdXQsIHtGaWVsZExheW91dFByb3BzfSBmcm9tIFwiLi9sYXlvdXRcIjtcclxuaW1wb3J0IHRpdGxlLCB7VGl0bGVQcm9wc30gZnJvbSBcIi4vdGl0bGVcIjtcclxuaW1wb3J0IHtjbG9uZURlZXB9IGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IGhlbHAsIHtIZWxwUHJvcHN9IGZyb20gXCIuL2hlbHBcIjtcclxuaW1wb3J0IGRlc2NyaXB0aW9uLCB7RGVzY3JpcHRpb25Qcm9wc30gZnJvbSBcIi4vZGVzY3JpcHRpb25cIjtcclxuaW1wb3J0IGVycm9yLCB7RXJyb3JQcm9wc30gZnJvbSBcIi4vZXJyb3JcIjtcclxuaW1wb3J0IHtKU09OU2NoZW1hN1R5cGVOYW1lfSBmcm9tIFwianNvbi1zY2hlbWFcIjtcclxuXHJcbmludGVyZmFjZSBGaWVsZFN0YXRpY0luZm9Qcm9wczxUZXh0PiBleHRlbmRzIEh0bWxDb25maWd1cmFibGUge1xyXG4gICAgdGV4dD86IFRleHQsXHJcbiAgICBkaXNwbGF5PzogYm9vbGVhblxyXG59XHJcblxyXG5pbnRlcmZhY2UgRm9ybVRlbXBsYXRlIHtcclxuICAgIGNvbW1vbjogQ29tbW9uRm9ybVRlbXBsYXRlLFxyXG4gICAgdHlwZT86IHsgW2sgaW4gSlNPTlNjaGVtYTdUeXBlTmFtZV06IEpzb25UeXBlRm9ybVRlbXBsYXRlIH0sXHJcbiAgICBidXR0b24/OiBvYmplY3RcclxufVxyXG5cclxuaW50ZXJmYWNlIEZpZWxkQ29tbW9uRm9ybVRlbXBsYXRlIHtcclxuICAgIGxheW91dDogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8RmllbGRMYXlvdXRQcm9wcz4sXHJcbiAgICB0aXRsZTogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8VGl0bGVQcm9wcz4sXHJcbiAgICBkZXNjcmlwdGlvbjogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8RGVzY3JpcHRpb25Qcm9wcz4sXHJcbiAgICBoZWxwOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxIZWxwUHJvcHM+LFxyXG4gICAgZXJyb3I6IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PEVycm9yUHJvcHM+LFxyXG4gICAgc3RhdGU6IEZpZWxkU3RhdGVDb21tb25Gb3JtVGVtcGxhdGVcclxufVxyXG5cclxuXHJcbmludGVyZmFjZSBDb21tb25Gb3JtVGVtcGxhdGUge1xyXG4gICAgZmllbGQ6IEZpZWxkQ29tbW9uRm9ybVRlbXBsYXRlLFxyXG4gICAgYnV0dG9uOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudCxcclxuICAgIHRpcDogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQsXHJcbiAgICBlcnJvcjogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQsXHJcbiAgICBhY3Rpb25zOiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudFxyXG59XHJcblxyXG5cclxuaW50ZXJmYWNlIEZpZWxkU3RhdGVDb21tb25Gb3JtVGVtcGxhdGUge1xyXG4gICAgbG9hZGluZzogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQsXHJcbiAgICB2aWV3OiBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudFxyXG59XHJcblxyXG5pbnRlcmZhY2UgSnNvblR5cGVGb3JtVGVtcGxhdGUgZXh0ZW5kcyBGaWVsZENvbW1vbkZvcm1UZW1wbGF0ZSB7XHJcbiAgICBmb3JtYXQ6IHsgW2s6IHN0cmluZ106IHN0cmluZyB8IG9iamVjdCB9XHJcbn1cclxuXHJcblxyXG5jb25zdCBkZWZhdWx0VGVtcGxhdGU6IEZvcm1UZW1wbGF0ZSA9IHtcclxuICAgIGNvbW1vbjoge1xyXG4gICAgICAgIGZpZWxkOiB7XHJcbiAgICAgICAgICAgIGxheW91dDogbGF5b3V0LFxyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgaGVscDogaGVscCxcclxuICAgICAgICAgICAgZXJyb3I6IGVycm9yLFxyXG4gICAgICAgICAgICBzdGF0ZToge1xyXG4gICAgICAgICAgICAgICAgdmlldzogKHtjaGlsZHJlbn0pID0+IDw+e2NoaWxkcmVufTwvPixcclxuICAgICAgICAgICAgICAgIGxvYWRpbmc6ICh7Y2hpbGRyZW59KSA9PiA8PntjaGlsZHJlbn08Lz4sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFjdGlvbnM6ICh7Y2hpbGRyZW59KSA9PiA8PntjaGlsZHJlbn08Lz4sXHJcbiAgICAgICAgYnV0dG9uOiAoe2NoaWxkcmVufSkgPT4gPD57Y2hpbGRyZW59PC8+LFxyXG4gICAgICAgIGVycm9yOiAoe2NoaWxkcmVufSkgPT4gPD57Y2hpbGRyZW59PC8+LFxyXG4gICAgICAgIHRpcDogKHtjaGlsZHJlbn0pID0+IDw+e2NoaWxkcmVufTwvPlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgRmllbGRTdGF0aWNJbmZvUHJvcHMsXHJcbiAgICBGb3JtVGVtcGxhdGUsXHJcbiAgICBEZXNjcmlwdGlvblByb3BzLFxyXG4gICAgRXJyb3JQcm9wcyxcclxuICAgIEhlbHBQcm9wcyxcclxuICAgIFRpdGxlUHJvcHMsXHJcbiAgICBGaWVsZExheW91dFByb3BzXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICgpOiBGb3JtVGVtcGxhdGUgPT4gY2xvbmVEZWVwKGRlZmF1bHRUZW1wbGF0ZSk7IiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQge1N0cmluZ1dpZGdldFByb3BzfSBmcm9tIFwiLi9pbmRleFwiO1xyXG5cclxuZnVuY3Rpb24gVGV4dFdpZGdldChwcm9wczogU3RyaW5nV2lkZ2V0UHJvcHMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgICBhdXRvZm9jdXMsXHJcbiAgICAgICAgZGlzYWJsZWQsXHJcbiAgICAgICAgb25DaGFuZ2UsXHJcbiAgICAgICAgb25Gb2N1cyxcclxuICAgICAgICBvbkJsdXIsXHJcbiAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgaWQsXHJcbiAgICAgICAgc3R5bGUsXHJcbiAgICAgICAgY2xhc3NOYW1lLFxyXG4gICAgICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgICAgIGV4YW1wbGVzLFxyXG4gICAgICAgIHNjaGVtYSxcclxuICAgICAgICByZXF1aXJlZFxyXG4gICAgfSA9IHByb3BzO1xyXG5cclxuXHJcbiAgICByZXR1cm4gPD5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgICAgICAgaWQ9e2lkfVxyXG4gICAgICAgICAgICBzdHlsZT17c3R5bGV9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgYXV0b0ZvY3VzPXthdXRvZm9jdXN9XHJcbiAgICAgICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cclxuICAgICAgICAgICAgdmFsdWU9e3ZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWV9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gb25DaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICBvbkJsdXI9eygpID0+IG9uQmx1cigpfVxyXG4gICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiBvbkZvY3VzKCl9XHJcbiAgICAgICAgLz5cclxuICAgICAgICB7ZXhhbXBsZXMgPyAoXHJcbiAgICAgICAgICAgIDxkYXRhbGlzdD5cclxuICAgICAgICAgICAgICAgIHtbLi4ubmV3IFNldCgoZXhhbXBsZXMpLmNvbmNhdChzY2hlbWEuZGVmYXVsdCA/IFtzY2hlbWEuZGVmYXVsdF0gOiBbXSkpLF1cclxuICAgICAgICAgICAgICAgICAgICAubWFwKGV4YW1wbGUgPT4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17ZXhhbXBsZX0gdmFsdWU9e2V4YW1wbGV9Lz5cclxuICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kYXRhbGlzdD5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgIDwvPlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXh0V2lkZ2V0OyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHtTdHJpbmdXaWRnZXRQcm9wc30gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHtKU09OU2NoZW1hN30gZnJvbSBcImpzb24tc2NoZW1hXCI7XHJcblxyXG5cclxuY29uc3QgcHJvY2Vzc1ZhbHVlID0gKHNjaGVtYTogSlNPTlNjaGVtYTcsIHZhbHVlOiBzdHJpbmcpOiBhbnkgPT4ge1xyXG4gICAgY29uc3Qge3R5cGV9ID0gc2NoZW1hO1xyXG4gICAgaWYgKHZhbHVlID09PSBcIlwiICYmIHNjaGVtYT8uZW51bT8uaW5kZXhPZihcIlwiKSA9PT0gLTEpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICh0eXBlID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gXCJ0cnVlXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNlbGVjdFdpZGdldChwcm9wczogU3RyaW5nV2lkZ2V0UHJvcHMpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgICBvcHRpb25zLFxyXG4gICAgICAgIGRpc2FibGVkT3B0aW9ucyxcclxuICAgICAgICB2YWx1ZSxcclxuICAgICAgICByZXF1aXJlZCxcclxuICAgICAgICBkaXNhYmxlZCxcclxuICAgICAgICBhdXRvZm9jdXMsXHJcbiAgICAgICAgb25DaGFuZ2UsXHJcbiAgICAgICAgb25CbHVyLFxyXG4gICAgICAgIG9uRm9jdXMsXHJcbiAgICAgICAgcGxhY2Vob2xkZXIsXHJcbiAgICAgICAgY2xhc3NOYW1lLFxyXG4gICAgICAgIGlkLFxyXG4gICAgICAgIHN0eWxlLFxyXG4gICAgICAgIHNjaGVtYSxcclxuICAgICAgICBjb25maWdTY2hlbWFcclxuICAgIH0gPSBwcm9wcztcclxuXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8c2VsZWN0XHJcbiAgICAgICAgICAgIGlkPXtpZH1cclxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgICAgICAgdmFsdWU9e3ZhbHVlIHx8IGNvbmZpZ1NjaGVtYT8uZW1wdHl9XHJcbiAgICAgICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgICBhdXRvRm9jdXM9e2F1dG9mb2N1c31cclxuICAgICAgICAgICAgb25CbHVyPXsoKSA9PiBvbkJsdXIoKX1cclxuICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4gb25Gb2N1cygpfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBvbkNoYW5nZShwcm9jZXNzVmFsdWUoc2NoZW1hLCBlLnRhcmdldC52YWx1ZSkpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgICAge3NjaGVtYS5kZWZhdWx0ID09PSB1bmRlZmluZWQgJiYgKDxvcHRpb24gdmFsdWU9XCJcIj57cGxhY2Vob2xkZXJ9PC9vcHRpb24+KX1cclxuICAgICAgICAgICAge29wdGlvbnM/Lm1hcCgoe3ZhbHVlLCBsYWJlbH0sIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpc2FibGVkID0gZGlzYWJsZWRPcHRpb25zICYmIGRpc2FibGVkT3B0aW9ucy5pbmRleE9mKHZhbHVlKSAhPSAtMTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXt2YWx1ZX0gZGlzYWJsZWQ9e2Rpc2FibGVkfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RXaWRnZXQ7IiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Qm9vbGVhbldpZGdldFByb3BzfSBmcm9tIFwiLi4vXCI7XHJcblxyXG5mdW5jdGlvbiBDaGVja2JveFdpZGdldChwcm9wczogQm9vbGVhbldpZGdldFByb3BzKSB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgZGlzYWJsZWQsXHJcbiAgICAgICAgYXV0b2ZvY3VzLFxyXG4gICAgICAgIG9uQmx1cixcclxuICAgICAgICBvbkZvY3VzLFxyXG4gICAgICAgIG9uQ2hhbmdlLFxyXG4gICAgICAgIGNsYXNzTmFtZSxcclxuICAgICAgICBpZCxcclxuICAgICAgICBzdHlsZSxcclxuICAgICAgICByZXF1aXJlZFxyXG4gICAgfSA9IHByb3BzO1xyXG5cclxuICAgIHJldHVybiA8aW5wdXRcclxuICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxyXG4gICAgICAgIGlkPXtpZH1cclxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgICBzdHlsZT17c3R5bGV9XHJcbiAgICAgICAgY2hlY2tlZD17dmFsdWUgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogdmFsdWV9XHJcbiAgICAgICAgcmVxdWlyZWQ9e3JlcXVpcmVkfVxyXG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICBhdXRvRm9jdXM9e2F1dG9mb2N1c31cclxuICAgICAgICBvbkNoYW5nZT17ZXZlbnQgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LmNoZWNrZWQpfVxyXG4gICAgICAgIG9uQmx1cj17KCkgPT4gb25CbHVyKCl9XHJcbiAgICAgICAgb25Gb2N1cz17KCkgPT4gb25Gb2N1cygpfVxyXG4gICAgLz5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hXaWRnZXQ7IiwiaW1wb3J0IHtPYmplY3RXaWRnZXRQcm9wc30gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2NoZW1hIGZyb20gXCIuLi8uLi9TY2hlbWFcIjtcclxuLy9AdHMtaWdub3JlXHJcbmltcG9ydCB7Q29sLCBDb250YWluZXIsIFJvd30gZnJvbSAncmVhY3QtZ3JpZCc7XHJcbmltcG9ydCB7Y2FuRXhwYW5kLCByZW5kZXJMYXlvdXR9IGZyb20gXCJAamZvcm0vdXRpbHNcIjtcclxuaW1wb3J0IHtkZWZhdWx0TGF5b3V0LCBkZWZhdWx0TGF5b3V0U3R5bGVzfSBmcm9tIFwiLi4vLi4vdGVtcGxhdGVzL2xheW91dFwiO1xyXG5pbXBvcnQge2lzQXJyYXl9IGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcblxyXG5jb25zdCBoYW5kbGVSZW1vdmVLZXkgPSAoaGFuZGxlcjogRnVuY3Rpb24sIG5hbWU6IHN0cmluZywgZGF0YTogb2JqZWN0LCBvbkNoYW5nZTogRnVuY3Rpb24pID0+IHtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gaGFuZGxlcih7XHJcbiAgICAgICAgICAgIG5hbWUsIGRhdGEsIHJlbW92ZUtleTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBjb25zdCB7W25hbWVdOiByZW1vdmVkLCAuLi5yZXN1bHR9ID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBvbkNoYW5nZShyZXN1bHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBoYW5kbGVBZGRLZXkgPSAoaGFuZGxlcjogRnVuY3Rpb24sIGRhdGE6IG9iamVjdCwgb25DaGFuZ2U6IEZ1bmN0aW9uKSA9PiB7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBoYW5kbGVyKCk7XHJcbiAgICAgICAgb25DaGFuZ2Uoey4uLmRhdGEsIC4uLml0ZW19KTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgR3JpZFdpZGdldCA9IChwcm9wczogT2JqZWN0V2lkZ2V0UHJvcHMpID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgICBhdXRvZm9jdXMsXHJcbiAgICAgICAgZGlzYWJsZWQsXHJcbiAgICAgICAgcHJvcGVydGllcyA9IHt9LFxyXG4gICAgICAgIGNsYXNzTmFtZSxcclxuICAgICAgICByZXF1aXJlZCxcclxuICAgICAgICBpZCxcclxuICAgICAgICBzdHlsZSxcclxuICAgICAgICB3aWRnZXQsXHJcbiAgICAgICAgZXZlbnRzLFxyXG4gICAgICAgIHNjaGVtYSxcclxuICAgICAgICB2YWx1ZTogZGF0YSxcclxuICAgICAgICBvbkNoYW5nZTogb25DaGFuZ2VPYmplY3RcclxuICAgIH0gPSBwcm9wcztcclxuXHJcbiAgICBjb25zdCB7XHJcbiAgICAgICAgaXRlbUNsYXNzTmFtZSxcclxuICAgICAgICBpdGVtU3R5bGUsXHJcbiAgICAgICAgYWRkaXRpb25hbEl0ZW1DbGFzc05hbWUsXHJcbiAgICAgICAgYWN0aW9uc0NsYXNzTmFtZSxcclxuICAgICAgICBhY3Rpb25DbGFzc05hbWUsXHJcbiAgICAgICAgYWRkS2V5QnV0dG9uLFxyXG4gICAgICAgIHJlbW92ZUtleUJ1dHRvbixcclxuICAgICAgICBsYXlvdXQgPSBkZWZhdWx0TGF5b3V0KHByb3BlcnRpZXMpXHJcbiAgICB9OiBhbnkgPSB3aWRnZXQ7XHJcbiAgICBjb25zdCB7b25BZGRLZXksIG9uUmVtb3ZlS2V5fSA9IGV2ZW50cztcclxuXHJcbiAgICBsZXQgX2xheW91dDtcclxuICAgIGlmKGlzQXJyYXkobGF5b3V0KSkge1xyXG4gICAgICAgIF9sYXlvdXQgPSBsYXlvdXQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9sYXlvdXQgPSBkZWZhdWx0TGF5b3V0KHByb3BlcnRpZXMsIGxheW91dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICByZXR1cm4gPENvbnRhaW5lciBzdHlsZXM9e2RlZmF1bHRMYXlvdXRTdHlsZXMoKX0gYXV0b0ZvY3VzPXthdXRvZm9jdXN9IHJlcXVpcmVkPXtyZXF1aXJlZH0gZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9IGlkPXtpZH1cclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZW5kZXJMYXlvdXQoX2xheW91dCwgKChuYW1lLCByb3dQcm9wcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge29wdGlvbmFsLCByZW5kZXIsIC4uLm90aGVyfSA9IHJvd1Byb3BzO1xyXG4gICAgICAgICAgICAgICAgbGV0IF9zdHlsZSA9IGl0ZW1TdHlsZSB8fCB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzRmlsbGVkID0gKGZpZWxkTmFtZTogc3RyaW5nKSA9PiAhIShkYXRhW2ZpZWxkTmFtZV0gJiYgZGF0YVtmaWVsZE5hbWVdLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNUcnVlID0gKGZpZWxkTmFtZTogc3RyaW5nKSA9PiAoZGF0YVtmaWVsZE5hbWVdKVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbmFsQXBpID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRmlsbGVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzVHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25hbCAmJiAhb3B0aW9uYWwoe2RhdGEsIC4uLm9wdGlvbmFsQXBpfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc3R5bGUgPSB7ZGlzcGxheTogJ25vbmUnfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlbmRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFVJQ29tcG9uZW50ID0gcmVuZGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb2wgey4uLm90aGVyfSBrZXk9e25hbWV9IHN0eWxlPXtfc3R5bGV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFVJQ29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAdHMtaWdub3JlICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17ZGF0YX0ga2V5PXtuYW1lfSBuYW1lPXtuYW1lfSByZXF1aXJlZD17cmVxdWlyZWR9IHNjaGVtYT17c2NoZW1hfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1NjaGVtYT17cHJvcHMuY29uZmlnU2NoZW1hfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi4ocHJvcGVydGllcz8uW25hbWVdIHx8IHt9KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydGllc1tuYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1NjaGVtYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRTY2hlbWEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRTY2hlbWEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWRkaXRpb25hbFxyXG4gICAgICAgICAgICAgICAgICAgIH0gPSBwcm9wZXJ0aWVzW25hbWVdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPENvbCBzdHlsZXM9e2RlZmF1bHRMYXlvdXRTdHlsZXMoKX0gey4uLm90aGVyfSBrZXk9e25hbWV9IHN0eWxlPXtfc3R5bGUgfHwge319XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtbaXRlbUNsYXNzTmFtZSwgaXNBZGRpdGlvbmFsICYmIGFkZGl0aW9uYWxJdGVtQ2xhc3NOYW1lXS5maWx0ZXIoeCA9PiB4ICYmIHgubGVuZ3RoID4gMCkuam9pbihcIiBcIil9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8U2NoZW1hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e25hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXtuYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ9e3JlcXVpcmVkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1hPXtzY2hlbWEgfHwge319XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWdTY2hlbWE9e2NvbmZpZ1NjaGVtYSB8fCB7fX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U2NoZW1hPXtldmVudFNjaGVtYSB8fCB7fX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRTY2hlbWE9e3JlYWRTY2hlbWEgfHwge319XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXt2YWx1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzQWRkaXRpb25hbCAmJiBvblJlbW92ZUtleSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtyZW1vdmVLZXlCdXR0b259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVSZW1vdmVLZXkob25SZW1vdmVLZXksIG5hbWUsIGRhdGEsIG9uQ2hhbmdlT2JqZWN0KX0+RGVsZXRlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvU2NoZW1hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQ29sPlxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLCAoKGNoaWxkcmVuLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxSb3cgc3R5bGVzPXtkZWZhdWx0TGF5b3V0U3R5bGVzKCl9IGtleT17aW5kZXh9PntjaGlsZHJlbn08L1Jvdz47XHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgIH1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhbkV4cGFuZChzY2hlbWEsIGRhdGEsIG9uQWRkS2V5KSAmJlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YWN0aW9uc0NsYXNzTmFtZX0+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e2FjdGlvbkNsYXNzTmFtZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2FkZEtleUJ1dHRvbn0gb25DbGljaz17aGFuZGxlQWRkS2V5KG9uQWRkS2V5LCBkYXRhLCBvbkNoYW5nZU9iamVjdCl9PkFkZFxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICA8L0NvbnRhaW5lcj5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR3JpZFdpZGdldDsiLCJpbXBvcnQge2Nsb25lRGVlcH0gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgdGV4dCBmcm9tIFwiLi9zdHJpbmcvdGV4dFwiO1xyXG5pbXBvcnQgc2VsZWN0IGZyb20gXCIuL3N0cmluZy9zZWxlY3RcIjtcclxuaW1wb3J0IHtGdW5jdGlvbkNvbXBvbmVudH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7SlNPTlNjaGVtYTcsIEpTT05TY2hlbWE3VHlwZU5hbWV9IGZyb20gXCJqc29uLXNjaGVtYVwiO1xyXG5pbXBvcnQge0NvbmZpZ1NjaGVtYSwgSHRtbENvbmZpZ3VyYWJsZX0gZnJvbSBcInR5cGVzXCI7XHJcbmltcG9ydCB7RXJyb3JQcm9wc30gZnJvbSBcIi4uL3RlbXBsYXRlc1wiO1xyXG5pbXBvcnQge1N0cmluZ1dpZGdldFByb3BzfSBmcm9tIFwiLi9zdHJpbmdcIlxyXG5pbXBvcnQge0Jvb2xlYW5XaWRnZXRQcm9wc30gZnJvbSBcIi4vYm9vbGVhblwiXHJcbmltcG9ydCBjaGVja2JveCBmcm9tIFwiLi9ib29sZWFuL2NoZWNrYm94XCI7XHJcbmltcG9ydCBncmlkIGZyb20gXCIuL29iamVjdC9ncmlkXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdpZGdldHMgZXh0ZW5kcyBSZWNvcmQgPEpTT05TY2hlbWE3VHlwZU5hbWUsIHsgW3Y6IHN0cmluZ106IEZ1bmN0aW9uQ29tcG9uZW50PFdpZGdldFByb3BzPGFueT4+IH0+IHtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXaWRnZXRQcm9wczxUPiBleHRlbmRzIEh0bWxDb25maWd1cmFibGUge1xyXG4gICAgYXV0b2ZvY3VzPzogYm9vbGVhbixcclxuICAgIHNjaGVtYTogSlNPTlNjaGVtYTcsXHJcbiAgICBjb25maWdTY2hlbWE/OiBDb25maWdTY2hlbWEsXHJcbiAgICBkaXNhYmxlZDogYm9vbGVhbixcclxuICAgIHJlcXVpcmVkOiBib29sZWFuLFxyXG4gICAgb25DaGFuZ2U6IChhcmc6IFQpID0+IHZvaWQsXHJcbiAgICBvbkJsdXI6ICgpID0+IHZvaWQsXHJcbiAgICBvbkZvY3VzOiAoKSA9PiB2b2lkLFxyXG4gICAgZXJyb3JzOiBFcnJvclByb3BzLFxyXG4gICAgdmFsdWU6IFQsXHJcbiAgICBwbGFjZWhvbGRlcj86IHN0cmluZyxcclxuICAgIGV4YW1wbGVzPzogYW55W10sXHJcbiAgICBldmVudHM6IHsgW2s6IHN0cmluZ106IEZ1bmN0aW9uIH0sXHJcbiAgICB0aGVtZTogb2JqZWN0LFxyXG4gICAgd2lkZ2V0OiBvYmplY3RcclxufVxyXG5cclxuY29uc3QgZGVmYXVsdFdpZGdldHM6IFdpZGdldHMgPSB7XHJcbiAgICBzdHJpbmc6IHtcclxuICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgIHNlbGVjdDogc2VsZWN0XHJcbiAgICB9LFxyXG4gICAgbnVtYmVyOiB7fSxcclxuICAgIGludGVnZXI6IHt9LFxyXG4gICAgYm9vbGVhbjoge1xyXG4gICAgICAgIGNoZWNrYm94OiBjaGVja2JveCxcclxuICAgICAgICBzZWxlY3Q6IHNlbGVjdFxyXG4gICAgfSxcclxuICAgIG9iamVjdDoge1xyXG4gICAgICAgIGdyaWQ6IGdyaWRcclxuICAgIH0sXHJcbiAgICBhcnJheToge30sXHJcbiAgICBudWxsOiB7fVxyXG59O1xyXG5cclxuZXhwb3J0IHtTdHJpbmdXaWRnZXRQcm9wcywgQm9vbGVhbldpZGdldFByb3BzfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCk6IFdpZGdldHMgPT4gY2xvbmVEZWVwKGRlZmF1bHRXaWRnZXRzKTsiLCJpbXBvcnQge0pTY2hlbWF9IGZyb20gXCJ0eXBlc1wiO1xyXG5cclxuY29uc3Qgc3RyT3JGdW5jID0gKGFyZzogYW55KTogYm9vbGVhbiA9PiB7XHJcbiAgICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgYXJnID09PSBcImZ1bmN0aW9uXCI7XHJcbn1cclxuXHJcbmNvbnN0IGFycmF5T3JGdW5jID0gKGFyZzogYW55KTogYm9vbGVhbiA9PiB7XHJcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcmcpIHx8IHR5cGVvZiBhcmcgPT09IFwiZnVuY3Rpb25cIjtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNhbm9uaXphdGlvblJ1bGVzOiAoKGFyZzogSlNjaGVtYSkgPT4gSlNjaGVtYSB8IHVuZGVmaW5lZClbXSA9IFtcclxuICAgICh7Y29uZmlnU2NoZW1hfSkgPT4gc3RyT3JGdW5jKGNvbmZpZ1NjaGVtYT8ud2lkZ2V0KSA/IHtjb25maWdTY2hlbWE6IHt3aWRnZXQ6IHt0eXBlOiBjb25maWdTY2hlbWE/LndpZGdldH19fSBhcyBKU2NoZW1hIDogdW5kZWZpbmVkLFxyXG4gICAgKHtjb25maWdTY2hlbWF9KSA9PiBzdHJPckZ1bmMoY29uZmlnU2NoZW1hPy5oZWxwKSA/IHtjb25maWdTY2hlbWE6IHtoZWxwOiB7dGV4dDogY29uZmlnU2NoZW1hPy5oZWxwfX19IGFzIEpTY2hlbWEgOiB1bmRlZmluZWQsXHJcbiAgICAoe2NvbmZpZ1NjaGVtYX0pID0+IHN0ck9yRnVuYyhjb25maWdTY2hlbWE/LmRlc2NyaXB0aW9uKSA/IHtjb25maWdTY2hlbWE6IHtkZXNjcmlwdGlvbjoge3RleHQ6IGNvbmZpZ1NjaGVtYT8uZGVzY3JpcHRpb259fX0gYXMgSlNjaGVtYSA6IHVuZGVmaW5lZCxcclxuICAgICh7Y29uZmlnU2NoZW1hfSkgPT4gc3RyT3JGdW5jKGNvbmZpZ1NjaGVtYT8udGl0bGUpID8ge2NvbmZpZ1NjaGVtYToge3RpdGxlOiB7dGV4dDogY29uZmlnU2NoZW1hPy50aXRsZX19fSBhcyBKU2NoZW1hIDogdW5kZWZpbmVkLFxyXG4gICAgKHtjb25maWdTY2hlbWF9KSA9PiBhcnJheU9yRnVuYyhjb25maWdTY2hlbWE/LmVycm9yKSA/IHtjb25maWdTY2hlbWE6IHtlcnJvcjoge3RleHQ6IGNvbmZpZ1NjaGVtYT8uZXJyb3J9fX0gYXMgSlNjaGVtYSA6IHVuZGVmaW5lZCxcclxuICAgICh7Y29uZmlnU2NoZW1hfSkgPT4gc3RyT3JGdW5jKGNvbmZpZ1NjaGVtYT8ubGF5b3V0KSA/IHtjb25maWdTY2hlbWE6IHtsYXlvdXQ6IHt0ZW1wbGF0ZTogY29uZmlnU2NoZW1hPy5sYXlvdXR9fX0gYXMgSlNjaGVtYSA6IHVuZGVmaW5lZCxcclxuICAgICh7Y29uZmlnU2NoZW1hfSkgPT4gY29uZmlnU2NoZW1hPy5oaWRkZW4gPT09IHRydWUgPyB7Y29uZmlnU2NoZW1hOiB7aGlkZGVuOiB7ZW5hYmxlOiB0cnVlfX19IGFzIEpTY2hlbWEgOiB1bmRlZmluZWRcclxuXSIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge2Nsb25lRGVlcH0gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQge0RlZmF1bHRzfSBmcm9tIFwiLi4vZGVmYXVsdHNcIjtcclxuaW1wb3J0IHtnZXRTY2hlbWFUeXBlfSBmcm9tIFwiQGpmb3JtL3V0aWxzXCI7XHJcbmltcG9ydCB7SlNjaGVtYX0gZnJvbSBcInR5cGVzXCI7XHJcblxyXG5cclxuY29uc3QgZGVmYXVsdHM6IERlZmF1bHRzID0ge1xyXG4gICAgY29tbW9uOiB7XHJcbiAgICAgICAgY29uZmlnU2NoZW1hOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiamZvcm0tdGl0bGVcIixcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImpmb3JtLWxhYmVsLXJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCIqXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHtcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJqZm9ybS1kZXNjcmlwdGlvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiamZvcm0tZXJyb3JzXCIsXHJcbiAgICAgICAgICAgICAgICBlcnJvckNsYXNzTmFtZTogXCJqZm9ybS1lcnJvclwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhlbHA6IHtcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJqZm9ybS1oZWxwXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGF5b3V0OiB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiamZvcm0tZmllbGQtbGF5b3V0XCIsXHJcbiAgICAgICAgICAgICAgICByb290Q2xhc3NOYW1lOiBcImpmb3JtLWZpZWxkLWxheW91dC1yb290XCIsXHJcbiAgICAgICAgICAgICAgICBlcnJvckNsYXNzTmFtZTogXCJlcnJvci1maWVsZFwiLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZToge30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiB7fVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjoge31cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVscDoge31cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzOiB7fVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGlkZGVuOiB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiamZvcm0taGlkZGVuXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0tZmllbGRcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0eXBlOiB7XHJcbiAgICAgICAgc3RyaW5nOiB7XHJcbiAgICAgICAgICAgIGNvbmZpZ1NjaGVtYToge1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0OiBcInRleHRcIixcclxuICAgICAgICAgICAgICAgIGxheW91dDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJzdHJpbmctZmllbGRcIixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9vbGVhbjoge1xyXG4gICAgICAgICAgICBjb25maWdTY2hlbWE6IHtcclxuICAgICAgICAgICAgICAgIHdpZGdldDogXCJjaGVja2JveFwiLFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImJvb2xlYW4tZmllbGRcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvYmplY3Q6IHtcclxuICAgICAgICAgICAgY29uZmlnU2NoZW1hOiB7XHJcbiAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3JpZFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICB0YWc6IFwibGVnZW5kXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwib2JqZWN0LWZpZWxkXCIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgd2lkZ2V0OiB7XHJcbiAgICAgICAgc3RyaW5nOiB7XHJcbiAgICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZ1NjaGVtYToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogXCJ0ZXh0LXdpZGdldFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnU2NoZW1hOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInNlbGVjdC13aWRnZXRcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBib29sZWFuOiB7XHJcbiAgICAgICAgICAgIGNoZWNrYm94OiB7XHJcbiAgICAgICAgICAgICAgICBjb25maWdTY2hlbWE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiY2hlY2tib3gtd2lkZ2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcjogKHtUaXRsZSwgRGVzY3JpcHRpb24sIGNoaWxkcmVuLCBFcnJvcnMsIEhlbHB9OiBhbnkpID0+IDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGVzY3JpcHRpb24vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGl0bGUvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFcnJvcnMvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEhlbHAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9iamVjdDoge1xyXG4gICAgICAgICAgICBncmlkOiB7XHJcbiAgICAgICAgICAgICAgICBjb25maWdTY2hlbWE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwiZ3JpZC13aWRnZXRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJncmlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1DbGFzc05hbWU6IFwiZ3JpZC1pdGVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxJdGVtQ2xhc3NOYW1lOiBcImFkZGl0aW9uYWwtaXRlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25zQ2xhc3NOYW1lOiBcImFjdGlvbnMtaXRlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25DbGFzc05hbWU6IFwiYWN0aW9uLWl0ZW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkS2V5QnV0dG9uOiBcImFkZC1rZXktYnV0dG9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUtleUJ1dHRvbjogXCJyZW1vdmUta2V5LWJ1dHRvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXlvdXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1kOiAxMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsYXlvdXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiBcImZpZWxkc2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjoge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcnVsZXM6IFtcclxuICAgICAgICAoe2NvbmZpZ1NjaGVtYX0pID0+IGNvbmZpZ1NjaGVtYT8uZW51bU5hbWVzID8ge2NvbmZpZ1NjaGVtYToge3dpZGdldDogXCJzZWxlY3RcIn19IDogdW5kZWZpbmVkLFxyXG4gICAgICAgICh7c2NoZW1hfSkgPT4gc2NoZW1hPy5lbnVtID8ge2NvbmZpZ1NjaGVtYToge3dpZGdldDogXCJzZWxlY3RcIn19IDogdW5kZWZpbmVkXHJcbiAgICBdXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGVmYXVsdFJ1bGVzOiAoKGFyZzogSlNjaGVtYSkgPT4gSlNjaGVtYSB8IHVuZGVmaW5lZClbXSA9IFtcclxuICAgICh7c2NoZW1hfSkgPT4gc2NoZW1hICE9PSB0cnVlICYmICFzY2hlbWE/LnR5cGUgPyB7c2NoZW1hOiB7dHlwZTogZ2V0U2NoZW1hVHlwZShzY2hlbWEgfHwge30pfX0gOiB1bmRlZmluZWRcclxuXVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICgpOiBEZWZhdWx0cyA9PiBjbG9uZURlZXAoZGVmYXVsdHMpOyIsImltcG9ydCB7Q29uZmlnU2NoZW1hLCBKU2NoZW1hfSBmcm9tIFwidHlwZXNcIjtcclxuaW1wb3J0IHt0cmF2ZXJzZSwgbWVyZ2VTY2hlbWFzLCByZXNvbHZlUmVmZXJlbmNlfSBmcm9tIFwiQGpmb3JtL3V0aWxzXCI7XHJcbmltcG9ydCB7SlNPTlNjaGVtYTcsIEpTT05TY2hlbWE3VHlwZU5hbWV9IGZyb20gXCJqc29uLXNjaGVtYVwiO1xyXG5pbXBvcnQge2Nhbm9uaXphdGlvblJ1bGVzLCBEZWZhdWx0c30gZnJvbSBcIi4vXCI7XHJcbmltcG9ydCB7ZGVmYXVsdFJ1bGVzfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHtjbG9uZURlZXB9IGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcblxyXG5jb25zdCBfYXBwbHlEZWZhdWx0cyA9IChfc2NoZW1hOiBKU2NoZW1hLCBkZWZhdWx0czogRGVmYXVsdHMpOiBSZXF1aXJlZDxKU2NoZW1hPiA9PiB7XHJcbiAgICBsZXQge3NjaGVtYSwgLi4uYWRkaXRpb25hbH0gPSBjbG9uZURlZXAoX3NjaGVtYSk7XHJcbiAgICBzY2hlbWEgPSByZXNvbHZlUmVmZXJlbmNlKHNjaGVtYSBhcyBKU09OU2NoZW1hNywgc2NoZW1hIGFzIEpTT05TY2hlbWE3KTtcclxuICAgIGNvbnN0IHJ1bGVzID0gWy4uLihkZWZhdWx0cz8ucnVsZXMgfHwgW10pLCAuLi4oZGVmYXVsdFJ1bGVzIHx8IFtdKSwgLi4uY2Fub25pemF0aW9uUnVsZXNdO1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgc2NoZW1hID0gdHJhdmVyc2Uoc2NoZW1hIGFzIEpTT05TY2hlbWE3LCBhZGRpdGlvbmFsLCAoc2NoZW1hLCBvdGhlcikgPT4ge1xyXG4gICAgICAgIHJldHVybiBydWxlcy5tYXAoeCA9PiB4KHtzY2hlbWEsIC4uLm90aGVyfSkpLnJlZHVjZSgoYSwgYikgPT4gbWVyZ2VTY2hlbWFzKGEsIGIpKVxyXG4gICAgfSk7XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIHNjaGVtYSA9IHRyYXZlcnNlKHNjaGVtYSBhcyBKU09OU2NoZW1hNywgYWRkaXRpb25hbCwgKHNjaGVtYSwgb3RoZXIpID0+IHtcclxuICAgICAgICBsZXQgdHlwZSA9IHNjaGVtYS50eXBlIGFzIEpTT05TY2hlbWE3VHlwZU5hbWU7XHJcbiAgICAgICAgbGV0IG1lcmdlQ2FzZXM6IGFueSA9IHtkZWZpbmVkOiB7c2NoZW1hLCAuLi5vdGhlcn0sIGNvbW1vbjogZGVmYXVsdHMuY29tbW9ufTtcclxuXHJcbiAgICAgICAgaWYgKGRlZmF1bHRzPy50eXBlPy5bdHlwZV0pIHtcclxuICAgICAgICAgICAgY29uc3Qge3NjaGVtYTogbWVyZ2VTY2hlbWEsIGNvbmZpZ1NjaGVtYSwgLi4ubWVyZ2VPdGhlcn0gPSBkZWZhdWx0cy50eXBlW3R5cGVdIHx8IHt9O1xyXG4gICAgICAgICAgICBtZXJnZUNhc2VzLnR5cGUgPSB7c2NoZW1hOiBtZXJnZVNjaGVtYSwgY29uZmlnU2NoZW1hLCAuLi5tZXJnZU90aGVyfTtcclxuXHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBjb25zdCBmdXR1cmVXaWRnZXQgPSAob3RoZXI/LmNvbmZpZ1NjaGVtYSBhcyBDb25maWdTY2hlbWEpPy53aWRnZXQ/LnR5cGUgfHwgY29uZmlnU2NoZW1hPy53aWRnZXQ/LnR5cGU7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZ1dHVyZVdpZGdldCA9PT0gJ3N0cmluZycgJiYgZGVmYXVsdHM/LndpZGdldD8uW3R5cGVdPy5bZnV0dXJlV2lkZ2V0XSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3NjaGVtYTogbWVyZ2VTY2hlbWEsIC4uLm1lcmdlT3RoZXJ9ID0gZGVmYXVsdHM/LndpZGdldD8uW3R5cGVdPy5bZnV0dXJlV2lkZ2V0XSB8fCB7fTtcclxuICAgICAgICAgICAgICAgIG1lcmdlQ2FzZXMud2lkZ2V0ID0ge3NjaGVtYTogbWVyZ2VTY2hlbWEsIC4uLm1lcmdlT3RoZXJ9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vZm9yIGNvbnN0IHNjaGVtYSBub3QgbWVyZ2Ugc2NoZW1hXHJcbiAgICAgICAgY29uc3QgaXNUcnV0aFNjaGVtYSA9IHNjaGVtYSA9PT0gdHJ1ZTtcclxuICAgICAgICBpZiAoc2NoZW1hLmNvbnN0IHx8IGlzVHJ1dGhTY2hlbWEpIHtcclxuICAgICAgICAgICAgaWYgKG1lcmdlQ2FzZXM/LmNvbW1vbj8uc2NoZW1hKSB7XHJcbiAgICAgICAgICAgICAgICBtZXJnZUNhc2VzLmNvbW1vbi5zY2hlbWEgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1lcmdlQ2FzZXM/LnR5cGU/LnNjaGVtYSkge1xyXG4gICAgICAgICAgICAgICAgbWVyZ2VDYXNlcy50eXBlLnNjaGVtYSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWVyZ2VDYXNlcz8ud2lkZ2V0Py5zY2hlbWEpIHtcclxuICAgICAgICAgICAgICAgIG1lcmdlQ2FzZXMud2lkZ2V0LnNjaGVtYSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAoe3NjaGVtYSwgLi4ub3RoZXJ9ID0gT2JqZWN0LmtleXMobWVyZ2VDYXNlcy5kZWZpbmVkKVxyXG4gICAgICAgICAgICAubWFwKHggPT4gKHtcclxuICAgICAgICAgICAgICAgICAgICBbeF06IG1lcmdlU2NoZW1hcyhcclxuICAgICAgICAgICAgICAgICAgICAgICAge30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlQ2FzZXM/LmNvbW1vbj8uW3hdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJnZUNhc2VzPy50eXBlPy5beF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlQ2FzZXM/LndpZGdldD8uW3hdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJnZUNhc2VzPy5kZWZpbmVkPy5beF0sXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgICAgICAucmVkdWNlKChhLCBiKSA9PiAoey4uLmEsIC4uLmJ9KSkpO1xyXG4gICAgICAgIGlmIChpc1RydXRoU2NoZW1hKSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBzY2hlbWEgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge3NjaGVtYSwgLi4ub3RoZXJ9O1xyXG4gICAgfSlcclxuICAgIHJldHVybiB7c2NoZW1hLCAuLi5hZGRpdGlvbmFsfSBhcyBSZXF1aXJlZDxKU2NoZW1hPjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBhcHBseURlZmF1bHRzID0gKHByb3BzOiBKU2NoZW1hLCBkZWZhdWx0czogRGVmYXVsdHMpOiBSZXF1aXJlZDxKU2NoZW1hPiA9PiB7XHJcbiAgICByZXR1cm4gX2FwcGx5RGVmYXVsdHMocHJvcHMsIGRlZmF1bHRzKTtcclxufSIsImltcG9ydCB7bWVyZ2VTY2hlbWFzfSBmcm9tIFwiQGpmb3JtL3V0aWxzXCI7XHJcbmltcG9ydCB7bWVyZ2V9IGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHtjYW5vbml6YXRpb25SdWxlc30gZnJvbSBcIi4vcnVsZXNcIjtcclxuaW1wb3J0IHtEZWZhdWx0c30gZnJvbSBcImZvcm0vZGVmYXVsdHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBjYW5vbml6ZURlZmF1bHRzID0gKGRlZmF1bHRzOiBEZWZhdWx0cyk6IERlZmF1bHRzID0+IHtcclxuICAgIGNhbm9uaXphdGlvblJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XHJcbiAgICAgICAgZGVmYXVsdHMuY29tbW9uID0gbWVyZ2VTY2hlbWFzKGRlZmF1bHRzLmNvbW1vbiwgcnVsZSh7Li4uZGVmYXVsdHMuY29tbW9ufSkpO1xyXG4gICAgICAgIGZvciAobGV0IHR5cGVLZXkgaW4gZGVmYXVsdHMudHlwZSkge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgZGVmYXVsdHMudHlwZVt0eXBlS2V5XSA9IG1lcmdlU2NoZW1hcyhkZWZhdWx0cy50eXBlW3R5cGVLZXldLCBydWxlKHsuLi5kZWZhdWx0cy50eXBlW3R5cGVLZXldfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCB3aWRnZXRLZXkgaW4gZGVmYXVsdHMud2lkZ2V0KSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBmb3IgKGxldCB3aWRnZXRFbGVtZW50S2V5IGluIGRlZmF1bHRzLndpZGdldFt3aWRnZXRLZXldKSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRzLndpZGdldFt3aWRnZXRLZXldW3dpZGdldEVsZW1lbnRLZXldID0gbWVyZ2VTY2hlbWFzKGRlZmF1bHRzLndpZGdldFt3aWRnZXRLZXldW3dpZGdldEVsZW1lbnRLZXldLCBydWxlKHsuLi5kZWZhdWx0cy53aWRnZXRbd2lkZ2V0S2V5XVt3aWRnZXRFbGVtZW50S2V5XX0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBkZWZhdWx0cy5ydWxlcyA9IGRlZmF1bHRzLnJ1bGVzPy5tYXAocnVsZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChhcmc6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcnVsZSh7Li4uYXJnfSlcclxuICAgICAgICAgICAgcmV0dXJuIFthcmcsIHJlc3VsdCwgLi4uY2Fub25pemF0aW9uUnVsZXMubWFwKHggPT4geCh7Li4ucmVzdWx0fSkpXS5yZWR1Y2UoKGEsIGIpID0+IG1lcmdlKGEsIGIpKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gZGVmYXVsdHM7XHJcbn0iLCJpbXBvcnQge0pTT05TY2hlbWE3fSBmcm9tIFwianNvbi1zY2hlbWFcIjtcclxuaW1wb3J0IHtcclxuICAgIHJlc29sdmVEZXBlbmRlbmNpZXMsXHJcbiAgICBnZXRNYXRjaGluZ09wdGlvbixcclxuICAgIGlzT2JqZWN0LFxyXG4gICAgbWVyZ2VTY2hlbWFzLFxyXG4gICAgZ2V0U2NoZW1hVHlwZSxcclxuICAgIHJldHJpZXZlU2NoZW1hLFxyXG4gICAgZmluZFNjaGVtYURlZmluaXRpb25cclxufSBmcm9tIFwiQGpmb3JtL3V0aWxzXCI7XHJcblxyXG5jb25zdCBfY29tcHV0ZUluaXRpYWxzID0gKF9zY2hlbWE6IEpTT05TY2hlbWE3LCBwYXJlbnREZWZhdWx0czogYW55LCByb290U2NoZW1hOiBKU09OU2NoZW1hNywgX2RhdGE6IGFueSA9IHt9KTogYW55ID0+IHtcclxuICAgIGxldCBzY2hlbWEgPSBpc09iamVjdChfc2NoZW1hKSA/IF9zY2hlbWEgOiB7fTtcclxuICAgIGNvbnN0IGRhdGEgPSBpc09iamVjdChfZGF0YSkgPyBfZGF0YSA6IHt9O1xyXG4gICAgbGV0IGRlZmF1bHRzID0gcGFyZW50RGVmYXVsdHM7XHJcbiAgICBpZiAoc2NoZW1hLiRyZWYpIHtcclxuICAgICAgICAvLyBVc2UgcmVmZXJlbmNlZCBzY2hlbWEgZGVmYXVsdHMgZm9yIHRoaXMgbm9kZS5cclxuICAgICAgICBjb25zdCByZWZTY2hlbWEgPSBmaW5kU2NoZW1hRGVmaW5pdGlvbihzY2hlbWEuJHJlZiwgcm9vdFNjaGVtYSk7XHJcbiAgICAgICAgcmV0dXJuIF9jb21wdXRlSW5pdGlhbHMoXHJcbiAgICAgICAgICAgIHJlZlNjaGVtYSxcclxuICAgICAgICAgICAgZGVmYXVsdHMsXHJcbiAgICAgICAgICAgIHJvb3RTY2hlbWEsXHJcbiAgICAgICAgICAgIGRhdGFcclxuICAgICAgICApXHJcbiAgICB9IGVsc2UgaWYgKHNjaGVtYS5kZXBlbmRlbmNpZXMpIHtcclxuICAgICAgICBjb25zdCByZXNvbHZlZFNjaGVtYSA9IHJlc29sdmVEZXBlbmRlbmNpZXMoc2NoZW1hLCByb290U2NoZW1hLCBkYXRhKTtcclxuICAgICAgICByZXR1cm4gX2NvbXB1dGVJbml0aWFscyhcclxuICAgICAgICAgICAgcmVzb2x2ZWRTY2hlbWEsXHJcbiAgICAgICAgICAgIGRlZmF1bHRzLFxyXG4gICAgICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgICAgICBkYXRhXHJcbiAgICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoZGVmYXVsdHMpICYmIGlzT2JqZWN0KHNjaGVtYS5kZWZhdWx0KSkge1xyXG4gICAgICAgIGRlZmF1bHRzID0gbWVyZ2VTY2hlbWFzKGRlZmF1bHRzLCBzY2hlbWEuZGVmYXVsdCk7XHJcbiAgICB9IGVsc2UgaWYgKHNjaGVtYS5vbmVPZikge1xyXG4gICAgICAgIHNjaGVtYSA9IHNjaGVtYS5vbmVPZltnZXRNYXRjaGluZ09wdGlvbih1bmRlZmluZWQsIHNjaGVtYS5vbmVPZiwgcm9vdFNjaGVtYSldIGFzIEpTT05TY2hlbWE3O1xyXG4gICAgfSBlbHNlIGlmIChzY2hlbWEuYW55T2YpIHtcclxuICAgICAgICBzY2hlbWEgPSBzY2hlbWEuYW55T2ZbZ2V0TWF0Y2hpbmdPcHRpb24odW5kZWZpbmVkLCBzY2hlbWEuYW55T2YsIHJvb3RTY2hlbWEpXSBhcyBKU09OU2NoZW1hNztcclxuICAgIH1cclxuICAgIC8vIE5vdCBkZWZhdWx0cyBkZWZpbmVkIGZvciB0aGlzIG5vZGUsIGZhbGxiYWNrIHRvIGdlbmVyaWMgdHlwZWQgb25lcy5cclxuICAgIGlmIChkZWZhdWx0cyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZGVmYXVsdHMgPSBzY2hlbWEuZGVmYXVsdDtcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKGdldFNjaGVtYVR5cGUoc2NoZW1hKSkge1xyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gcmVjdXIgZm9yIG9iamVjdCBzY2hlbWEgaW5uZXIgZGVmYXVsdCB2YWx1ZXMuXHJcbiAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoc2NoZW1hLnByb3BlcnRpZXMgfHwge30pLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIENvbXB1dGUgdGhlIGRlZmF1bHRzIGZvciB0aGlzIG5vZGUsIHdpdGggdGhlIHBhcmVudCBkZWZhdWx0cyB3ZSBtaWdodFxyXG4gICAgICAgICAgICAgICAgLy8gaGF2ZSBmcm9tIGEgcHJldmlvdXMgcnVuOiBkZWZhdWx0c1trZXldLlxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbXB1dGVkRGVmYXVsdCA9IF9jb21wdXRlSW5pdGlhbHMoXHJcbiAgICAgICAgICAgICAgICAgICAgc2NoZW1hLnByb3BlcnRpZXM/LltrZXldIGFzIEpTT05TY2hlbWE3LFxyXG4gICAgICAgICAgICAgICAgICAgIChkZWZhdWx0cyB8fCB7fSlba2V5XSxcclxuICAgICAgICAgICAgICAgICAgICByb290U2NoZW1hLFxyXG4gICAgICAgICAgICAgICAgICAgIChkYXRhIHx8IHt9KT8uW2tleV1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcHV0ZWREZWZhdWx0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IGNvbXB1dGVkRGVmYXVsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgICAgIH0sIHt9KTtcclxuICAgICAgICBjYXNlIFwiYXJyYXlcIjpcclxuICAgICAgICAgICAgLy8gSW5qZWN0IGRlZmF1bHRzIGludG8gZXhpc3RpbmcgYXJyYXkgZGVmYXVsdHNcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmYXVsdHMpKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0cyA9IGRlZmF1bHRzLm1hcCgoaXRlbSwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb21wdXRlSW5pdGlhbHMoc2NoZW1hLml0ZW1zPy5baWR4XSB8fCBzY2hlbWEuYWRkaXRpb25hbEl0ZW1zIHx8IHt9LCBpdGVtLCByb290U2NoZW1hKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEZWVwbHkgaW5qZWN0IGRlZmF1bHRzIGludG8gYWxyZWFkeSBleGlzdGluZyBmb3JtIGRhdGFcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRzID0gZGF0YS5tYXAoKGl0ZW0sIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29tcHV0ZUluaXRpYWxzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWEuaXRlbXMgYXMgSlNPTlNjaGVtYTcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChkZWZhdWx0cyB8fCB7fSlbaWR4XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9vdFNjaGVtYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlZmF1bHRzO1xyXG59O1xyXG5cclxuY29uc3QgbWVyZ2VEZWZhdWx0c1dpdGhGb3JtRGF0YSA9IChkZWZhdWx0czogYW55LCBkYXRhOiBhbnkpOiBhbnkgPT4ge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGVmYXVsdHMpKSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhLm1hcCgodmFsdWUsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGVmYXVsdHNbaWR4XSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoZGVmYXVsdHNbaWR4XSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoZGF0YSkpIHtcclxuICAgICAgICBjb25zdCBhY2MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cyk7IC8vIFByZXZlbnQgbXV0YXRpb24gb2Ygc291cmNlIG9iamVjdC5cclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoZGF0YSkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBhY2Nba2V5XSA9IG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0cyA/IGRlZmF1bHRzW2tleV0gOiB7fSxcclxuICAgICAgICAgICAgICAgIGRhdGFba2V5XVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIGFjYyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29tcHV0ZUluaXRpYWxzID0gKF9zY2hlbWE6IEpTT05TY2hlbWE3LCByb290U2NoZW1hOiBKU09OU2NoZW1hNywgZGF0YTogYW55KSA9PiB7XHJcbiAgICBjb25zdCBzY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShfc2NoZW1hLCByb290U2NoZW1hLCBkYXRhKTtcclxuICAgIGNvbnN0IGRlZmF1bHRzID0gX2NvbXB1dGVJbml0aWFscyhzY2hlbWEsIF9zY2hlbWEuZGVmYXVsdCwgcm9vdFNjaGVtYSwgZGF0YSk7XHJcbiAgICBpZiAoZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xyXG4gICAgfSBlbHNlIGlmICghZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfSBlbHNlIGlmIChpc09iamVjdChkYXRhKSB8fCBBcnJheS5pc0FycmF5KGRhdGEpKSB7XHJcbiAgICAgICAgcmV0dXJuIG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoZGVmYXVsdHMsIGRhdGEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZGF0YSB8fCBkZWZhdWx0cztcclxuICAgIH1cclxufSIsImltcG9ydCB7dXNlRWZmZWN0LCB1c2VTdGF0ZX0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgICBjb25zdCBbaW5pdCwgc2V0SW5pdF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgICBjb25zdCBbbG9hZGluZ0luaXQsIHNldExvYWRpbmdJbml0XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcblxyXG4gICAgY29uc3QgZGlkTW91bnQgPSAoaGFuZGxlcjogRnVuY3Rpb24pID0+IHtcclxuICAgICAgICBpZiAoIWxvYWRpbmdJbml0KSB7XHJcbiAgICAgICAgICAgIHNldExvYWRpbmdJbml0KHRydWUpXHJcbiAgICAgICAgICAgIGhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGlkVXBkYXRlID0gKGhhbmRsZXI6IEZ1bmN0aW9uLCBkZXBzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaW5pdCkge1xyXG4gICAgICAgICAgICAgICAgc2V0SW5pdCh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGRlcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbZGlkTW91bnQsIGRpZFVwZGF0ZV1cclxufTsiLCJpbXBvcnQgUmVhY3QsIHtjcmVhdGVDb250ZXh0LCBQcm9wc1dpdGhDaGlsZHJlbiwgdXNlTWVtbywgdXNlU3RhdGV9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2NoZW1hIGZyb20gXCIuL3NjaGVtYVwiO1xyXG5pbXBvcnQge2lzRXF1YWx9IGZyb20gXCJsb2Rhc2hcIlxyXG5pbXBvcnQgZ2V0RGVmYXVsdFRlbXBsYXRlLCB7Rm9ybVRlbXBsYXRlfSBmcm9tIFwiLi9zY2hlbWEvdGVtcGxhdGVzXCI7XHJcbmltcG9ydCBnZXREZWZhdWx0V2lkZ2V0cywge1dpZGdldHN9IGZyb20gXCIuL3NjaGVtYS93aWRnZXRzXCI7XHJcbmltcG9ydCBnZXREZWZhdWx0cywge2FwcGx5RGVmYXVsdHMsIGNhbm9uaXplRGVmYXVsdHMsIGNvbXB1dGVJbml0aWFscywgRGVmYXVsdHN9IGZyb20gXCIuL2RlZmF1bHRzXCI7XHJcbmltcG9ydCB7SlNPTlNjaGVtYTd9IGZyb20gXCJqc29uLXNjaGVtYVwiO1xyXG5pbXBvcnQge3VzZUxpZmVDeWNsZX0gZnJvbSBcIi4vaG9va3NcIjtcclxuaW1wb3J0IHtWYWxpZGF0aW9uU2NoZW1hLCBDb25maWdTY2hlbWEsIEV2ZW50U2NoZW1hLCBKU2NoZW1hLCBSZWFkU2NoZW1hLCBSdWxlc1NjaGVtYX0gZnJvbSBcInR5cGVzXCI7XHJcbmltcG9ydCB7bWVyZ2VTY2hlbWFzfSBmcm9tIFwiQGpmb3JtL3V0aWxzXCI7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGb3JtUHJvcHMge1xyXG4gICAgZGF0YTogc3RyaW5nLFxyXG4gICAgc2NoZW1hOiBKU09OU2NoZW1hNyxcclxuICAgIGNvbmZpZ1NjaGVtYT86IENvbmZpZ1NjaGVtYSxcclxuICAgIHJlYWRTY2hlbWE/OiBSZWFkU2NoZW1hLFxyXG4gICAgdmFsaWRhdGlvblNjaGVtYT86IFZhbGlkYXRpb25TY2hlbWEsXHJcbiAgICBldmVudFNjaGVtYT86IEV2ZW50U2NoZW1hLFxyXG4gICAgdGVtcGxhdGU/OiBGb3JtVGVtcGxhdGUsXHJcbiAgICB3aWRnZXRzPzogV2lkZ2V0cyxcclxuICAgIGVycm9ycz86IHN0cmluZ1tdLFxyXG4gICAgcnVsZXNTY2hlbWE/OiBSdWxlc1NjaGVtYSxcclxuICAgIGRlZmF1bHRzPzogRGVmYXVsdHMsXHJcbiAgICBzY2hlbWFJbml0aWFsaXplZD86IChhcmc6IEpTY2hlbWEgJiB7IGRhdGE6IGFueSB9KSA9PiB2b2lkLFxyXG4gICAgb25DaGFuZ2U/OiAoYXJnOiBhbnkpID0+IHZvaWQsXHJcbiAgICBvbkJsdXI/OiAoKSA9PiB2b2lkLFxyXG4gICAgb25Gb2N1cz86ICgpID0+IHZvaWQsXHJcbiAgICBvblN1Ym1pdD86IChhcmc6IGFueSkgPT4gdm9pZFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZXh0cmFjdFNjaGVtYUZyb21Qcm9wcyA9IChwcm9wczogRm9ybVByb3BzIHwgSlNjaGVtYSk6IFJlcXVpcmVkPEpTY2hlbWE+ID0+IHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgICBzY2hlbWEgPSB7fSxcclxuICAgICAgICBjb25maWdTY2hlbWEgPSB7fSxcclxuICAgICAgICByZWFkU2NoZW1hID0ge30sXHJcbiAgICAgICAgZXZlbnRTY2hlbWEgPSB7fSxcclxuICAgICAgICB2YWxpZGF0aW9uU2NoZW1hID0ge30sXHJcbiAgICAgICAgcnVsZXNTY2hlbWEgPSBbXVxyXG4gICAgfSA9IHByb3BzO1xyXG4gICAgcmV0dXJuIHtzY2hlbWEsIGNvbmZpZ1NjaGVtYSwgcmVhZFNjaGVtYSwgZXZlbnRTY2hlbWEsIHZhbGlkYXRpb25TY2hlbWEsIHJ1bGVzU2NoZW1hfVxyXG59XHJcblxyXG5cclxuLy8gQHRzLWlnbm9yZVxyXG5leHBvcnQgY29uc3QgSkZvcm1Db250ZXh0ID0gY3JlYXRlQ29udGV4dDx7IHRlbXBsYXRlOiBQYXJ0aWFsPEZvcm1UZW1wbGF0ZT4sIHdpZGdldHM6IFBhcnRpYWw8V2lkZ2V0cz4sIHNjaGVtYTogSlNPTlNjaGVtYTcsIGRlZmF1bHRzOiBEZWZhdWx0cyB9Pih7fSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGb3JtKHByb3BzOiBQcm9wc1dpdGhDaGlsZHJlbjxGb3JtUHJvcHM+KSB7XHJcbiAgICBsZXQge3RlbXBsYXRlID0ge30sIHdpZGdldHMgPSB7fSwgZGVmYXVsdHMgPSB7fSwgc2NoZW1hSW5pdGlhbGl6ZWQsIGVycm9yc30gPSBwcm9wcztcclxuXHJcbiAgICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShwcm9wcy5kYXRhKTtcclxuICAgIGNvbnN0IFtiZWZvcmVEZWZhdWx0cywgc2V0QmVmb3JlRGVmYXVsdHNdID0gdXNlU3RhdGU8UmVxdWlyZWQ8SlNjaGVtYT4+KGV4dHJhY3RTY2hlbWFGcm9tUHJvcHMocHJvcHMpKTtcclxuICAgIGNvbnN0IFtqc2NoZW1hLCBzZXRKc2NoZW1hXSA9IHVzZVN0YXRlPFJlcXVpcmVkPEpTY2hlbWE+PihiZWZvcmVEZWZhdWx0cyk7XHJcblxyXG4gICAgY29uc3QgY29tcHV0ZWRUZW1wbGF0ZSA9IHVzZU1lbW8oKCkgPT4gbWVyZ2VTY2hlbWFzKGdldERlZmF1bHRUZW1wbGF0ZSgpLCB0ZW1wbGF0ZSksIFt0ZW1wbGF0ZV0pO1xyXG4gICAgY29uc3QgY29tcHV0ZWRXaWRnZXRzID0gdXNlTWVtbygoKSA9PiBtZXJnZVNjaGVtYXMoZ2V0RGVmYXVsdFdpZGdldHMoKSwgd2lkZ2V0cyksIFt3aWRnZXRzXSk7XHJcbiAgICBjb25zdCBjb21wdXRlZERlZmF1bHRzID0gdXNlTWVtbygoKSA9PiBjYW5vbml6ZURlZmF1bHRzKG1lcmdlU2NoZW1hcyhnZXREZWZhdWx0cygpLCBkZWZhdWx0cykpLCBbZGVmYXVsdHNdKTtcclxuXHJcbiAgICBjb25zdCBvbkJsdXIgPSAoKSA9PiBwcm9wcy5vbkJsdXIgJiYgcHJvcHMub25CbHVyKCk7XHJcbiAgICBjb25zdCBvbkZvY3VzID0gKCkgPT4gcHJvcHMub25Gb2N1cyAmJiBwcm9wcy5vbkZvY3VzKCk7XHJcbiAgICBjb25zdCBvbkNoYW5nZSA9ICh2YWx1ZTogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKGlzRXF1YWwodmFsdWUsIGRhdGEpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByb3BzLm9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHByb3BzLm9uQ2hhbmdlKHZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgICAgICB1cGRhdGVEYXRhKHZhbHVlKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9uU3VibWl0ID0gKCkgPT4ge1xyXG4gICAgICAgIHByb3BzPy5vblN1Ym1pdD8uKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGV4dGVuZFNjaGVtYXMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5pdGlhbFNjaGVtYSA9IGV4dHJhY3RTY2hlbWFGcm9tUHJvcHMoYmVmb3JlRGVmYXVsdHMpO1xyXG4gICAgICAgIGNvbnN0IGpzY2hlbWEgPSBhcHBseURlZmF1bHRzKGluaXRpYWxTY2hlbWEsIGNvbXB1dGVkRGVmYXVsdHMpO1xyXG4gICAgICAgIGNvbnN0IGRhdGFXaXRoRGVmYXVsdHMgPSBjb21wdXRlSW5pdGlhbHMoanNjaGVtYS5zY2hlbWEgYXMgSlNPTlNjaGVtYTcsIGpzY2hlbWEuc2NoZW1hIGFzIEpTT05TY2hlbWE3LCBkYXRhKTtcclxuICAgICAgICBzZXREYXRhKGRhdGFXaXRoRGVmYXVsdHMpO1xyXG4gICAgICAgIHNldEpzY2hlbWEoanNjaGVtYSk7XHJcbiAgICAgICAgaWYgKHNjaGVtYUluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgIHNjaGVtYUluaXRpYWxpemVkKHsuLi5qc2NoZW1hLCBkYXRhOiBkYXRhV2l0aERlZmF1bHRzfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVwZGF0ZURhdGEgPSAoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgc2V0RGF0YShkYXRhKVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgY29uc3QgW2RpZE1vdW50LCBkaWRVcGRhdGVdID0gdXNlTGlmZUN5Y2xlKCk7XHJcbiAgICBjb25zdCBbLCBkaWRVcGRhdGVEYXRhXSA9IHVzZUxpZmVDeWNsZSgpO1xyXG5cclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgZGlkTW91bnQoZXh0ZW5kU2NoZW1hcyk7XHJcbiAgICBkaWRVcGRhdGUoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGpzY2hlbWEgPSBleHRyYWN0U2NoZW1hRnJvbVByb3BzKHByb3BzKTtcclxuICAgICAgICBzZXRCZWZvcmVEZWZhdWx0cyhqc2NoZW1hKVxyXG4gICAgfSwgW3Byb3BzLnNjaGVtYSwgcHJvcHMuY29uZmlnU2NoZW1hLCBwcm9wcy5kZWZhdWx0c10pO1xyXG4gICAgZGlkVXBkYXRlKGV4dGVuZFNjaGVtYXMsIFtiZWZvcmVEZWZhdWx0c10pO1xyXG4gICAgZGlkVXBkYXRlRGF0YSgoKSA9PiB1cGRhdGVEYXRhKHByb3BzLmRhdGEpLCBbcHJvcHMuZGF0YV0pXHJcblxyXG5cclxuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImpmb3JtXCI+XHJcbiAgICAgICAgPEpGb3JtQ29udGV4dC5Qcm92aWRlclxyXG4gICAgICAgICAgICB2YWx1ZT17e1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IGNvbXB1dGVkVGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiBjb21wdXRlZFdpZGdldHMsXHJcbiAgICAgICAgICAgICAgICBzY2hlbWE6IGpzY2hlbWEuc2NoZW1hLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdHM6IGNvbXB1dGVkRGVmYXVsdHNcclxuICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiamZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgIDxTY2hlbWEgZGF0YT17ZGF0YX0gey4uLmpzY2hlbWF9IGVycm9ycz17ZXJyb3JzfSBvbkJsdXI9e29uQmx1cn0gb25Gb2N1cz17b25Gb2N1c30gb25DaGFuZ2U9e29uQ2hhbmdlfS8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7cHJvcHMub25TdWJtaXQgJiYgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWluZm9cIiBvbkNsaWNrPXtvblN1Ym1pdH0+U3VibWl0PC9idXR0b24+fVxyXG4gICAgICAgIDwvSkZvcm1Db250ZXh0LlByb3ZpZGVyPlxyXG4gICAgPC9kaXY+XHJcbn1cclxuIiwiaW1wb3J0IHtKU09OU2NoZW1hN30gZnJvbSBcImpzb24tc2NoZW1hXCI7XHJcbmltcG9ydCBqc29ucG9pbnRlciBmcm9tIFwianNvbnBvaW50ZXJcIjtcclxuaW1wb3J0IHtvbWl0fSBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZmluZFNjaGVtYURlZmluaXRpb24gPSAocmVmOiBzdHJpbmcsIHJvb3RTY2hlbWE6IEpTT05TY2hlbWE3ID0ge30pOiBKU09OU2NoZW1hNyA9PiB7XHJcbiAgICBpZiAocmVmPy5zdGFydHNXaXRoKCcjJykpIHtcclxuICAgICAgICByZWYgPSBkZWNvZGVVUklDb21wb25lbnQocmVmLnN1YnN0cmluZygxKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYSBkZWZpbml0aW9uIGZvciAke3JlZn0uYCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBjdXJyZW50OiBKU09OU2NoZW1hNyA9IGpzb25wb2ludGVyLmdldChyb290U2NoZW1hLCByZWYpO1xyXG4gICAgaWYgKGN1cnJlbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYSBkZWZpbml0aW9uIGZvciAke3JlZn0uYCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY3VycmVudC4kcmVmKSB7XHJcbiAgICAgICAgY29uc3Qgc3ViU2NoZW1hID0gZmluZFNjaGVtYURlZmluaXRpb24oY3VycmVudC4kcmVmISwgcm9vdFNjaGVtYSk7XHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGN1cnJlbnQpLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsuLi5vbWl0KGN1cnJlbnQsIFtcIiRyZWZcIl0pLCAuLi5zdWJTY2hlbWF9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3ViU2NoZW1hO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN1cnJlbnQ7XHJcbn1cclxuIiwiaW1wb3J0IHtKU09OU2NoZW1hN1R5cGVOYW1lfSBmcm9tIFwianNvbi1zY2hlbWFcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBndWVzc1R5cGUgPSAodmFsdWU6IGFueSk6IEpTT05TY2hlbWE3VHlwZU5hbWUgPT4ge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuICdhcnJheSc7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVybiAnc3RyaW5nJztcclxuICAgIH1cclxuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuICdudWxsJztcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHJldHVybiAnYm9vbGVhbic7XHJcbiAgICB9XHJcbiAgICBpZiAoIWlzTmFOKHZhbHVlKSkge1xyXG4gICAgICAgIHJldHVybiAnbnVtYmVyJztcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgcmV0dXJuICdvYmplY3QnO1xyXG4gICAgfVxyXG4gICAgLy8gRGVmYXVsdCB0byBzdHJpbmcgaWYgd2UgY2FuJ3QgZmlndXJlIGl0IG91dFxyXG4gICAgcmV0dXJuICdzdHJpbmcnO1xyXG59XHJcbiIsImltcG9ydCB7Z3Vlc3NUeXBlfSBmcm9tIFwiLi9ndWVzc1R5cGVcIjtcclxuaW1wb3J0IHtKU09OU2NoZW1hNywgSlNPTlNjaGVtYTdUeXBlTmFtZX0gZnJvbSBcImpzb24tc2NoZW1hXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U2NoZW1hVHlwZSA9IChzY2hlbWE6IEpTT05TY2hlbWE3KTogSlNPTlNjaGVtYTdUeXBlTmFtZSB8IEpTT05TY2hlbWE3VHlwZU5hbWVbXSA9PiB7XHJcbiAgICBsZXQge3R5cGV9ID0gc2NoZW1hO1xyXG5cclxuICAgIGlmICghdHlwZSkge1xyXG4gICAgICAgIGlmIChzY2hlbWEuY29uc3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGd1ZXNzVHlwZShzY2hlbWEuY29uc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2NoZW1hLmVudW0pIHtcclxuICAgICAgICAgICAgaWYgKHNjaGVtYS5lbnVtLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBndWVzc1R5cGUoc2NoZW1hLmVudW1bMF0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc2NoZW1hLnByb3BlcnRpZXMgfHwgc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIm9iamVjdFwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHR5cGUpICYmIHR5cGUubGVuZ3RoID09PSAyICYmIHR5cGUuaW5jbHVkZXMoJ251bGwnKSkge1xyXG4gICAgICAgIHR5cGUgPSB0eXBlLmZpbmQodHlwZSA9PiB0eXBlICE9PSAnbnVsbCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0eXBlIHx8ICdzdHJpbmcnO1xyXG59IiwiLyoqIERldGVybWluZXMgd2hldGhlciBhIGB0aGluZ2AgaXMgYW4gb2JqZWN0IGZvciB0aGUgcHVycG9zZXMgb2YgSnNvbiBzY2hlbWEuIEluIHRoaXMgY2FzZSwgYHRoaW5nYCBpcyBhbiBvYmplY3QgaWYgaXQgaGFzXHJcbiAqIHRoZSB0eXBlIGBvYmplY3RgIGJ1dCBpcyBOT1QgbnVsbCwgYW4gYXJyYXkgb3IgYSBGaWxlLlxyXG4gKlxyXG4gKiBAcGFyYW0gdGhpbmcgLSBUaGUgdGhpbmcgdG8gY2hlY2sgdG8gc2VlIHdoZXRoZXIgaXQgaXMgYW4gb2JqZWN0XHJcbiAqIEByZXR1cm5zIC0gVHJ1ZSBpZiBpcyBhIG5vbi1udWxsLCBub24tYXJyYXksIG5vbi1GaWxlIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0ID0gKHRoaW5nOiBhbnkpOiBib29sZWFuID0+IHtcclxuICAgIGlmICh0eXBlb2YgRmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpbmcgaW5zdGFuY2VvZiBGaWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ29iamVjdCcgJiYgdGhpbmcgIT09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkodGhpbmcpO1xyXG59IiwiaW1wb3J0IHtpc0FycmF5LCBtZXJnZVdpdGgsIHVuaW9ufSBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7aXNPYmplY3R9IGZyb20gXCIuL2lzT2JqZWN0XCI7XHJcbmltcG9ydCB7Z2V0U2NoZW1hVHlwZX0gZnJvbSBcIi4vZ2V0U2NoZW1hVHlwZVwiO1xyXG5cclxuY29uc3QgY3VzdG9taXplciA9IChhOiBhbnksIGI6IGFueSwga2V5OiBzdHJpbmcsIG9iamVjdDogYW55LCBzb3VyY2U6IGFueSk6IGFueSA9PiB7XHJcbiAgICBpZiAoa2V5ID09PSBcInJlcXVpcmVkXCIgJiYgaXNBcnJheShhKSAmJiBpc0FycmF5KGIpKSB7XHJcbiAgICAgICAgaWYoZ2V0U2NoZW1hVHlwZShvYmplY3QpID09PSAnb2JqZWN0JyB8fCBnZXRTY2hlbWFUeXBlKHNvdXJjZSkgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmlvbihhLCBiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoa2V5LmVuZHNXaXRoKFwibGFzc05hbWVcIikgJiYgdHlwZW9mIGEgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBiID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVybiB1bmlvbihhLnNwbGl0KFwiIFwiKSwgYi5zcGxpdChcIiBcIikpLmpvaW4oXCIgXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzQXJyYXkoYSkgJiYgaXNPYmplY3QoYikpIHtcclxuICAgICAgICByZXR1cm4gYjtcclxuICAgIH1cclxuICAgIGlmIChpc09iamVjdChhKSAmJiBpc0FycmF5KGIpKSB7XHJcbiAgICAgICAgcmV0dXJuIGI7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNBcnJheShhKSAmJiBpc0FycmF5KGIpKSB7XHJcbiAgICAgICAgcmV0dXJuIGI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbWVyZ2VTY2hlbWFzID0gPFQ+KGFyZzogVCwgLi4uYXJnczogUGFydGlhbDxUPltdKTogVCA9PiB7XHJcbiAgICByZXR1cm4gbWVyZ2VXaXRoKGFyZywgLi4uYXJncywgY3VzdG9taXplcik7XHJcbn1cclxuIiwiaW1wb3J0IHtKU09OU2NoZW1hN30gZnJvbSBcImpzb24tc2NoZW1hXCI7XHJcbmltcG9ydCBfdHJhdmVyc2UgZnJvbSBcIkBqc29uLXNjaGVtYS10b29scy90cmF2ZXJzZVwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCJcclxuXHJcbmNvbnN0IGlnbm9yZSA9IHtcclxuICAgIGFkZGl0aW9uYWxJdGVtczogdHJ1ZSxcclxuICAgIGl0ZW1zOiB0cnVlLFxyXG4gICAgY29udGFpbnM6IHRydWUsXHJcbiAgICBwcm9wZXJ0eU5hbWVzOiB0cnVlLFxyXG4gICAgbm90OiB0cnVlLFxyXG4gICAgaWY6IHRydWUsXHJcbiAgICB0aGVuOiB0cnVlLFxyXG4gICAgZWxzZTogdHJ1ZSxcclxuICAgIGFsbE9mOiB0cnVlLFxyXG4gICAgYW55T2Y6IHRydWUsXHJcbiAgICBvbmVPZjogdHJ1ZSxcclxuICAgICRkZWZzOiB0cnVlLFxyXG4gICAgZGVmaW5pdGlvbnM6IHRydWUsXHJcbiAgICBwcm9wZXJ0aWVzOiB0cnVlLFxyXG4gICAgcGF0dGVyblByb3BlcnRpZXM6IHRydWUsXHJcbiAgICBkZXBlbmRlbmNpZXM6IHRydWUsXHJcbiAgICBcIl5cXGQrJFwiOiB0cnVlXHJcbn07XHJcblxyXG5jb25zdCBpZ25vcmVQYXRocyA9IE9iamVjdC5rZXlzKGlnbm9yZSkuam9pbignfCcpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRyYXZlcnNlID0gKF9zY2hlbWE6IEpTT05TY2hlbWE3LCBfYWRkaXRpb25hbFNjaGVtYXM6IHsgW2s6IHN0cmluZ106IHt9IH0sIGhhbmRsZXI6IChhcmcwOiBKU09OU2NoZW1hNywgYXJnMTogeyBbazogc3RyaW5nXToge30gfSkgPT4geyBbazogc3RyaW5nXToge30gfSk6IEpTT05TY2hlbWE3ID0+IHtcclxuICAgIHJldHVybiBfdHJhdmVyc2UoX3NjaGVtYSB8fCB7fSwgKHNjaGVtYU9yU3Vic2NoZW1hOiBKU09OU2NoZW1hNywgX2I6IGJvb2xlYW4sIF9wYXRoOiBzdHJpbmcpID0+IHtcclxuICAgICAgICBjb25zdCBwcm9wZXJ0eVBhdGggPSBfcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoaWdub3JlUGF0aHMsIFwiZ1wiKSwgXCJcIikuc3BsaXQoXCIvXCIpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB4ICE9PSBcIlwiKVxyXG4gICAgICAgICAgICAubWFwKHggPT4geCA9PT0gXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiID8geCA6IFwiJFwiICsgeCk7XHJcbiAgICAgICAgY29uc3Qgb2JqZWN0UGF0aCA9IHByb3BlcnR5UGF0aC5qb2luKFwiLlwiKTtcclxuXHJcbiAgICAgICAgbGV0IF9hZGRpdGlvbmFsU3ViU2NoZW1hcztcclxuICAgICAgICBpZiAocHJvcGVydHlQYXRoLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgX2FkZGl0aW9uYWxTdWJTY2hlbWFzID0gT2JqZWN0LmVudHJpZXMoX2FkZGl0aW9uYWxTY2hlbWFzKS5tYXAoKFtrLCB2XSkgPT4gKHtba106IF8uZ2V0KHYsIG9iamVjdFBhdGgpfSkpXHJcbiAgICAgICAgICAgICAgICAucmVkdWNlKChhLCBiKSA9PiAoey4uLmEsIC4uLmJ9KSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX2FkZGl0aW9uYWxTdWJTY2hlbWFzID0gX2FkZGl0aW9uYWxTY2hlbWFzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBtdXRhdGlvbiA9IGhhbmRsZXIoc2NoZW1hT3JTdWJzY2hlbWEsIF9hZGRpdGlvbmFsU3ViU2NoZW1hcyk7XHJcbiAgICAgICAgaWYgKG11dGF0aW9uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHtzY2hlbWEgPSBzY2hlbWFPclN1YnNjaGVtYSwgLi4uX211dGF0ZWRTdWJzY2hlbWFzfSA9IG11dGF0aW9uO1xyXG4gICAgICAgICAgICBpZihwcm9wZXJ0eVBhdGgubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBfLm1lcmdlKF9hZGRpdGlvbmFsU2NoZW1hcywgX211dGF0ZWRTdWJzY2hlbWFzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKF9tdXRhdGVkU3Vic2NoZW1hcykuZm9yRWFjaCgoW2ssIHZdKSA9PiBfLnNldChfYWRkaXRpb25hbFNjaGVtYXNba10sIG9iamVjdFBhdGgsIHYpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzY2hlbWE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzY2hlbWFPclN1YnNjaGVtYTtcclxuICAgIH0sIHtiZnM6IHRydWUsIG11dGFibGU6IHRydWV9KTtcclxufSIsImltcG9ydCB0cmF2ZXJzZSBmcm9tIFwiQGpzb24tc2NoZW1hLXRvb2xzL3RyYXZlcnNlXCI7XHJcbmltcG9ydCB7SlNPTlNjaGVtYTd9IGZyb20gXCJqc29uLXNjaGVtYVwiO1xyXG5pbXBvcnQge2ZpbmRTY2hlbWFEZWZpbml0aW9ufSBmcm9tIFwiLi9maW5kU2NoZW1hRGVmaW5pdGlvblwiO1xyXG5cclxuaW50ZXJmYWNlIFJlZkNhY2hlIHtcclxuICAgIFtrOiBzdHJpbmddOiBKU09OU2NoZW1hNztcclxufVxyXG5cclxuLyoqXHJcbiAqIE9wdGlvbnMgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIHRoZSBkZXJlZmVuY2VyIGNvbnN0cnVjdG9yLlxyXG4gKi9cclxuaW50ZXJmYWNlIERlcmVmZXJlbmNlck9wdGlvbnMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBJZiB0cnVlLCByZXNvbHZlZCBub24tbG9jYWwgcmVmZXJlbmNlcyB3aWxsIGFsc28gYmUgZGVyZWZlcmVuY2VkIHVzaW5nIHRoZSBzYW1lIG9wdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIHJlY3Vyc2l2ZT86IGJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqIFByZXNlZWQgdGhlIGRlcmVmZXJlbmNlciB3aXRoIHJlc29sdmVkIHJlZnNcclxuICAgICAqL1xyXG4gICAgcmVmQ2FjaGU/OiBSZWZDYWNoZTtcclxuICAgIHJvb3RTY2hlbWE/OiBKU09OU2NoZW1hNztcclxufVxyXG5cclxuXHJcbmNvbnN0IGNvcHlPck5vdCA9IChzMTogYW55LCBzMjogSlNPTlNjaGVtYTcpID0+IHtcclxuICAgIGNvbnN0IHJlZmxlc3NDb3B5ID0ge1xyXG4gICAgICAgIC4uLnMyLFxyXG4gICAgICAgIC4uLnMxXHJcbiAgICB9O1xyXG4gICAgZGVsZXRlIHJlZmxlc3NDb3B5LiRyZWY7XHJcbiAgICByZXR1cm4gcmVmbGVzc0NvcHk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBXaGVuIGluc3RhbnRpYXRlZCwgcmVwcmVzZW50cyBhIGZ1bGx5IGNvbmZpZ3VyZWQgZGVyZWZlcmVuY2VyLiBXaGVuIGNvbnN0cnVjdGVkLCByZWZlcmVuY2VzIGFyZSBwdWxsZWQgb3V0LlxyXG4gKiBObyByZWZlcmVuY2VzIGFyZSBmZXRjaGVkIHVudGlsIC5yZXNvbHZlIGlzIGNhbGxlZC5cclxuICovXHJcbmNsYXNzIERlcmVmZXJlbmNlciB7XHJcbiAgICBwdWJsaWMgcmVmczogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIHNjaGVtYTogSlNPTlNjaGVtYTc7XHJcbiAgICBwdWJsaWMgcmVmQ2FjaGU6IFJlZkNhY2hlID0ge307XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NoZW1hOiBKU09OU2NoZW1hNywgcHJpdmF0ZSBvcHRpb25zOiBEZXJlZmVyZW5jZXJPcHRpb25zID0ge30pIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJlY3Vyc2l2ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5yZWN1cnNpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yb290U2NoZW1hID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnJvb3RTY2hlbWEgPSBzY2hlbWE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2NoZW1hICE9PSB0cnVlICYmIHNjaGVtYSAhPT0gZmFsc2UgJiYgc2NoZW1hLiRpZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMucm9vdFNjaGVtYSA9IHNjaGVtYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucmVmQ2FjaGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZDYWNoZSA9IHRoaXMub3B0aW9ucy5yZWZDYWNoZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2NoZW1hID0gc2NoZW1hOyAvLyBzaGFsbG93IGNvcHkgYnJlYWtzIHJlY3Vyc2l2ZVxyXG4gICAgICAgIHRoaXMucmVmcyA9IHRoaXMuY29sbGVjdFJlZnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZldGNoZXMgdGhlIHNjaGVtYXMgZm9yIGFsbCB0aGUgcmVmcyBpbiB0aGUgY29uZmlndXJlZCBpbnB1dCBzY2hlbWEocylcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIHJlc29sdmUgYSBmdWxseSBkZXJlZmVyZW5jZWQgc2NoZW1hLCB3aGVyZSBhbGwgdGhlXHJcbiAgICAgKiAgICAgICAgICBwcm9taXNlcyBmb3IgZWFjaCByZWYgaGFzIGJlZW4gcmVzb2x2ZWQgYXMgd2VsbC5cclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzb2x2ZSgpOiBKU09OU2NoZW1hNyB7XHJcbiAgICAgICAgY29uc3QgcmVmTWFwOiB7IFtzOiBzdHJpbmddOiBKU09OU2NoZW1hNyB9ID0ge307XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNjaGVtYSA9PT0gdHJ1ZSB8fCB0aGlzLnNjaGVtYSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NoZW1hO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmVmcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NoZW1hO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdW5mZXRjaGVkUmVmcyA9IHRoaXMucmVmcy5maWx0ZXIoKHIpID0+IHJlZk1hcFtyXSA9PT0gdW5kZWZpbmVkKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCByZWYgb2YgdW5mZXRjaGVkUmVmcykge1xyXG4gICAgICAgICAgICBsZXQgZmV0Y2hlZDogSlNPTlNjaGVtYTc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlZkNhY2hlW3JlZl0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZmV0Y2hlZCA9IHRoaXMucmVmQ2FjaGVbcmVmXTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZWYgPT09IFwiI1wiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJvb3RTY2hlbWEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm9wdGlvbnMucm9vdFNjaGVtYSB3YXMgbm90IHByb3ZpZGVkLCBidXQgb25lIG9mIHRoZSBzY2hlbWFzIHJlZmVyZW5jZXMgJyMnXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmV0Y2hlZCA9IHRoaXMub3B0aW9ucy5yb290U2NoZW1hO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmV0Y2hlZCA9IGZpbmRTY2hlbWFEZWZpbml0aW9uKHJlZiwgdGhpcy5vcHRpb25zLnJvb3RTY2hlbWEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJlY3Vyc2l2ZSA9PT0gdHJ1ZSAmJiBmZXRjaGVkICE9PSB0cnVlICYmIGZldGNoZWQgIT09IGZhbHNlICYmIHJlZiAhPT0gXCIjXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1YkRlcmVmZmVyT3B0cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi50aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVmQ2FjaGU6IHRoaXMucmVmQ2FjaGUsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViRGVyZWZmZXIgPSBuZXcgRGVyZWZlcmVuY2VyKGZldGNoZWQsIHN1YkRlcmVmZmVyT3B0cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN1YkRlcmVmZmVyLnJlZnMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViRmV0Y2hlZFByb20gPSBzdWJEZXJlZmZlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIHByb3BzIG90aGVyIHRoYW4gJHJlZiBwcmVzZW50IG9uIHRoZSBmZXRjaGVkIHNjaGVtYSxcclxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIGJyZWFrIHJlZmVyZW50aWFsIGludGVncml0eSwgY3JlYXRpbmcgYSBuZXcgc2NoZW1hIGFsbCB0b2dldGhlci5cclxuICAgICAgICAgICAgICAgICAgICByZWZNYXBbcmVmXSA9IGNvcHlPck5vdChmZXRjaGVkLCBzdWJGZXRjaGVkUHJvbSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZk1hcFtyZWZdID0gZmV0Y2hlZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlZk1hcFtyZWZdID0gZmV0Y2hlZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZWZDYWNoZVtyZWZdID0gcmVmTWFwW3JlZl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zY2hlbWEuJHJlZiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZW1hID0gY29weU9yTm90KHRoaXMuc2NoZW1hLCByZWZNYXBbdGhpcy5zY2hlbWEuJHJlZl0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRyYXZlcnNlKHRoaXMuc2NoZW1hLCAocykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHMgPT09IHRydWUgfHwgcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChzLiRyZWYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmZlZFNjaGVtYSA9IHJlZk1hcFtzLiRyZWZdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3B5T3JOb3QocywgcmVmZmVkU2NoZW1hKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgICAgICB9LCB7bXV0YWJsZTogdHJ1ZX0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NoZW1hO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlyc3QtcGFzcyB0cmF2ZXJzYWwgdG8gY29sbGVjdCBhbGwgdGhlIHJlZnMgdGhhdCB3ZSBjYW4gZmluZC4gVGhpcyBhbGxvd3MgdXMgdG9cclxuICAgICAqIG9wdGltaXplIHRoZSBhc3luYyB3b3JrIHJlcXVpcmVkIGFzIHdlbGwuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb2xsZWN0UmVmcygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgY29uc3QgcmVmczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAgICAgdHJhdmVyc2UodGhpcy5zY2hlbWEsIChzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzID09PSB0cnVlIHx8IHMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocy4kcmVmICYmIHJlZnMuaW5kZXhPZihzLiRyZWYpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzLiRyZWYgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGb3VuZCBhbiBpbXByb3Blcmx5IGZvcm1hdHRlZCAkcmVmIGluIHNjaGVtYS4gJHJlZiBtdXN0IGJlIGEgc3RyaW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJlZnMucHVzaChzLiRyZWYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVmcztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVSZWZlcmVuY2UgPSAoc2NoZW1hOiBKU09OU2NoZW1hNywgcm9vdFNjaGVtYTogSlNPTlNjaGVtYTcpOiBKU09OU2NoZW1hNyA9PiB7XHJcbiAgICByZXR1cm4gbmV3IERlcmVmZXJlbmNlcihzY2hlbWEgfHwge30sIHtyb290U2NoZW1hfSkucmVzb2x2ZSgpO1xyXG59IiwiaW1wb3J0IHtGdW5jdGlvbkNvbXBvbmVudH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0V2lkZ2V0ID0gPFQgZXh0ZW5kcyBhbnk+KHR5cGU6IHN0cmluZywgd2lkZ2V0Pzogc3RyaW5nIHwgRnVuY3Rpb25Db21wb25lbnQ8VD4sIHdpZGdldHM/OiBhbnksIGRlZmF1bHRzPzogYW55KTogRnVuY3Rpb25Db21wb25lbnQ8VD4gPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aWRnZXQgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHJldHVybiB3aWRnZXQ7XHJcbiAgICB9XHJcbiAgICBsZXQgZm91bmRXaWRnZXQgPSB3aWRnZXQ7XHJcbiAgICBpZihmb3VuZFdpZGdldCA9PT0gdW5kZWZpbmVkICYmIGRlZmF1bHRzICE9PSB1bmRlZmluZWQgJiYgdHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZm91bmRXaWRnZXQgPSBkZWZhdWx0cz8udHlwZT8uW3R5cGVdPy5jb25maWdTY2hlbWE/LndpZGdldD8udHlwZTtcclxuICAgIH1cclxuICAgIGlmICh3aWRnZXRzPy5bdHlwZV0/Lltmb3VuZFdpZGdldCB8fCBcInVuZGVmaW5lZFwiXSkge1xyXG4gICAgICAgIHJldHVybiB3aWRnZXRzW3R5cGVdW2ZvdW5kV2lkZ2V0IHx8IFwidW5kZWZpbmVkXCJdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZih3aWRnZXRzPy5bdHlwZV0pIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyB3aWRnZXQgXCIke2ZvdW5kV2lkZ2V0fVwiIGZvciB0eXBlICR7dHlwZX0uIFN1cHBvcnRlZDogJHtPYmplY3Qua2V5cyh3aWRnZXRzW3R5cGVdKS5qb2luKFwiLFwiKX1gKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIHdpZGdldCBcIiR7Zm91bmRXaWRnZXR9XCIgZm9yIHR5cGUgJHt0eXBlfX1gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0pTT05TY2hlbWE3fSBmcm9tIFwianNvbi1zY2hlbWFcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB0b0NvbnN0YW50ID0gKHNjaGVtYTogSlNPTlNjaGVtYTcpOiBhbnkgPT4ge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLmVudW0pICYmIHNjaGVtYS5lbnVtLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiBzY2hlbWEuZW51bVswXTtcclxuICAgIH0gZWxzZSBpZiAoc2NoZW1hLmNvbnN0KSB7XHJcbiAgICAgICAgcmV0dXJuIHNjaGVtYS5jb25zdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2NoZW1hIGNhbm5vdCBiZSBpbmZlcnJlZCBhcyBhIGNvbnN0YW50XCIpO1xyXG4gICAgfVxyXG59IiwiLy9AdHMtbm9jaGVja1xyXG5pbXBvcnQge0pTT05TY2hlbWE3fSBmcm9tIFwianNvbi1zY2hlbWFcIjtcclxuaW1wb3J0IHtndWVzc1R5cGUsIGlzT2JqZWN0LCByZXRyaWV2ZVNjaGVtYX0gZnJvbSBcIi4uL2luZGV4XCI7XHJcblxyXG5leHBvcnQgY29uc3QgQURESVRJT05BTF9QUk9QRVJUWV9GTEFHID0gXCJfX2FkZGl0aW9uYWxfcHJvcGVydHlcIjtcclxuXHJcbi8vYWRkIGFkZGl0aW9uYWwgZGF0YSBkZWZpbml0aW9ucyB0byBzY2hlbWFcclxuZXhwb3J0IGRlZmF1bHQgPFQgZXh0ZW5kcyBhbnk+KHNjaGVtYTogSlNPTlNjaGVtYTcsIHJvb3RTY2hlbWE6IEpTT05TY2hlbWE3LCBkYXRhOiBUKTogSlNPTlNjaGVtYTcgPT4ge1xyXG4gICAgLy8gQ2xvbmUgdGhlIHNjaGVtYSBzbyB3ZSBkb24ndCBydWluIHRoZSBjb25zdW1lcidzIG9yaWdpbmFsXHJcbiAgICBzY2hlbWEgPSB7Li4uc2NoZW1hfTtcclxuICAgIGlmIChzY2hlbWEucHJvcGVydGllcykge1xyXG4gICAgICAgIHNjaGVtYS5wcm9wZXJ0aWVzID0gey4uLnNjaGVtYS5wcm9wZXJ0aWVzfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYoc2NoZW1hLnR5cGUgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgc2NoZW1hLnByb3BlcnRpZXMgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IGlzT2JqZWN0KGRhdGEpID8gZGF0YSA6IHt9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICBpZiAoc2NoZW1hLnByb3BlcnRpZXNba2V5XSkge1xyXG4gICAgICAgICAgICAvLyBObyBuZWVkIHRvIHN0dWIsIG91ciBzY2hlbWEgYWxyZWFkeSBoYXMgdGhlIHByb3BlcnR5XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhZGRpdGlvbmFsUHJvcGVydGllcztcclxuICAgICAgICBpZiAoc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLiRyZWYpIHtcclxuICAgICAgICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXMgPSByZXRyaWV2ZVNjaGVtYSh7JHJlZjogc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLiRyZWZ9IGFzIEpTT05TY2hlbWE3LCByb290U2NoZW1hLCBkYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcy50eXBlKSB7XHJcbiAgICAgICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzID0gey4uLnNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllc307XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgZ3Vlc3NlZCA9IGd1ZXNzVHlwZShkYXRhW2tleV0pO1xyXG4gICAgICAgICAgICAvL2Rpc2FibGUgaW5mZXJlbmNlIHR5cGUgZnJvbSBudWxsYWJsZSB2YWx1ZS4gc2V0IGl0IHRvIHN0cmluZ1xyXG4gICAgICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHt0eXBlOiBndWVzc2VkICE9PSBcIm51bGxcIiA/IGd1ZXNzZWQgOiBcInN0cmluZ1wifTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoZSB0eXBlIG9mIG91ciBuZXcga2V5IHNob3VsZCBtYXRjaCB0aGUgYWRkaXRpb25hbFByb3BlcnRpZXMgdmFsdWU7XHJcbiAgICAgICAgc2NoZW1hLnByb3BlcnRpZXNba2V5XSA9IGFkZGl0aW9uYWxQcm9wZXJ0aWVzO1xyXG4gICAgICAgIC8vIFNldCBvdXIgYWRkaXRpb25hbCBwcm9wZXJ0eSBmbGFnIHNvIHdlIGtub3cgaXQgd2FzIGR5bmFtaWNhbGx5IGFkZGVkXHJcbiAgICAgICAgc2NoZW1hLnByb3BlcnRpZXNba2V5XVtBRERJVElPTkFMX1BST1BFUlRZX0ZMQUddID0gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBzY2hlbWE7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc0FkZGl0aW9uYWwgPSAoc2NoZW1hOiBKU09OU2NoZW1hNykgOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiBzY2hlbWE/LltBRERJVElPTkFMX1BST1BFUlRZX0ZMQUddICE9PSB1bmRlZmluZWQ7XHJcbn07IiwiaW1wb3J0IG1lcmdlQWxsT2YgZnJvbSBcImpzb24tc2NoZW1hLW1lcmdlLWFsbG9mXCI7XHJcbmltcG9ydCB7SlNPTlNjaGVtYTd9IGZyb20gXCJqc29uLXNjaGVtYVwiO1xyXG5pbXBvcnQge3JldHJpZXZlU2NoZW1hfSBmcm9tIFwiLi9cIjtcclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlQWxsT2ZNZXJnZSA9IDxUIGV4dGVuZHMgYW55PihzY2hlbWE6IEpTT05TY2hlbWE3LCBfcm9vdFNjaGVtYTogSlNPTlNjaGVtYTcsIF9kYXRhOiBUKTogSlNPTlNjaGVtYTcgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gbWVyZ2VBbGxPZih7XHJcbiAgICAgICAgICAgIC4uLnNjaGVtYSxcclxuICAgICAgICAgICAgYWxsT2Y6IHNjaGVtYS5hbGxPZixcclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zdCB7YWxsT2YsIC4uLnJlc29sdmVkU2NoZW1hV2l0aG91dEFsbE9mfSA9IHNjaGVtYTtcclxuICAgICAgICByZXR1cm4gcmVzb2x2ZWRTY2hlbWFXaXRob3V0QWxsT2Y7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlQWxsT2YgPSA8VCBleHRlbmRzIGFueT4oc2NoZW1hOiBKU09OU2NoZW1hNywgcm9vdFNjaGVtYTogSlNPTlNjaGVtYTcsIGRhdGE6IFQpOiBKU09OU2NoZW1hNyA9PiAge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zY2hlbWEsXHJcbiAgICAgICAgYWxsT2Y6IHNjaGVtYS5hbGxPZiEubWFwKGFsbE9mU3Vic2NoZW1hID0+IHJldHJpZXZlU2NoZW1hKGFsbE9mU3Vic2NoZW1hLCByb290U2NoZW1hLCBkYXRhKSksXHJcbiAgICB9O1xyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IEFqdiBmcm9tIFwiYWp2XCI7XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlQWp2SW5zdGFuY2UgPSAoKTogQWp2ID0+IHtcclxuICAgIHJldHVybiBuZXcgQWp2KHtcclxuICAgICAgICBhbGxFcnJvcnM6IHRydWUsXHJcbiAgICAgICAgbXVsdGlwbGVPZlByZWNpc2lvbjogOFxyXG4gICAgfSk7XHJcbn0iLCIvL0B0cy1ub2NoZWNrXHJcbmltcG9ydCB7SlNPTlNjaGVtYTd9IGZyb20gXCJqc29uLXNjaGVtYVwiO1xyXG5pbXBvcnQge3JldHJpZXZlU2NoZW1hfSBmcm9tIFwiLi9cIjtcclxuaW1wb3J0IHttZXJnZVNjaGVtYXN9IGZyb20gXCIuLi9pbmRleFwiO1xyXG5pbXBvcnQge2NyZWF0ZUFqdkluc3RhbmNlfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmNvbnN0IElEX1BSRUZJWCA9IFwiX19qZm9ybV9yb290U2NoZW1hXCI7XHJcblxyXG5sZXQgYWp2ID0gY3JlYXRlQWp2SW5zdGFuY2UoKVxyXG5cclxuY29uc3Qgd2l0aElkUmVmUHJlZml4ID0gKHNjaGVtYU5vZGU6IEpTT05TY2hlbWE3KSA9PiB7XHJcbiAgICBsZXQgb2JqOiBKU09OU2NoZW1hNyA9IHNjaGVtYU5vZGU7XHJcbiAgICBpZiAoc2NoZW1hTm9kZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XHJcbiAgICAgICAgb2JqID0gey4uLnNjaGVtYU5vZGV9O1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZTogYW55ID0gb2JqW2tleV07XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwiJHJlZlwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS5zdGFydHNXaXRoKFwiI1wiKSkge1xyXG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSBJRF9QUkVGSVggKyB2YWx1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9ialtrZXldID0gd2l0aElkUmVmUHJlZml4KHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWFOb2RlKSkge1xyXG4gICAgICAgIG9iaiA9IFsuLi5zY2hlbWFOb2RlXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBvYmpbaV0gPSB3aXRoSWRSZWZQcmVmaXgob2JqW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNWYWxpZCA9IChzY2hlbWE6IEpTT05TY2hlbWE3LCBkYXRhOiBhbnksIHJvb3RTY2hlbWE6IEpTT05TY2hlbWE3KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIGFkZCB0aGUgcm9vdFNjaGVtYSBST09UX1NDSEVNQV9QUkVGSVggYXMgaWQuXHJcbiAgICAgICAgLy8gdGhlbiByZXdyaXRlIHRoZSBzY2hlbWEgcmVmJ3MgdG8gcG9pbnQgdG8gdGhlIHJvb3RTY2hlbWFcclxuICAgICAgICAvLyB0aGlzIGFjY291bnRzIGZvciB0aGUgY2FzZSB3aGVyZSBzY2hlbWEgaGF2ZSByZWZlcmVuY2VzIHRvIG1vZGVsc1xyXG4gICAgICAgIC8vIHRoYXQgbGl2ZXMgaW4gdGhlIHJvb3RTY2hlbWEgYnV0IG5vdCBpbiB0aGUgc2NoZW1hIGluIHF1ZXN0aW9uLlxyXG4gICAgICAgIHJldHVybiBhanZcclxuICAgICAgICAgICAgLmFkZFNjaGVtYShyb290U2NoZW1hLCBJRF9QUkVGSVgpXHJcbiAgICAgICAgICAgIC52YWxpZGF0ZSh3aXRoSWRSZWZQcmVmaXgoc2NoZW1hKSwgZGF0YSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAvLyBtYWtlIHN1cmUgd2UgcmVtb3ZlIHRoZSByb290U2NoZW1hIGZyb20gdGhlIGdsb2JhbCBhanYgaW5zdGFuY2VcclxuICAgICAgICBhanYucmVtb3ZlU2NoZW1hKElEX1BSRUZJWCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IDxUIGV4dGVuZHMgYW55PihzY2hlbWE6IEpTT05TY2hlbWE3LCByb290U2NoZW1hOiBKU09OU2NoZW1hNywgZGF0YTogVCk6IEpTT05TY2hlbWE3ID0+IHtcclxuICAgIGxldCB7aWY6IGV4cHJlc3Npb24sIHRoZW4sIGVsc2U6IG90aGVyd2lzZSwgLi4ucmVzb2x2ZWRTY2hlbWFMZXNzQ29uZGl0aW9uYWx9ID0gc2NoZW1hO1xyXG5cclxuICAgIGNvbnN0IGNvbmRpdGlvbmFsU2NoZW1hID0gaXNWYWxpZChleHByZXNzaW9uIGFzIEpTT05TY2hlbWE3LCBkYXRhLCByb290U2NoZW1hKSA/IHRoZW4gOiBvdGhlcndpc2U7XHJcblxyXG4gICAgaWYgKGNvbmRpdGlvbmFsU2NoZW1hKSB7XHJcbiAgICAgICAgcmV0dXJuIHJldHJpZXZlU2NoZW1hKFxyXG4gICAgICAgICAgICBtZXJnZVNjaGVtYXMoe30sXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlZFNjaGVtYUxlc3NDb25kaXRpb25hbCxcclxuICAgICAgICAgICAgICAgIHJldHJpZXZlU2NoZW1hKGNvbmRpdGlvbmFsU2NoZW1hLCByb290U2NoZW1hLCBkYXRhKVxyXG4gICAgICAgICAgICApLCByb290U2NoZW1hLCBkYXRhXHJcbiAgICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHJldHJpZXZlU2NoZW1hKHJlc29sdmVkU2NoZW1hTGVzc0NvbmRpdGlvbmFsLCByb290U2NoZW1hLCBkYXRhKTtcclxuICAgIH1cclxufTsiLCJpbXBvcnQge0pTT05TY2hlbWE3fSBmcm9tIFwianNvbi1zY2hlbWFcIjtcclxuaW1wb3J0IHtyZXRyaWV2ZVNjaGVtYX0gZnJvbSBcIi4vaW5kZXhcIjtcclxuaW1wb3J0IHttZXJnZVNjaGVtYXMsIGlzT2JqZWN0LCBmaW5kU2NoZW1hRGVmaW5pdGlvbn0gZnJvbSBcIi4uL2luZGV4XCI7XHJcbmltcG9ydCB7aXNWYWxpZH0gZnJvbSBcIi4vaWZcIjtcclxuXHJcbmNvbnN0IHJlc29sdmVSZWZlcmVuY2UgPSA8VCBleHRlbmRzIGFueT4oc2NoZW1hOiBKU09OU2NoZW1hNywgcm9vdFNjaGVtYTogSlNPTlNjaGVtYTcsIGRhdGE6IFQpOiBKU09OU2NoZW1hNyA9PiAge1xyXG4gICAgY29uc3QgJHJlZlNjaGVtYSA9IGZpbmRTY2hlbWFEZWZpbml0aW9uKHNjaGVtYS4kcmVmIGFzIHN0cmluZywgcm9vdFNjaGVtYSk7XHJcbiAgICBjb25zdCB7JHJlZiwgLi4ubG9jYWxTY2hlbWF9ID0gc2NoZW1hO1xyXG4gICAgcmV0dXJuIHJldHJpZXZlU2NoZW1hKHsuLi4kcmVmU2NoZW1hLCAuLi5sb2NhbFNjaGVtYX0sIHJvb3RTY2hlbWEsIGRhdGEpO1xyXG59XHJcblxyXG5jb25zdCB3aXRoRXhhY3RseU9uZVN1YnNjaGVtYSA9IChzY2hlbWE6IEpTT05TY2hlbWE3LCByb290U2NoZW1hOiBKU09OU2NoZW1hNywgZGF0YTogYW55LCBkZXBlbmRlbmN5S2V5OiBzdHJpbmcsIG9uZU9mOiBKU09OU2NoZW1hN1tdKSA9PiB7XHJcbiAgICBjb25zdCB2YWxpZFN1YnNjaGVtYXMgPSBvbmVPZi5maWx0ZXIoc3Vic2NoZW1hID0+IHtcclxuICAgICAgICBpZiAoIXN1YnNjaGVtYS5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qge1tkZXBlbmRlbmN5S2V5XTogY29uZGl0aW9uUHJvcGVydHlTY2hlbWF9ID0gc3Vic2NoZW1hLnByb3BlcnRpZXM7XHJcbiAgICAgICAgaWYgKGNvbmRpdGlvblByb3BlcnR5U2NoZW1hKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmRpdGlvblNjaGVtYTogSlNPTlNjaGVtYTcgPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxyXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFtkZXBlbmRlbmN5S2V5XTogY29uZGl0aW9uUHJvcGVydHlTY2hlbWEsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gaXNWYWxpZChjb25kaXRpb25TY2hlbWEsIGRhdGEsIHJvb3RTY2hlbWEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIGlmICh2YWxpZFN1YnNjaGVtYXMubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFwiaWdub3Jpbmcgb25lT2YgaW4gZGVwZW5kZW5jaWVzIGJlY2F1c2UgdGhlcmUgaXNuJ3QgZXhhY3RseSBvbmUgc3Vic2NoZW1hIHRoYXQgaXMgdmFsaWRcIik7XHJcbiAgICAgICAgcmV0dXJuIHNjaGVtYTtcclxuICAgIH1cclxuICAgIGNvbnN0IHN1YnNjaGVtYSA9IHZhbGlkU3Vic2NoZW1hc1swXTtcclxuICAgIGNvbnN0IHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgW2RlcGVuZGVuY3lLZXldOiBjb25kaXRpb25Qcm9wZXJ0eVNjaGVtYSxcclxuICAgICAgICAuLi5kZXBlbmRlbnRTdWJzY2hlbWFcclxuICAgIH0gPSBzdWJzY2hlbWEucHJvcGVydGllcztcclxuICAgIGNvbnN0IGRlcGVuZGVudFNjaGVtYSA9IHsuLi5zdWJzY2hlbWEsIHByb3BlcnRpZXM6IGRlcGVuZGVudFN1YnNjaGVtYX07XHJcbiAgICByZXR1cm4gbWVyZ2VTY2hlbWFzKHt9LCBzY2hlbWEsIHJldHJpZXZlU2NoZW1hKGRlcGVuZGVudFNjaGVtYSwgcm9vdFNjaGVtYSwgZGF0YSkpO1xyXG59XHJcblxyXG5jb25zdCB3aXRoRGVwZW5kZW50U2NoZW1hID0gKHNjaGVtYTogSlNPTlNjaGVtYTcsIHJvb3RTY2hlbWE6IEpTT05TY2hlbWE3LCBkYXRhOiBhbnksIGRlcGVuZGVuY3lLZXk6IHN0cmluZywgZGVwZW5kZW5jeVZhbHVlOiBKU09OU2NoZW1hNykgPT4ge1xyXG4gICAgbGV0IHtvbmVPZiwgLi4uZGVwZW5kZW50U2NoZW1hfSA9IHJldHJpZXZlU2NoZW1hKGRlcGVuZGVuY3lWYWx1ZSwgcm9vdFNjaGVtYSwgZGF0YSk7XHJcbiAgICBzY2hlbWEgPSBtZXJnZVNjaGVtYXMoe30sIHNjaGVtYSwgZGVwZW5kZW50U2NoZW1hKTtcclxuICAgIC8vIFNpbmNlIGl0IGRvZXMgbm90IGNvbnRhaW4gb25lT2YsIHdlIHJldHVybiB0aGUgb3JpZ2luYWwgc2NoZW1hLlxyXG4gICAgaWYgKG9uZU9mID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gc2NoZW1hO1xyXG4gICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShvbmVPZikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQ6IGl0IGlzIHNvbWUgJHt0eXBlb2Ygb25lT2Z9IGluc3RlYWQgb2YgYW4gYXJyYXlgKTtcclxuICAgIH1cclxuICAgIC8vIFJlc29sdmUgJHJlZnMgaW5zaWRlIG9uZU9mLlxyXG4gICAgY29uc3QgcmVzb2x2ZWRPbmVPZiA9IChvbmVPZiBhcyBKU09OU2NoZW1hN1tdKS5tYXAoc3Vic2NoZW1hID0+IHN1YnNjaGVtYS4kcmVmID8gcmVzb2x2ZVJlZmVyZW5jZShzdWJzY2hlbWEsIHJvb3RTY2hlbWEsIGRhdGEpIDogc3Vic2NoZW1hKTtcclxuICAgIHJldHVybiB3aXRoRXhhY3RseU9uZVN1YnNjaGVtYShzY2hlbWEsIHJvb3RTY2hlbWEsIGRhdGEsIGRlcGVuZGVuY3lLZXksIHJlc29sdmVkT25lT2YpO1xyXG59XHJcblxyXG5jb25zdCBwcm9jZXNzRGVwZW5kZW5jaWVzID0gKGRlcGVuZGVuY2llczogeyBbazogc3RyaW5nXTogYW55IH0sIHJlc29sdmVkU2NoZW1hOiBKU09OU2NoZW1hNywgcm9vdFNjaGVtYTogSlNPTlNjaGVtYTcsIGRhdGE6IGFueSk6IEpTT05TY2hlbWE3ID0+IHtcclxuICAgIC8vIFByb2Nlc3MgZGVwZW5kZW5jaWVzIHVwZGF0aW5nIHRoZSBsb2NhbCBzY2hlbWEgcHJvcGVydGllcyBhcyBhcHByb3ByaWF0ZS5cclxuICAgIGZvciAoY29uc3QgZGVwZW5kZW5jeUtleSBpbiBkZXBlbmRlbmNpZXMpIHtcclxuICAgICAgICAvLyBTa2lwIHRoaXMgZGVwZW5kZW5jeSBpZiBpdHMgdHJpZ2dlciBwcm9wZXJ0eSBpcyBub3QgcHJlc2VudC5cclxuICAgICAgICBpZiAoZGF0YVtkZXBlbmRlbmN5S2V5XSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTa2lwIHRoaXMgZGVwZW5kZW5jeSBpZiBpdCBpcyBub3QgaW5jbHVkZWQgaW4gdGhlIHNjaGVtYSAoc3VjaCBhcyB3aGVuIGRlcGVuZGVuY3lLZXkgaXMgaXRzZWxmIGEgaGlkZGVuIGRlcGVuZGVuY3kuKVxyXG4gICAgICAgIGlmIChyZXNvbHZlZFNjaGVtYS5wcm9wZXJ0aWVzICYmICEoZGVwZW5kZW5jeUtleSBpbiByZXNvbHZlZFNjaGVtYS5wcm9wZXJ0aWVzKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICBbZGVwZW5kZW5jeUtleV06IGRlcGVuZGVuY3lWYWx1ZSxcclxuICAgICAgICAgICAgLi4ucmVtYWluaW5nRGVwZW5kZW5jaWVzXHJcbiAgICAgICAgfSA9IGRlcGVuZGVuY2llcztcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkZXBlbmRlbmN5VmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmVkU2NoZW1hID0gd2l0aERlcGVuZGVudFByb3BlcnRpZXMocmVzb2x2ZWRTY2hlbWEsIGRlcGVuZGVuY3lWYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChkZXBlbmRlbmN5VmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmVkU2NoZW1hID0gd2l0aERlcGVuZGVudFNjaGVtYShyZXNvbHZlZFNjaGVtYSwgcm9vdFNjaGVtYSwgZGF0YSwgZGVwZW5kZW5jeUtleSwgZGVwZW5kZW5jeVZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NEZXBlbmRlbmNpZXMocmVtYWluaW5nRGVwZW5kZW5jaWVzLCByZXNvbHZlZFNjaGVtYSwgcm9vdFNjaGVtYSwgZGF0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzb2x2ZWRTY2hlbWE7XHJcbn1cclxuXHJcbmNvbnN0IHdpdGhEZXBlbmRlbnRQcm9wZXJ0aWVzID0gKHNjaGVtYTogSlNPTlNjaGVtYTcsIGFkZGl0aW9uYWxseVJlcXVpcmVkOiBhbnlbXSkgPT4ge1xyXG4gICAgaWYgKCFhZGRpdGlvbmFsbHlSZXF1aXJlZCkge1xyXG4gICAgICAgIHJldHVybiBzY2hlbWE7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXF1aXJlZCA9IEFycmF5LmlzQXJyYXkoc2NoZW1hLnJlcXVpcmVkKVxyXG4gICAgICAgID8gQXJyYXkuZnJvbShuZXcgU2V0KFsuLi5zY2hlbWEucmVxdWlyZWQsIC4uLmFkZGl0aW9uYWxseVJlcXVpcmVkXSkpXHJcbiAgICAgICAgOiBhZGRpdGlvbmFsbHlSZXF1aXJlZDtcclxuICAgIHJldHVybiB7Li4uc2NoZW1hLCByZXF1aXJlZDogcmVxdWlyZWR9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWF0Y2hpbmdPcHRpb248VCA9IGFueT4oZGF0YTogVCwgb3B0aW9uczogYW55W10sIHJvb3RTY2hlbWE6IEpTT05TY2hlbWE3KTogbnVtYmVyIHtcclxuICAgIC8vIEZvciBwZXJmb3JtYW5jZSwgc2tpcCB2YWxpZGF0aW5nIHN1YnNjaGVtYXMgaWYgZm9ybURhdGEgaXMgdW5kZWZpbmVkLiBXZSBqdXN0XHJcbiAgICAvLyB3YW50IHRvIGdldCB0aGUgZmlyc3Qgb3B0aW9uIGluIHRoYXQgY2FzZS5cclxuICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IG9wdGlvbnNbaV07XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBzY2hlbWEgZGVzY3JpYmVzIGFuIG9iamVjdCB0aGVuIHdlIG5lZWQgdG8gYWRkIHNsaWdodGx5IG1vcmVcclxuICAgICAgICAvLyBzdHJpY3QgbWF0Y2hpbmcgdG8gdGhlIHNjaGVtYSwgYmVjYXVzZSB1bmxlc3MgdGhlIHNjaGVtYSB1c2VzIHRoZVxyXG4gICAgICAgIC8vIFwicmVxdWlyZXNcIiBrZXl3b3JkLCBhbiBvYmplY3Qgd2lsbCBtYXRjaCB0aGUgc2NoZW1hIGFzIGxvbmcgYXMgaXRcclxuICAgICAgICAvLyBkb2Vzbid0IGhhdmUgbWF0Y2hpbmcga2V5cyB3aXRoIGEgY29uZmxpY3RpbmcgdHlwZS4gVG8gZG8gdGhpcyB3ZSB1c2UgYW5cclxuICAgICAgICAvLyBcImFueU9mXCIgd2l0aCBhbiBhcnJheSBvZiByZXF1aXJlcy4gVGhpcyBhdWdtZW50YXRpb24gZXhwcmVzc2VzIHRoYXQgdGhlXHJcbiAgICAgICAgLy8gc2NoZW1hIHNob3VsZCBtYXRjaCBpZiBhbnkgb2YgdGhlIGtleXMgaW4gdGhlIHNjaGVtYSBhcmUgcHJlc2VudCBvbiB0aGVcclxuICAgICAgICAvLyBvYmplY3QgYW5kIHBhc3MgdmFsaWRhdGlvbi5cclxuICAgICAgICBpZiAob3B0aW9uLnByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuIFwiYW55T2ZcIiBzY2hlbWEgdGhhdCByZXF1aXJlcyBhdCBsZWFzdCBvbmUgb2YgdGhlIGtleXMgaW4gdGhlXHJcbiAgICAgICAgICAgIC8vIFwicHJvcGVydGllc1wiIG9iamVjdFxyXG4gICAgICAgICAgICBjb25zdCByZXF1aXJlc0FueU9mID0ge1xyXG4gICAgICAgICAgICAgICAgYW55T2Y6IE9iamVjdC5rZXlzKG9wdGlvbi5wcm9wZXJ0aWVzKS5tYXAoa2V5ID0+ICh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFtrZXldLFxyXG4gICAgICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IGF1Z21lbnRlZFNjaGVtYTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBcImFueU9mXCIga2V5d29yZCBhbHJlYWR5IGV4aXN0cywgd3JhcCB0aGUgYXVnbWVudGF0aW9uIGluIGFuIFwiYWxsT2ZcIlxyXG4gICAgICAgICAgICBpZiAob3B0aW9uLmFueU9mKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBzaGFsbG93IGNsb25lIG9mIHRoZSBvcHRpb25cclxuICAgICAgICAgICAgICAgIGNvbnN0IHsuLi5zaGFsbG93Q2xvbmV9ID0gb3B0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghc2hhbGxvd0Nsb25lLmFsbE9mKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhbGxvd0Nsb25lLmFsbE9mID0gW107XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIFwiYWxsT2ZcIiBhbHJlYWR5IGV4aXN0cywgc2hhbGxvdyBjbG9uZSB0aGUgYXJyYXlcclxuICAgICAgICAgICAgICAgICAgICBzaGFsbG93Q2xvbmUuYWxsT2YgPSBzaGFsbG93Q2xvbmUuYWxsT2Yuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzaGFsbG93Q2xvbmUuYWxsT2YucHVzaChyZXF1aXJlc0FueU9mKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhdWdtZW50ZWRTY2hlbWEgPSBzaGFsbG93Q2xvbmU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhdWdtZW50ZWRTY2hlbWEgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb24sIHJlcXVpcmVzQW55T2YpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIFwicmVxdWlyZWRcIiBmaWVsZCBhcyBpdCdzIGxpa2VseSB0aGF0IG5vdCBhbGwgZmllbGRzIGhhdmVcclxuICAgICAgICAgICAgLy8gYmVlbiBmaWxsZWQgaW4geWV0LCB3aGljaCB3aWxsIG1lYW4gdGhhdCB0aGUgc2NoZW1hIGlzIG5vdCB2YWxpZFxyXG4gICAgICAgICAgICBkZWxldGUgYXVnbWVudGVkU2NoZW1hLnJlcXVpcmVkO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzVmFsaWQoYXVnbWVudGVkU2NoZW1hLCBkYXRhLCByb290U2NoZW1hKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGlzVmFsaWQob3B0aW9uLCBkYXRhLCByb290U2NoZW1hKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMDtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IF9yZXNvbHZlRGVwZW5kZW5jaWVzID0gPFQgZXh0ZW5kcyBhbnk+KHNjaGVtYTogSlNPTlNjaGVtYTcsIHJvb3RTY2hlbWE6IEpTT05TY2hlbWE3LCBkYXRhOiBUKTogSlNPTlNjaGVtYTcgPT4ge1xyXG4gICAgLy8gRHJvcCB0aGUgZGVwZW5kZW5jaWVzIGZyb20gdGhlIHNvdXJjZSBzY2hlbWEuXHJcbiAgICBsZXQge2RlcGVuZGVuY2llcyA9IHt9LCAuLi5yZXNvbHZlZFNjaGVtYX0gPSBzY2hlbWE7XHJcbiAgICBpZiAocmVzb2x2ZWRTY2hlbWEub25lT2YgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJlc29sdmVkU2NoZW1hID1cclxuICAgICAgICAgICAgcmVzb2x2ZWRTY2hlbWEub25lT2ZbZ2V0TWF0Y2hpbmdPcHRpb24oZGF0YSwgcmVzb2x2ZWRTY2hlbWEub25lT2YsIHJvb3RTY2hlbWEpXSBhcyBKU09OU2NoZW1hNztcclxuICAgIH0gZWxzZSBpZiAocmVzb2x2ZWRTY2hlbWEuYW55T2YgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJlc29sdmVkU2NoZW1hID1cclxuICAgICAgICAgICAgcmVzb2x2ZWRTY2hlbWEuYW55T2ZbZ2V0TWF0Y2hpbmdPcHRpb24oZGF0YSwgcmVzb2x2ZWRTY2hlbWEuYW55T2YsIHJvb3RTY2hlbWEpXSBhcyBKU09OU2NoZW1hNztcclxuICAgIH1cclxuICAgIHJldHVybiBwcm9jZXNzRGVwZW5kZW5jaWVzKGRlcGVuZGVuY2llcywgcmVzb2x2ZWRTY2hlbWEsIHJvb3RTY2hlbWEsIGRhdGEpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCA8VCBleHRlbmRzIGFueT4oc2NoZW1hOiBKU09OU2NoZW1hNywgcm9vdFNjaGVtYTogSlNPTlNjaGVtYTcsIGRhdGE6IFQpOiBKU09OU2NoZW1hNyA9PiB7XHJcbiAgICBjb25zdCByZXNvbHZlZFNjaGVtYSA9IF9yZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYSwgcm9vdFNjaGVtYSwgZGF0YSk7XHJcbiAgICByZXR1cm4gcmV0cmlldmVTY2hlbWEocmVzb2x2ZWRTY2hlbWEsIHJvb3RTY2hlbWEsIGRhdGEpO1xyXG59IiwiaW1wb3J0IHtpc09iamVjdH0gZnJvbSBcIi4uL2luZGV4XCI7XHJcbmltcG9ydCB7SlNPTlNjaGVtYTd9IGZyb20gXCJqc29uLXNjaGVtYVwiO1xyXG5pbXBvcnQge3JldHJpZXZlU2NoZW1hfSBmcm9tIFwiLi9pbmRleFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCA8VCBleHRlbmRzIGFueT4oc2NoZW1hOiBKU09OU2NoZW1hNywgcm9vdFNjaGVtYTogSlNPTlNjaGVtYTcsIGRhdGE6IFQpOiBKU09OU2NoZW1hNyA9PiB7XHJcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0ge307XHJcblxyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBPYmplY3QuZW50cmllcyhzY2hlbWEucHJvcGVydGllcykuZm9yRWFjaCgoW3Byb3BOYW1lLCBwcm9wU2NoZW1hXSkgPT4ge1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIGNvbnN0IHJhd1Byb3BEYXRhID0gZGF0YSAmJiBkYXRhW3Byb3BOYW1lXTtcclxuICAgICAgICBjb25zdCBwcm9wRGF0YSA9IGlzT2JqZWN0KHJhd1Byb3BEYXRhKSA/IHJhd1Byb3BEYXRhIDoge307XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRQcm9wU2NoZW1hID0gcmV0cmlldmVTY2hlbWEocHJvcFNjaGVtYSwgcm9vdFNjaGVtYSwgcHJvcERhdGEpO1xyXG5cclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBwcm9wZXJ0aWVzW3Byb3BOYW1lXSA9IHJlc29sdmVkUHJvcFNjaGVtYTtcclxuXHJcbiAgICAgICAgaWYgKHByb3BTY2hlbWEgIT09IHJlc29sdmVkUHJvcFNjaGVtYSAmJiBzY2hlbWEucHJvcGVydGllcyAhPT0gcHJvcGVydGllcykge1xyXG4gICAgICAgICAgICBzY2hlbWEgPSB7Li4uc2NoZW1hLCBwcm9wZXJ0aWVzfTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzY2hlbWE7XHJcbn0iLCJpbXBvcnQge2RlZmF1bHQgYXMgcmVzb2x2ZUFkZGl0aW9uYWx9IGZyb20gXCIuL2FkZGl0aW9uYWxQcm9wZXJ0aWVzXCJcclxuaW1wb3J0IHtyZXNvbHZlQWxsT2ZNZXJnZSwgcmVzb2x2ZUFsbE9mfSBmcm9tIFwiLi9hbGxPZlwiXHJcbmltcG9ydCB7ZGVmYXVsdCBhcyByZXNvbHZlRGVwZW5kZW5jaWVzfSBmcm9tIFwiLi9kZXBlbmRlbmNpZXNcIlxyXG5pbXBvcnQge2RlZmF1bHQgYXMgcmVzb2x2ZUNvbmRpdGlvbn0gZnJvbSBcIi4vaWZcIlxyXG5pbXBvcnQge2RlZmF1bHQgYXMgcmVzb2x2ZVByb3BlcnRpZXN9IGZyb20gXCIuL3Byb3BlcnRpZXNcIlxyXG5pbXBvcnQge0pTT05TY2hlbWE3LCBKU09OU2NoZW1hN0RlZmluaXRpb259IGZyb20gXCJqc29uLXNjaGVtYVwiO1xyXG5pbXBvcnQge2lzT2JqZWN0fSBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7cmVzb2x2ZVJlZmVyZW5jZX0gZnJvbSBcIi4uL2luZGV4XCI7XHJcblxyXG5jb25zdCBoYW5kbGVyczogKHsgW2s6IHN0cmluZ106ICgoc2NoZW1hOiBKU09OU2NoZW1hNywgcm9vdFNjaGVtYTogSlNPTlNjaGVtYTcsIGRhdGE/OiBhbnkpID0+IEpTT05TY2hlbWE3KSB9KSA9IHtcclxuICAgICRyZWY6IHJlc29sdmVSZWZlcmVuY2UsXHJcbiAgICBkZXBlbmRlbmNpZXM6IHJlc29sdmVEZXBlbmRlbmNpZXMsXHJcbiAgICBhbGxPZl9iZWZvcmU6IHJlc29sdmVBbGxPZixcclxuICAgIGlmOiByZXNvbHZlQ29uZGl0aW9uLFxyXG4gICAgcHJvcGVydGllczogcmVzb2x2ZVByb3BlcnRpZXMsXHJcbiAgICBhbGxPZl9hZnRlcjogcmVzb2x2ZUFsbE9mTWVyZ2UsXHJcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczogcmVzb2x2ZUFkZGl0aW9uYWxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJldHJpZXZlU2NoZW1hID0gKHNjaGVtYTogSlNPTlNjaGVtYTdEZWZpbml0aW9uLCByb290U2NoZW1hOiBKU09OU2NoZW1hNywgZGF0YT86IGFueSk6IEpTT05TY2hlbWE3ID0+IHtcclxuICAgIGlmICghaXNPYmplY3Qoc2NoZW1hKSkge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzb2x2ZWRTY2hlbWEgPSBzY2hlbWE7XHJcbiAgICBPYmplY3QuZW50cmllcyhoYW5kbGVycykuZm9yRWFjaCgoW2tleSwgaGFuZGxlcl0pID0+IHtcclxuICAgICAgICBjb25zdCBmaWVsZCA9IGtleS5zcGxpdChcIl9cIilbMF07XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgaWYgKHJlc29sdmVkU2NoZW1hW2ZpZWxkXSkge1xyXG4gICAgICAgICAgICByZXNvbHZlZFNjaGVtYSA9IGhhbmRsZXIocmVzb2x2ZWRTY2hlbWEsIHJvb3RTY2hlbWEsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIHJlc29sdmVkU2NoZW1hO1xyXG59IiwiaW1wb3J0IHtKU09OU2NoZW1hN30gZnJvbSBcImpzb24tc2NoZW1hXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNDb25zdGFudChzY2hlbWE6IEpTT05TY2hlbWE3KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKEFycmF5LmlzQXJyYXkoc2NoZW1hLmVudW0pICYmIHNjaGVtYS5lbnVtLmxlbmd0aCA9PT0gMSkgfHwgKHNjaGVtYS5jb25zdCAhPT0gdW5kZWZpbmVkKTtcclxufSIsImltcG9ydCB7aXNDb25zdGFudCwgcmV0cmlldmVTY2hlbWF9IGZyb20gJy4vaW5kZXgnO1xyXG5pbXBvcnQge0pTT05TY2hlbWE3fSBmcm9tIFwianNvbi1zY2hlbWFcIjtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgaXNTZWxlY3QgPSAoX3NjaGVtYTogSlNPTlNjaGVtYTcpOiBib29sZWFuID0+IHtcclxuICAgIGNvbnN0IHNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKF9zY2hlbWEsIF9zY2hlbWEpO1xyXG4gICAgY29uc3QgYWx0U2NoZW1hcyA9IHNjaGVtYS5vbmVPZiB8fCBzY2hlbWEuYW55T2Y7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEuZW51bSkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhbHRTY2hlbWFzKSkge1xyXG4gICAgICAgIHJldHVybiBhbHRTY2hlbWFzLmV2ZXJ5KGFsdFNjaGVtYXMgPT4gaXNDb25zdGFudChhbHRTY2hlbWFzIGFzIEpTT05TY2hlbWE3KSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0iLCJpbXBvcnQge0pTT05TY2hlbWE3fSBmcm9tIFwianNvbi1zY2hlbWFcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBzY2hlbWFSZXF1aXJlc1RydWVWYWx1ZSA9IChzY2hlbWE6IEpTT05TY2hlbWE3KTogYm9vbGVhbiA9PiB7XHJcbiAgICAvLyBDaGVjayBpZiBjb25zdCBpcyBhIHRydXRoeSB2YWx1ZVxyXG4gICAgaWYgKHNjaGVtYS5jb25zdCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIGlmIGFuIGVudW0gaGFzIGEgc2luZ2xlIHZhbHVlIG9mIHRydWVcclxuICAgIGlmIChzY2hlbWEuZW51bSAmJiBzY2hlbWEuZW51bS5sZW5ndGggPT09IDEgJiYgc2NoZW1hLmVudW1bMF0gPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBhbnlPZiBoYXMgYSBzaW5nbGUgdmFsdWUsIGV2YWx1YXRlIHRoZSBzdWJzY2hlbWFcclxuICAgIGlmIChzY2hlbWEuYW55T2YgJiYgc2NoZW1hLmFueU9mLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiBzY2hlbWFSZXF1aXJlc1RydWVWYWx1ZShzY2hlbWEuYW55T2ZbMF0gYXMgSlNPTlNjaGVtYTcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIG9uZU9mIGhhcyBhIHNpbmdsZSB2YWx1ZSwgZXZhbHVhdGUgdGhlIHN1YnNjaGVtYVxyXG4gICAgaWYgKHNjaGVtYS5vbmVPZiAmJiBzY2hlbWEub25lT2YubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIHNjaGVtYVJlcXVpcmVzVHJ1ZVZhbHVlKHNjaGVtYS5vbmVPZlswXSBhcyBKU09OU2NoZW1hNyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRXZhbHVhdGUgZWFjaCBzdWJzY2hlbWEgaW4gYWxsT2YsIHRvIHNlZSBpZiBvbmUgb2YgdGhlbSByZXF1aXJlcyBhIHRydWVcclxuICAgIC8vIHZhbHVlXHJcbiAgICBpZiAoc2NoZW1hLmFsbE9mKSB7XHJcbiAgICAgICAgcmV0dXJuIChzY2hlbWEuYWxsT2YgYXMgSlNPTlNjaGVtYTdbXSkuc29tZShzY2hlbWFSZXF1aXJlc1RydWVWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyTGF5b3V0ID0gKGxheW91dDogYW55W10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sOiAoKG5hbWU6IHN0cmluZywgcm93UHJvcHM6IGFueSkgPT4gUmVhY3QuUmVhY3RFbGVtZW50IHwgbnVsbCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiAoKGNoaWxkcmVuOiAoUmVhY3QuUmVhY3RFbGVtZW50IHwgbnVsbClbXSwgaW5kZXg6IG51bWJlcikgPT4gUmVhY3QuUmVhY3RFbGVtZW50KSkgPT4ge1xyXG4gICAgcmV0dXJuIGxheW91dC5tYXAoKHJvd1Byb3BzOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IE9iamVjdC5rZXlzKHJvd1Byb3BzKS5tYXAoKG5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gY29sKG5hbWUsIHJvd1Byb3BzW25hbWVdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcm93KGNoaWxkcmVuLCBpbmRleCk7XHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IHtKU09OU2NoZW1hN30gZnJvbSBcImpzb24tc2NoZW1hXCI7XHJcblxyXG5leHBvcnQgY29uc3QgY2FuRXhwYW5kID0gKHNjaGVtYTogSlNPTlNjaGVtYTcsIGRhdGE6IGFueSwgaGFuZGxlcj86IEZ1bmN0aW9uKSA9PiB7XHJcbiAgICBpZiAoIWhhbmRsZXIpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoIXNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcykge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2NoZW1hLm1heFByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPCBzY2hlbWEubWF4UHJvcGVydGllcztcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59IiwiaW1wb3J0IHt0b0NvbnN0YW50fSBmcm9tIFwiLi9pbmRleFwiO1xyXG5pbXBvcnQge0pTT05TY2hlbWE3fSBmcm9tIFwianNvbi1zY2hlbWFcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFNlbGVjdE9wdGlvbjxUPiA9IHtcclxuICAgIHNjaGVtYT86IEpTT05TY2hlbWE3LFxyXG4gICAgbGFiZWw6IHN0cmluZyxcclxuICAgIHZhbHVlOiBULFxyXG59XHJcblxyXG5pbnRlcmZhY2UgQ29uZmlnV2l0aEVudW1zIHtcclxuICAgIFtrOiBzdHJpbmddOiBhbnksXHJcbiAgICBlbnVtTmFtZXM/OiBzdHJpbmdbXVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0T3B0aW9ucyA9IDxUIGV4dGVuZHMgYW55PihzY2hlbWE6IEpTT05TY2hlbWE3LCBjb25maWdTY2hlbWE/OiBDb25maWdXaXRoRW51bXMpOiBTZWxlY3RPcHRpb248VD5bXSB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgICBpZiAoc2NoZW1hLmVudW0pIHtcclxuICAgICAgICByZXR1cm4gc2NoZW1hLmVudW0ubWFwKCh2YWx1ZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IChjb25maWdTY2hlbWE/LmVudW1OYW1lcyAmJiBjb25maWdTY2hlbWE/LmVudW1OYW1lc1tpXSkgfHwgU3RyaW5nKHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtsYWJlbCwgdmFsdWV9IGFzIFNlbGVjdE9wdGlvbjxUPjtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgYWx0U2NoZW1hcyA9IHNjaGVtYS5vbmVPZiB8fCBzY2hlbWEuYW55T2Y7XHJcbiAgICAgICAgcmV0dXJuIGFsdFNjaGVtYXM/Lm1hcChzY2hlbWEgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRvQ29uc3RhbnQoc2NoZW1hIGFzIEpTT05TY2hlbWE3KTtcclxuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSAoc2NoZW1hIGFzIEpTT05TY2hlbWE3KS50aXRsZSB8fCBTdHJpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc2NoZW1hLFxyXG4gICAgICAgICAgICAgICAgbGFiZWwsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgfSBhcyBTZWxlY3RPcHRpb248VD47XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuZWRpdG9yLWhlYWRlciB7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjMURBNTdBO1xcclxcbn1cXHJcXG5cXHJcXG4uamVkaXRvciAuY29kaWNvbi1mb2xkaW5nLWNvbGxhcHNlZDpiZWZvcmUge1xcclxcbiAgICBjb250ZW50OiAnKyc7XFxyXFxufVxcclxcblxcclxcbi5qZWRpdG9yIC5jb2RpY29uLWZvbGRpbmctZXhwYW5kZWQ6YmVmb3JlIHtcXHJcXG4gICAgY29udGVudDogJy0nO1xcclxcbn1cXHJcXG5cXHJcXG4uamVkaXRvci1wYW5lbCB7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogI2RkZDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXHJcXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiAwIDFweCAxcHggcmdiKDAgMCAwIC8gNSUpO1xcclxcbiAgICBib3gtc2hhZG93OiAwIDFweCAxcHggcmdiKDAgMCAwIC8gNSUpO1xcclxcbn1cXHJcXG5cXHJcXG4uZWRpdG9yLWhpZGUtYnV0dG9uLmFudC1idG4ge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiAtMjVweDtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xcclxcbiAgICBtYXJnaW4tdG9wOiA4cHg7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5oZWFkZXIgLm1lbnUtaGVhZGVyLWVsZW1lbnQubWVudS1jb2xsYXBzZS1idXR0b24ge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5hbnQtbGF5b3V0IC5hbnQtbGF5b3V0LXNpZGVyLXRyaWdnZXIge1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGVcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXhcXHJcXG59XFxyXFxuXFxyXFxuLnNldHRpbmdzLW1lbnUge1xcclxcbiAgICBmbGV4LWdyb3c6IDAuMjU7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxyXFxufVxcclxcblxcclxcbi5tZW51IHtcXHJcXG4gICAgZmxleC1ncm93OiAxO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyIC5hbnQtbWVudS1kYXJrLmFudC1tZW51LWhvcml6b250YWwgPiAgIC5hbnQtbWVudS1pdGVtOmhvdmVyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRkYzE5MztcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtY29sbGFwc2UtYnV0dG9uIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuaGVhZGVyIC5tZW51LWhlYWRlci1lbGVtZW50IHtcXHJcXG4gICAgZm9udC1zaXplOiAzMHB4O1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnVzZXItZm9ybS1jb250cm9sIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMzRweDtcXHJcXG4gICAgcGFkZGluZzogNnB4IDEycHg7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXHJcXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiKDAgMCAwIC8gOCUpO1xcclxcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiKDAgMCAwIC8gOCUpO1xcclxcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGJvcmRlci1jb2xvciBlYXNlLWluLW91dCAuMTVzLC13ZWJraXQtYm94LXNoYWRvdyBlYXNlLWluLW91dCAuMTVzO1xcclxcbiAgICAtby10cmFuc2l0aW9uOiBib3JkZXItY29sb3IgZWFzZS1pbi1vdXQgLjE1cyxib3gtc2hhZG93IGVhc2UtaW4tb3V0IC4xNXM7XFxyXFxuICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciBlYXNlLWluLW91dCAuMTVzLGJveC1zaGFkb3cgZWFzZS1pbi1vdXQgLjE1cztcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLnVzZXItZm9ybS1jb250cm9sIHNlbGVjdCB7XFxyXFxuICAgIHdpZHRoOiAxMDAlXFxyXFxufVxcclxcblxcclxcblxcclxcbi51c2VyLWZvcm0tY29udHJvbDpmb2N1cyB7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogIzY2YWZlOTtcXHJcXG4gICAgb3V0bGluZTogMDtcXHJcXG4gICAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiKDAgMCAwIC8gOCUpLCAwIDAgOHB4IHJnYigxMDIgMTc1IDIzMyAvIDYwJSk7XFxyXFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDFweCByZ2IoMCAwIDAgLyA4JSksIDAgMCA4cHggcmdiKDEwMiAxNzUgMjMzIC8gNjAlKTtcXHJcXG59XFxyXFxuXFxyXFxuLnVzZXItYm9vbGVhbi1sYXlvdXQge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udXNlci1ib29sZWFuLWxheW91dCBsYWJlbCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgTGF5b3V0IGZyb20gXCIuL2xheW91dC9MYXlvdXRcIjtcclxuaW1wb3J0IHtCcm93c2VyUm91dGVyIGFzIFJvdXRlcn0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuXHJcbmV4cG9ydCBjb25zdCBBcHAgPSAocHJvcHMpID0+IHtcclxuICAgIHJldHVybiA8PlxyXG4gICAgICAgIDxSb3V0ZXIgYmFzZW5hbWU9XCIvamZvcm1cIj5cclxuICAgICAgICAgICAgPExheW91dC8+XHJcbiAgICAgICAgPC9Sb3V0ZXI+XHJcbiAgICA8Lz5cclxufSIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0lGcmFtZX0gZnJvbSBcIi4uL2NvbW1vbi9pZnJhbWUvSUZyYW1lXCI7XHJcbmltcG9ydCB7Rm9ybX0gZnJvbSBcIi4uL2NvbW1vbi9Gb3JtXCI7XHJcbmltcG9ydCB7dXNlU3RvcmVTdGF0ZX0gZnJvbSBcImVhc3ktcGVhc3lcIjtcclxuaW1wb3J0IHt3aXRoRXJyb3JCb3VuZGFyeSwgdXNlRXJyb3JCb3VuZGFyeX0gZnJvbSBcIi4vZXJyb3IvRXJyb3JCb3VuZGFyeVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IERlbW9Gb3JtID0gd2l0aEVycm9yQm91bmRhcnkoKHtoZWlnaHQsIC4uLnByb3BzfSkgPT4ge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRTdHlsZXMgPSB1c2VTdG9yZVN0YXRlKHN0YXRlID0+IHN0YXRlLnRoZW1lLnNlbGVjdGVkU3R5bGVzKVxyXG4gICAgY29uc3QgW2Vycm9yLCByZXNldEVycm9yXSA9IHVzZUVycm9yQm91bmRhcnkoKTtcclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzZXRFcnJvcigpLCAxMDAwKVxyXG4gICAgICAgIHJldHVybiBlcnJvci50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIDxJRnJhbWUgaGVpZ2h0PXtoZWlnaHR9PlxyXG4gICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPXtzZWxlY3RlZFN0eWxlc30vPlxyXG4gICAgICAgIDxGb3JtIHsuLi5wcm9wc30vPlxyXG4gICAgPC9JRnJhbWU+XHJcbn0pIiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBKRm9ybSBmcm9tIFwiQGpmb3JtL2NvcmVcIlxyXG5pbXBvcnQge3VzZVN0b3JlU3RhdGV9IGZyb20gXCJlYXN5LXBlYXN5XCI7XHJcblxyXG5leHBvcnQgY29uc3QgRm9ybSA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgZGVmYXVsdHMgPSB1c2VTdG9yZVN0YXRlKHN0YXRlID0+IHN0YXRlLnRoZW1lLnNlbGVjdGVkRGVmYXVsdHMpO1xyXG4gICAgcmV0dXJuIDxKRm9ybSAgZGVmYXVsdHM9e2RlZmF1bHRzfSB7Li4ucHJvcHN9Lz5cclxufSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0VkaXRvci5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vRWRpdG9yLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9FZGl0b3IuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QsIHt1c2VTdGF0ZX0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtEZW1vRm9ybX0gZnJvbSBcImNvbXBvbmVudHMvY29tbW9uL0RlbW9Gb3JtXCI7XHJcbmltcG9ydCB7QnV0dG9uLCBDb2wsIFJvdywgVGFic30gZnJvbSBcImFudGRcIjtcclxuaW1wb3J0IFwiLi9FZGl0b3IuY3NzXCJcclxuaW1wb3J0IE1vbmFjb0VkaXRvciBmcm9tIFwicmVhY3QtbW9uYWNvLWVkaXRvclwiO1xyXG5pbXBvcnQge0pzRWRpdG9yfSBmcm9tIFwiLi9Kc0VkaXRvclwiO1xyXG5pbXBvcnQge0xlZnRPdXRsaW5lZCwgUmlnaHRPdXRsaW5lZH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xyXG5cclxuY29uc3Qge1RhYlBhbmV9ID0gVGFicztcclxuXHJcbmNvbnN0IG1vbmFjb0VkaXRvck9wdGlvbnMgPSB7XHJcbiAgICBtaW5pbWFwOiB7XHJcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAgYXV0b21hdGljTGF5b3V0OiB0cnVlLFxyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlRWRpdG9yID0gKHtlZGl0b3IsIHZhbHVlLCBvbkNoYW5nZSwgb3B0aW9ucywgaGVpZ2h0fSkgPT4ge1xyXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiamVkaXRvci1wYW5lbFwiPlxyXG4gICAgICAgIDxNb25hY29FZGl0b3IgY2xhc3NOYW1lPVwiamVkaXRvclwiIGxhbmd1YWdlPVwianNvblwiIHZhbHVlPXtKU09OLnN0cmluZ2lmeSh2YWx1ZSwgbnVsbCwgMil9IHRoZW1lPVwidnMtbGlnaHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3ggPT4gb25DaGFuZ2UoSlNPTi5wYXJzZSh4KSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9e2hlaWdodCB8fCA0MDB9XHJcbiAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXt7Li4ubW9uYWNvRWRpdG9yT3B0aW9ucywgLi4ub3B0aW9uc319XHJcbiAgICAgICAgICAgICAgICAgICAgICB7Li4uZWRpdG9yfVxyXG4gICAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEVkaXRvciA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3Qge2Zvcm1Qcm9wcywgY29kZSwgc2hvdyA9IHtzY2hlbWE6IHRydWUsIGRhdGE6IHRydWUsIGNvbmZpZ1NjaGVtYTogdHJ1ZX0sIHVzZVRhYnMgPSB0cnVlLCBoZWlnaHR9ID0gcHJvcHM7XHJcbiAgICBjb25zdCBbc2NoZW1hLCBjaGFuZ2VTY2hlbWFdID0gdXNlU3RhdGUocHJvcHMuc2NoZW1hKVxyXG4gICAgY29uc3QgW2NvbmZpZ1NjaGVtYSwgY2hhbmdlQ29uZmlnU2NoZW1hXSA9IHVzZVN0YXRlKHByb3BzLmNvbmZpZ1NjaGVtYSlcclxuICAgIGNvbnN0IFtkYXRhLCBjaGFuZ2VEYXRhXSA9IHVzZVN0YXRlKHByb3BzLmRhdGEpXHJcbiAgICBjb25zdCBbc2hvd0VkaXRvciwgc2V0U2hvd0VkaXRvcl0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgICBjb25zdCBvbkNoYW5nZSA9IGRhdGEgPT4ge1xyXG4gICAgICAgIGlmIChwcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICBwcm9wcy5vbkNoYW5nZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjaGFuZ2VEYXRhKGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZWRpdG9ycyA9IHtcclxuICAgICAgICBzY2hlbWE6IHNob3cuc2NoZW1hICYmIHNjaGVtYSAmJiBjcmVhdGVFZGl0b3Ioe2hlaWdodCwgdmFsdWU6IHNjaGVtYSwgb25DaGFuZ2U6IGNoYW5nZVNjaGVtYX0pLFxyXG4gICAgICAgIGNvbmZpZ1NjaGVtYTogc2hvdy5jb25maWdTY2hlbWEgJiYgc2NoZW1hICYmIGNyZWF0ZUVkaXRvcih7XHJcbiAgICAgICAgICAgIGhlaWdodCxcclxuICAgICAgICAgICAgdmFsdWU6IGNvbmZpZ1NjaGVtYSxcclxuICAgICAgICAgICAgb25DaGFuZ2U6IGNoYW5nZUNvbmZpZ1NjaGVtYVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGRhdGE6IHNob3cuZGF0YSAmJiBjcmVhdGVFZGl0b3Ioe3ZhbHVlOiBkYXRhLCBoZWlnaHQsIG9uQ2hhbmdlOiBvbkNoYW5nZX0pLFxyXG4gICAgICAgIGpzeDogc2hvdy5jb2RlICYmIGNvZGUgJiYgPEpzRWRpdG9yIGhlaWdodD17aGVpZ2h0fSBjb2RlPXtjb2RlfS8+XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29udGVudCA9IE9iamVjdC5lbnRyaWVzKGVkaXRvcnMpLmZpbHRlcigoW2ssIHZdKSA9PiB2KS5tYXAoKFtrLCB2XSwgaSkgPT4gKFxyXG4gICAgICAgICAgICB1c2VUYWJzID8gPFRhYlBhbmUga2V5PXtpfSB0YWI9e2t9PlxyXG4gICAgICAgICAgICAgICAge3Z9XHJcbiAgICAgICAgICAgIDwvVGFiUGFuZT4gOiB2XHJcbiAgICAgICAgKVxyXG4gICAgKVxyXG5cclxuICAgIGNvbnN0IGZvcm0gPSA8RGVtb0Zvcm0gey4uLmZvcm1Qcm9wc30gaGVpZ2h0PXtoZWlnaHR9IHNjaGVtYT17c2NoZW1hfSBjb25maWdTY2hlbWE9e2NvbmZpZ1NjaGVtYX0gZGF0YT17ZGF0YX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWFJbml0aWFsaXplZD17KHtkYXRhfSkgPT4gb25DaGFuZ2UoZGF0YSl9Lz5cclxuXHJcblxyXG4gICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgPFJvdz5cclxuICAgICAgICAgICAgezxCdXR0b24gY2xhc3NOYW1lPVwiZWRpdG9yLWhpZGUtYnV0dG9uXCIgb25DbGljaz17KCkgPT4gc2V0U2hvd0VkaXRvcighc2hvd0VkaXRvcil9XHJcbiAgICAgICAgICAgICAgICAgICAgIGljb249e3Nob3dFZGl0b3IgPyA8TGVmdE91dGxpbmVkLz4gOiA8UmlnaHRPdXRsaW5lZC8+fS8+fVxyXG4gICAgICAgICAgICB7c2hvd0VkaXRvciAmJiA8Q29sIHNwYW49ezEyfT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VUYWJzID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFRhYnMgdGFiUG9zaXRpb249XCJ0b3BcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1RhYnM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogY29udGVudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8Q29sIHNwYW49e3Nob3dFZGl0b3IgPyAxMiA6IDI0fT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VUYWJzID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFRhYnMgdGFiUG9zaXRpb249XCJ0b3BcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUYWJQYW5lIGtleT17MX0gdGFiPVwiRGVtb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9UYWJQYW5lPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1RhYnM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZm9ybVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L0NvbD5cclxuICAgICAgICA8L1Jvdz5cclxuICAgIDwvZGl2PlxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBNb25hY29FZGl0b3IgZnJvbSBcInJlYWN0LW1vbmFjby1lZGl0b3JcIjtcclxuY29uc3QgclRhYnMgPSBzdHIgPT4gc3RyLnRyaW0oKS5yZXBsYWNlKC9eIHs0fS9nbSwgXCJcIik7XHJcblxyXG5leHBvcnQgY29uc3QgSnNFZGl0b3IgPSAoe2hlaWdodCwgY29kZX0pID0+IHtcclxuICAgIHJldHVybiA8TW9uYWNvRWRpdG9yIGNsYXNzTmFtZT1cImplZGl0b3JcIiBsYW5ndWFnZT1cImphdmFzY3JpcHRcIlxyXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17clRhYnMoY29kZSl9XHJcbiAgICAgICAgICAgICAgICAgIHRoZW1lPVwidnMtbGlnaHRcIlxyXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ9e2hlaWdodCB8fCA3MDB9XHJcbiAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIG1pbmltYXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICBhdXRvbWF0aWNMYXlvdXQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgLz5cclxufSIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrLCBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VNZW1vLCB1c2VSZWYsfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmNsYXNzIEVycm9yQm91bmRhcnkgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIGNvbXBvbmVudERpZENhdGNoKC4uLmFyZ3MpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt9KTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uRXJyb3IoLi4uYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBub29wID0gKCkgPT4gZmFsc2U7XHJcbmNvbnN0IGVycm9yQm91bmRhcnlDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh7XHJcbiAgICBjb21wb25lbnREaWRDYXRjaDoge2N1cnJlbnQ6IHVuZGVmaW5lZH0sXHJcbiAgICBlcnJvcjogdW5kZWZpbmVkLFxyXG4gICAgc2V0RXJyb3I6IG5vb3AsXHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEVycm9yQm91bmRhcnlDb250ZXh0KHtjaGlsZHJlbix9KSB7XHJcbiAgICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCk7XHJcbiAgICBjb25zdCBjb21wb25lbnREaWRDYXRjaCA9IHVzZVJlZigpO1xyXG4gICAgY29uc3QgY3R4ID0gdXNlTWVtbygoKSA9PiAoe1xyXG4gICAgICAgIGNvbXBvbmVudERpZENhdGNoLFxyXG4gICAgICAgIGVycm9yLFxyXG4gICAgICAgIHNldEVycm9yLFxyXG4gICAgfSksIFtlcnJvcl0pO1xyXG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KGVycm9yQm91bmRhcnlDb250ZXh0LlByb3ZpZGVyLCB7dmFsdWU6IGN0eH0sXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChFcnJvckJvdW5kYXJ5LCB7XHJcbiAgICAgICAgICAgIGVycm9yOiBlcnJvciwgb25FcnJvcjogKGVycm9yLCBlcnJvckluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgIHNldEVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudERpZENhdGNoLmN1cnJlbnQ/LihlcnJvciwgZXJyb3JJbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGNoaWxkcmVuKSkpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhFcnJvckJvdW5kYXJ5KFdyYXBwZWRDb21wb25lbnQpIHtcclxuICAgIGZ1bmN0aW9uIFdpdGhFcnJvckJvdW5kYXJ5KHByb3BzKSB7XHJcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEVycm9yQm91bmRhcnlDb250ZXh0LCBudWxsLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFdyYXBwZWRDb21wb25lbnQsIHtrZXk6IFwiV3JhcHBlZENvbXBvbmVudFwiLCAuLi5wcm9wc30pKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFdpdGhFcnJvckJvdW5kYXJ5O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXNlRXJyb3JCb3VuZGFyeShjb21wb25lbnREaWRDYXRjaCkge1xyXG4gICAgY29uc3QgY3R4ID0gdXNlQ29udGV4dChlcnJvckJvdW5kYXJ5Q29udGV4dCk7XHJcbiAgICBjdHguY29tcG9uZW50RGlkQ2F0Y2guY3VycmVudCA9IGNvbXBvbmVudERpZENhdGNoO1xyXG4gICAgY29uc3QgcmVzZXRFcnJvciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgICAgICBjdHguc2V0RXJyb3IodW5kZWZpbmVkKTtcclxuICAgIH0sIFtdKTtcclxuICAgIHJldHVybiBbY3R4LmVycm9yLCByZXNldEVycm9yXTtcclxufVxyXG4iLCJpbXBvcnQgUmVhY3QsIHt1c2VFZmZlY3QsIHVzZVN0YXRlfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHtjcmVhdGVQb3J0YWx9IGZyb20gJ3JlYWN0LWRvbSdcclxuXHJcbmV4cG9ydCBjb25zdCBJRnJhbWUgPSAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcm9wc1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0pID0+IHtcclxuICAgIGNvbnN0IFtjb250ZW50UmVmLCBzZXRDb250ZW50UmVmXSA9IHVzZVN0YXRlKG51bGwpXHJcbiAgICBjb25zdCBtb3VudE5vZGUgPSBjb250ZW50UmVmPy5jb250ZW50V2luZG93Py5kb2N1bWVudD8uYm9keVxyXG5cclxuICAgIGNvbnN0IHN5bmMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGVzSHRtbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJoZWFkID4gc3R5bGVcIik7XHJcbiAgICAgICAgY29uc3QgZm9ybUZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaWZyYW1lI2Zvcm0tZnJhbWUnKTtcclxuICAgICAgICBpZiAoIWZvcm1GcmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHN0eWxlc0ZyYW1lID0gZm9ybUZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yQWxsKCdzdHlsZScpO1xyXG4gICAgICAgIGlmIChzdHlsZXNGcmFtZS5sZW5ndGggIT09IHN0eWxlc0h0bWwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvcm1GcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvckFsbCgnc3R5bGUnKS5mb3JFYWNoKGVsZW1lbnQgPT4gZWxlbWVudC5yZW1vdmUoKSlcclxuICAgICAgICAgICAgc3R5bGVzSHRtbC5mb3JFYWNoKHN0eWxlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1N0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICAgICAgICAgICAgICAgIG5ld1N0eWxlRWxlbWVudC50ZXh0Q29udGVudCA9IHN0eWxlLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgZm9ybUZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChuZXdTdHlsZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVmcmVzaC1zdHlsZXMnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4gc3luYygpLCBbXSlcclxuXHJcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgc3luYygpXHJcbiAgICB9LCAxMDAwKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxpZnJhbWUgaWQ9XCJmb3JtLWZyYW1lXCIgey4uLnByb3BzfSByZWY9e3NldENvbnRlbnRSZWZ9IGZyYW1lYm9yZGVyPVwiMFwiIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCB8fCAnY2FsYygxMDB2aCAtIDY0cHgpJ1xyXG4gICAgICAgIH19PlxyXG4gICAgICAgICAgICB7bW91bnROb2RlICYmIGNyZWF0ZVBvcnRhbChjaGlsZHJlbiwgbW91bnROb2RlKX1cclxuICAgICAgICA8L2lmcmFtZT5cclxuICAgIClcclxufSIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cclxuZXhwb3J0IGNvbnN0IEJvb2xlYW5UeXBlRG9jdW1lbnRhdGlvbiA9ICgpID0+IHtcclxuICAgIHJldHVybiBcImJcIjtcclxufSIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0VkaXRvcn0gZnJvbSBcImNvbXBvbmVudHMvY29tbW9uL2VkaXRvci9FZGl0b3JcIjtcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIlxyXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XHJcbmltcG9ydCB7U09MVVRJT05TX1BBVEh9IGZyb20gXCJyb3V0ZXMvY29uc3RhbnRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgSG9tZSA9ICgpID0+IHtcclxuICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgIDxoMSBzdHlsZT17e1xyXG4gICAgICAgICAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgIHBhZGRpbmdCb3R0b206IFwiMC4zZW1cIixcclxuICAgICAgICAgICAgZm9udFNpemU6IFwiMmVtXCIsXHJcbiAgICAgICAgICAgIGJvcmRlckJvdHRvbTogXCIxcHggc29saWQgaHNsYSgyMTAsMTglLDg3JSwxKVwiXHJcbiAgICAgICAgfX0+SkZvcm08L2gxPlxyXG4gICAgICAgIDxoMyBzdHlsZT17e3RleHRBbGlnbjogXCJjZW50ZXJcIn19PlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cDovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9cIj5SZWFjdDwvYT5cclxuICAgICAgICAgICAge1wiINC60L7QvNC/0L7QvdC10L3RgiDQtNC70Y8g0LTQtdC60LvQsNGA0LDRgtC40LLQvdC+0LPQviDQv9C+0YHRgtGA0L7QtdC90LjRjyDRhNC+0YDQvCDQvdCwINCx0LDQt9C1IFwifVxyXG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cDovL2pzb24tc2NoZW1hLm9yZy9cIj5Kc29uU2NoZW1hPC9hPlxyXG4gICAgICAgIDwvaDM+XHJcbiAgICAgICAgPGgxIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIHBhZGRpbmdCb3R0b206IFwiMC4zZW1cIixcclxuICAgICAgICAgICAgZm9udFNpemU6IFwiMmVtXCIsXHJcbiAgICAgICAgICAgIGJvcmRlckJvdHRvbTogXCIxcHggc29saWQgaHNsYSgyMTAsMTglLDg3JSwxKVwiXHJcbiAgICAgICAgfX0+0J/QvtC00LTQtdGA0LbQutCwPC9oMT5cclxuICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgIDxsaT7Qk9C10L3QtdGA0LDRhtC40Y8g0LjQtyBKc29uU2NoZW1hINGBINC/0L7QtNC00LXRgNC20LrQvtC5IDxhIGhyZWY9XCJodHRwczovL2pzb24tc2NoZW1hLm9yZy9kcmFmdC0wNy9qc29uLXNjaGVtYS1yZWxlYXNlLW5vdGVzLmh0bWxcIj5EcmFmdCA3PC9hPjwvbGk+XHJcbiAgICAgICAgICAgIDxsaT48TGluayB0bz17U09MVVRJT05TX1BBVEggKyBcIi8wXCJ9PtCU0LjQvdCw0LzQuNGH0LXRgdC60LDRjyDQstC10YDRgdGC0LrQsDwvTGluaz48L2xpPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgICAgPGgxIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIHBhZGRpbmdCb3R0b206IFwiMC4zZW1cIixcclxuICAgICAgICAgICAgZm9udFNpemU6IFwiMmVtXCIsXHJcbiAgICAgICAgICAgIGJvcmRlckJvdHRvbTogXCIxcHggc29saWQgaHNsYSgyMTAsMTglLDg3JSwxKVwiXHJcbiAgICAgICAgfX0+0KPRgdGC0LDQvdC+0LLQutCwPC9oMT5cclxuICAgICAgICBucG0gaW5zdGFsbCBAamZvcm0vY29yZVxyXG4gICAgICAgIDxoMSBzdHlsZT17e1xyXG4gICAgICAgICAgICBwYWRkaW5nQm90dG9tOiBcIjAuM2VtXCIsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiBcIjJlbVwiLFxyXG4gICAgICAgICAgICBib3JkZXJCb3R0b206IFwiMXB4IHNvbGlkIGhzbGEoMjEwLDE4JSw4NyUsMSlcIlxyXG4gICAgICAgIH19PtCY0YHQv9C+0LvRjNC30L7QstCw0L3QuNC1PC9oMT5cclxuXHJcbiAgICAgICAgPEVkaXRvciB7Li4uY29uZmlnfSBoZWlnaHQ9ezM5MH0gc2hvdz17e2NvZGU6IHRydWV9fSB1c2VUYWJzPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgIGZvcm1Qcm9wcz17ey4uLmNvbmZpZywgb25TdWJtaXQ6IGNvbnNvbGUubG9nfX0vPlxyXG4gICAgPC9kaXY+XHJcbn0iLCJjb25zdCBzY2hlbWEgPSAge1xyXG4gICAgXCJ0aXRsZVwiOiBcItCk0L7RgNC80LAg0YDQtdCz0LjRgdGC0YDQsNGG0LjQuFwiLFxyXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcItCf0YDQuNC80LXRgCDRhNC+0YDQvNGLXCIsXHJcbiAgICBcInR5cGVcIjogXCJvYmplY3RcIixcclxuICAgIFwicmVxdWlyZWRcIjogW1wiZmlyc3ROYW1lXCIsXCJhZ3JlZVwiXSxcclxuICAgIFwicHJvcGVydGllc1wiOiB7XHJcbiAgICAgICAgXCJmaXJzdE5hbWVcIjoge1xyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcclxuICAgICAgICAgICAgXCJ0aXRsZVwiOiBcItCY0LzRj1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNleFwiOiB7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgICBcInRpdGxlXCI6IFwi0J/QvtC7XCIsXHJcbiAgICAgICAgICAgIFwiZW51bVwiOiBbXCLQnNGD0LbRgdC60L7QuVwiLCBcItCW0LXQvdGB0LrQuNC5XCJdLFxyXG4gICAgICAgICAgICBcImRlZmF1bHRcIjogXCLQnNGD0LbRgdC60L7QuVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImFncmVlXCI6IHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYm9vbGVhblwiLFxyXG4gICAgICAgICAgICBcInRpdGxlXCI6IFwi0KHQvtCz0LvQsNGB0LjQtSDQvdCwINC+0LHRgNCw0LHQvtGC0LrRgyDQv9C10YDRgdC+0L3QsNC70YzQvdGL0YUg0LTQsNC90L3Ri9GFXCIsXHJcbiAgICAgICAgICAgIFwiY29uc3RcIjogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGNvZGUgPSBgaW1wb3J0IEpGb3JtIGZyb20gXCJAamZvcm0vY29yZVwiXHJcblxyXG5jb25zdCBzY2hlbWEgPSB7XHJcbiAgICBcInRpdGxlXCI6IFwi0KTQvtGA0LzQsCDRgNC10LPQuNGB0YLRgNCw0YbQuNC4XCIsXHJcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwi0J/RgNC40LzQtdGAINGE0L7RgNC80YtcIixcclxuICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxyXG4gICAgXCJyZXF1aXJlZFwiOiBbXCJmaXJzdE5hbWVcIixcImxhc3ROYW1lXCJdLFxyXG4gICAgXCJwcm9wZXJ0aWVzXCI6IHtcclxuICAgICAgICBcImZpcnN0TmFtZVwiOiB7XHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgICBcInRpdGxlXCI6IFwi0JjQvNGPXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic2V4XCI6IHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICAgICBcInRpdGxlXCI6IFwi0J/QvtC7XCIsXHJcbiAgICAgICAgICAgIFwiZW51bVwiOiBbXCLQnNGD0LbRgdC60L7QuVwiLCBcItCW0LXQvdGB0LrQuNC5XCJdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImFncmVlXCI6IHtcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiYm9vbGVhblwiLFxyXG4gICAgICAgICAgICBcInRpdGxlXCI6IFwi0KHQvtCz0LvQsNGB0LjQtSDQvdCwINC+0LHRgNCw0LHQvtGC0LrRgyDQv9C10YDRgdC+0L3QsNC70YzQvdGL0YUg0LTQsNC90L3Ri9GFXCIsXHJcbiAgICAgICAgICAgIFwiY29uc3RcIjogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgQXBwID0gKCkgPT4gKFxyXG4gPEpGb3JtIHNjaGVtYT17c2NoZW1hfS8+XHJcbilgXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBzY2hlbWEsXHJcbiAgICBjb2RlXHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7dXNlUGFyYW1zfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiXHJcbmltcG9ydCB7RWRpdG9yfSBmcm9tIFwiY29tcG9uZW50cy9jb21tb24vZWRpdG9yL0VkaXRvclwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNvbHV0aW9ucyA9IChwcm9wcykgPT4ge1xyXG4gICAgbGV0IHtpZH0gPSB1c2VQYXJhbXMoKTtcclxuICAgIHJldHVybiA8RWRpdG9yICBoZWlnaHQ9ezYwMH0gey4uLmNvbmZpZ1tOdW1iZXIucGFyc2VJbnQoaWQpXX0gZm9ybVByb3BzPXt7Li4uY29uZmlnW051bWJlci5wYXJzZUludChpZCldLCBvblN1Ym1pdDogY29uc29sZS5sb2d9fS8+XHJcbn0iLCJpbXBvcnQgXzAgZnJvbSBcIi4vY29uZmlncy8wXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFtcclxuICAgIF8wXHJcbl0iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBzY2hlbWE6IHtcclxuICAgICAgICB0aXRsZTogJ1RlbGwgbScsXHJcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXHJcbiAgICAgICAgcmVxdWlyZWQ6IFsnZmlyc3ROYW1lJ10sXHJcbiAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICAnaW1hZ2UnOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnaW1hZ2UnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICd1c2VyJyxcclxuICAgICAgICAgICAgICAgICdwcm9wZXJ0aWVzJzoge1xyXG4gICAgICAgICAgICAgICAgICAgICdwYXNzd29yZCc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ1Bhc3N3b3JkJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJ3VzZXJuYW1lJzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAndXNlcm5hbWUnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnZGV0YWlscyc6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnZGV0YWlscydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ2xhc3ROYW1lJzoge1xyXG4gICAgICAgICAgICAgICAgJ3R5cGUnOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgICAgICd0aXRsZSc6ICdMYXN0IG5hbWUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICdiaW8nOiB7XHJcbiAgICAgICAgICAgICAgICAndHlwZSc6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJzogJ0JpbydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ2ZpcnN0TmFtZSc6IHtcclxuICAgICAgICAgICAgICAgICd0eXBlJzogJ3N0cmluZycsXHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAnRmlyc3QgbmFtZSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJ2FnZSc6IHtcclxuICAgICAgICAgICAgICAgICd0eXBlJzogJ3N0cmluZycsXHJcbiAgICAgICAgICAgICAgICAndGl0bGUnOiAnQWdlJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbmZpZ1NjaGVtYToge1xyXG4gICAgICAgIHdpZGdldDoge1xyXG4gICAgICAgICAgICBsYXlvdXQ6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdE5hbWU6IHttZDogNn0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdE5hbWU6IHttZDogNiwgb3B0aW9uYWw6ICh7aXNGaWxsZWR9KSA9PiBpc0ZpbGxlZCgnZmlyc3ROYW1lJyl9XHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IHttZDogMywgb3B0aW9uYWw6ICh7aXNGaWxsZWR9KSA9PiBpc0ZpbGxlZCgnbGFzdE5hbWUnKX0sXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcjoge21kOiA5LCBvcHRpb25hbDogKHtpc0ZpbGxlZH0pID0+IGlzRmlsbGVkKCdsYXN0TmFtZScpfSxcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiB7bWQ6IDEyfVxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbic6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWQ6IDEyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbDogKHtpc0ZpbGxlZH0pID0+IGlzRmlsbGVkKCdsYXN0TmFtZScpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXI6IChwcm9wcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge2RhdGEsIGVycm9yU2NoZW1hfSA9IHByb3BzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7Zmlyc3ROYW1lLCBsYXN0TmFtZX0gPSBkYXRhXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDM+SGVsbG8sIHtmaXJzdE5hbWV9IHtsYXN0TmFtZX0hPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNldGV0dXIgc2FkaXBzY2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxpdHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWQgZGlhbSBub251bXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVpcm1vZCB0ZW1wb3IgaW52aWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpcXV5YW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyYXQsIHNlZCBkaWFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2x1cHR1YS4gQXQgdmVybyBlb3MgZXQgYWNjdXNhbSBldCBqdXN0byBkdW8gZG9sb3Jlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVhIHJlYnVtLiBTdGV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGl0YSBrYXNkIGd1YmVyZ3Jlbiwgbm8gc2VhIHRha2ltYXRhIHNhbmN0dXMgZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb3JlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXBzdW0gZG9sb3Igc2l0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbWV0LiBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2V0ZXR1ciBzYWQ8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWdlOiB7bWQ6IDEyLCBvcHRpb25hbDogKHtpc1RydWV9KSA9PiBpc1RydWUoJ2RldGFpbHMnKX1cclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBiaW86IHttZDogMTIsIG9wdGlvbmFsOiAoe2lzVHJ1ZX0pID0+IGlzVHJ1ZSgnZGV0YWlscycpfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICAkdXNlcjoge1xyXG4gICAgICAgICAgICB3aWRnZXQ6IHtcclxuICAgICAgICAgICAgICAgIGxheW91dDogW1xyXG4gICAgICAgICAgICAgICAgICAgIHt1c2VybmFtZToge21kOiAxMn19LCB7cGFzc3dvcmQ6IHttZDogMTJ9fSxcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJGltYWdlOiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjE1OHB4XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogXCIxNThweFwiLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjFweFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCJcclxuaW1wb3J0IHt1c2VTdG9yZUFjdGlvbnMsIHVzZVN0b3JlU3RhdGV9IGZyb20gXCJlYXN5LXBlYXN5XCI7XHJcbmltcG9ydCB7Rm9ybX0gZnJvbSBcIi4uL2NvbW1vbi9Gb3JtXCI7XHJcbmltcG9ydCB1c2VyIGZyb20gXCIuLi8uLi9zdG9yZS9kZWZhdWx0cy91c2VyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgVGhlbWUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7ZGVmYXVsdHNLZXksIGRlZmF1bHRUeXBlcywgc3R5bGVzS2V5LCBzdHlsZXNUeXBlc30gPSB1c2VTdG9yZVN0YXRlKHN0YXRlID0+IHN0YXRlLnRoZW1lKTtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VEZWZhdWx0cyA9IHVzZVN0b3JlQWN0aW9ucyhzdGF0ZSA9PiBzdGF0ZS50aGVtZS5zZXREZWZhdWx0cyk7XHJcbiAgICBjb25zdCBjaGFuZ2VTdHlsZXMgPSB1c2VTdG9yZUFjdGlvbnMoc3RhdGUgPT4gc3RhdGUudGhlbWUuc2V0U3R5bGVzKTtcclxuICAgIGNvbnN0IGRhdGEgPSB7ZGVmYXVsdHM6IGRlZmF1bHRzS2V5LCBzdHlsZXM6IHN0eWxlc0tleX07XHJcblxyXG4gICAgcmV0dXJuIDxGb3JtIGRlZmF1bHRzPXt1c2VyfSBkYXRhPXtkYXRhfSB7Li4uY29uZmlnKGNoYW5nZURlZmF1bHRzLCBkZWZhdWx0VHlwZXMsIGNoYW5nZVN0eWxlcywgc3R5bGVzVHlwZXMsIGRhdGEpfS8+XHJcbn0iLCJleHBvcnQgZGVmYXVsdCAoc2V0RGVmYXVsdHMsIGRlZmF1bHRUeXBlcywgc2V0U3R5bGVzLCBzdHlsZXNUeXBlcywgZGF0YSkgPT4gKHtcclxuICAgIHNjaGVtYToge1xyXG4gICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXHJcbiAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0czoge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi0KPQvNC+0LvRh9Cw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBlbnVtOiBkZWZhdWx0VHlwZXNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3R5bGVzOiB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLQodGC0LjQu9C4XCIsXHJcbiAgICAgICAgICAgICAgICBlbnVtOiBzdHlsZXNUeXBlc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbmZpZ1NjaGVtYToge1xyXG4gICAgICAgICRzdHlsZXM6IHtcclxuICAgICAgICAgICAgZW1wdHk6IFwiXCIsXHJcbiAgICAgICAgICAgIGhpZGRlbjogZGF0YS5kZWZhdWx0cyAhPT0gXCJCb290c3RyYXBcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBldmVudFNjaGVtYToge1xyXG4gICAgICAgICRkZWZhdWx0czoge1xyXG4gICAgICAgICAgICBvbkNoYW5nZTogeCA9PiBzZXREZWZhdWx0cyh4KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJHN0eWxlczp7XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiB4ID0+IHNldFN0eWxlcyh4KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7cmVuZGVyfSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCB7QXBwfSBmcm9tIFwiLi9BcHBcIjtcclxuaW1wb3J0IHtTdG9yZVByb3ZpZGVyfSBmcm9tIFwiZWFzeS1wZWFzeVwiO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSBcIi4vc3RvcmVcIjtcclxuaW1wb3J0IHtIZWFkUHJvdmlkZXJ9IGZyb20gXCJyZWFjdC1oZWFkXCI7XHJcblxyXG5cclxucmVuZGVyKFxyXG4gICAgPEhlYWRQcm92aWRlcj5cclxuICAgICAgICA8U3RvcmVQcm92aWRlciBzdG9yZT17c3RvcmV9PlxyXG4gICAgICAgICAgICA8QXBwLz5cclxuICAgICAgICA8L1N0b3JlUHJvdmlkZXI+XHJcbiAgICA8L0hlYWRQcm92aWRlcj4sXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKSkiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7TGF5b3V0fSBmcm9tIFwiYW50ZFwiO1xyXG5pbXBvcnQgXCIuLi9zdG9yZS9tb2RlbC90aGVtZS5jc3NcIlxyXG5pbXBvcnQge3VzZVJvdXRlc30gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuaW1wb3J0IHJvdXRlc0NvbmZpZyBmcm9tIFwiLi4vcm91dGVzXCJcclxuXHJcbmNvbnN0IHtDb250ZW50fSA9IExheW91dDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3Qgcm91dGVzID0gdXNlUm91dGVzKHJvdXRlc0NvbmZpZyk7XHJcbiAgICByZXR1cm4gPD5cclxuICAgICAgICA8Q29udGVudCBzdHlsZT17e3BhZGRpbmc6ICcwIDI0cHgnLCBtaW5IZWlnaHQ6IDI4MH19PlxyXG4gICAgICAgICAgICB7cm91dGVzfVxyXG4gICAgICAgIDwvQ29udGVudD5cclxuICAgIDwvPlxyXG59IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vSGVhZGVyLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9IZWFkZXIuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0hlYWRlci5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFwiLi9IZWFkZXIuY3NzXCJcclxuaW1wb3J0IHtCdXR0b24sIExheW91dH0gZnJvbSBcImFudGRcIjtcclxuaW1wb3J0IE1lbnUgZnJvbSBcIi4vbWVudS9NZW51XCI7XHJcbmltcG9ydCBTZXR0aW5nc01lbnUgZnJvbSBcIi4vbWVudS9TZXR0aW5nc01lbnVcIjtcclxuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5pbXBvcnQge01lbnVGb2xkT3V0bGluZWQsIE1lbnVVbmZvbGRPdXRsaW5lZH0gZnJvbSBcIkBhbnQtZGVzaWduL2ljb25zXCI7XHJcbmltcG9ydCB7dXNlU3RvcmVBY3Rpb25zLCB1c2VTdG9yZVN0YXRlfSBmcm9tIFwiZWFzeS1wZWFzeVwiO1xyXG5cclxuY29uc3Qge0hlYWRlcn0gPSBMYXlvdXQ7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB1c2VTdG9yZVN0YXRlKHN0YXRlID0+IHN0YXRlLm1lbnUuY29sbGFwc2VkKTtcclxuICAgIGNvbnN0IHRvZ2dsZUNvbGxhcHNlID0gdXNlU3RvcmVBY3Rpb25zKHN0YXRlID0+IHN0YXRlLm1lbnUudG9nZ2xlQ29sbGFwc2UpO1xyXG5cclxuICAgIHJldHVybiA8SGVhZGVyIGNsYXNzTmFtZT1cImhlYWRlclwiIHN0eWxlPXt7cG9zaXRpb246ICdmaXhlZCcsIHpJbmRleDogMSwgd2lkdGg6ICcxMDAlJ319PlxyXG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJhbnQtbWVudS1vdmVyZmxvdyBhbnQtbWVudSBhbnQtbWVudS1yb290IGFudC1tZW51LWhvcml6b250YWwgYW50LW1lbnUtZGFyayBtZW51XCIgcm9sZT1cIm1lbnVcIlxyXG4gICAgICAgICAgICB0YWJJbmRleD1cIjBcIiBkYXRhLW1lbnUtbGlzdD1cInRydWVcIj5cclxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImFudC1tZW51LW92ZXJmbG93LWl0ZW0gYW50LW1lbnUtaXRlbSBhbnQtbWVudS1pdGVtLW9ubHktY2hpbGQgbWVudS1oZWFkZXItZWxlbWVudCBtZW51LWNvbGxhcHNlLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAge2NvbGxhcHNlZCA/IDxNZW51VW5mb2xkT3V0bGluZWQgY2xhc3NOYW1lPVwibWVudS1oZWFkZXItZWxlbWVudFwiIG9uQ2xpY2s9e3RvZ2dsZUNvbGxhcHNlfS8+IDpcclxuICAgICAgICAgICAgICAgICAgICA8TWVudUZvbGRPdXRsaW5lZCBjbGFzc05hbWU9XCJtZW51LWhlYWRlci1lbGVtZW50XCIgb25DbGljaz17dG9nZ2xlQ29sbGFwc2V9Lz59XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJhbnQtbWVudS1vdmVyZmxvdy1pdGVtIGFudC1tZW51LWl0ZW0gYW50LW1lbnUtaXRlbS1vbmx5LWNoaWxkIG1lbnUtaGVhZGVyLWVsZW1lbnRcIj5cclxuICAgICAgICAgICAgICAgIDxMaW5rIHRvPVwiL1wiPkBKZm9ybSAtIEFQSTwvTGluaz5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgICAgIDxNZW51Lz5cclxuICAgICAgICA8U2V0dGluZ3NNZW51Lz5cclxuICAgIDwvSGVhZGVyPlxyXG59IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTGF5b3V0LmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9MYXlvdXQuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0xheW91dC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0xheW91dH0gZnJvbSBcImFudGRcIjtcclxuaW1wb3J0IFwiLi9MYXlvdXQuY3NzXCJcclxuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi9IZWFkZXJcIjtcclxuaW1wb3J0IFNpZGVyIGZyb20gXCIuL21lbnUvU2lkZXJcIjtcclxuaW1wb3J0IEFwcENvbnRlbnQgZnJvbSBcIi4vQ29udGVudFwiXHJcblxyXG5cclxuY29uc3Qge0NvbnRlbnR9ID0gTGF5b3V0O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG5cclxuICAgIHJldHVybiA8TGF5b3V0PlxyXG4gICAgICAgIDxIZWFkZXIvPlxyXG4gICAgICAgIDxDb250ZW50IHN0eWxlPXt7bWFyZ2luVG9wOiA2NH19PlxyXG4gICAgICAgICAgICA8TGF5b3V0IGNsYXNzTmFtZT1cInNpdGUtbGF5b3V0LWJhY2tncm91bmRcIj5cclxuICAgICAgICAgICAgICAgIDxTaWRlci8+XHJcbiAgICAgICAgICAgICAgICA8QXBwQ29udGVudC8+XHJcbiAgICAgICAgICAgIDwvTGF5b3V0PlxyXG4gICAgICAgIDwvQ29udGVudD5cclxuICAgIDwvTGF5b3V0PlxyXG59IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTWVudS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTWVudS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTWVudS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBcIi4vTWVudS5jc3NcIlxyXG5pbXBvcnQge01lbnV9IGZyb20gXCJhbnRkXCI7XHJcbmltcG9ydCBSZWFjdCwge3VzZUVmZmVjdH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7dXNlU3RvcmVBY3Rpb25zLCB1c2VTdG9yZVN0YXRlfSBmcm9tIFwiZWFzeS1wZWFzeVwiO1xyXG5pbXBvcnQge3VzZUxvY2F0aW9uLCB1c2VOYXZpZ2F0ZX0gZnJvbSBcInJlYWN0LXJvdXRlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gICAgY29uc3QgaGVhZGVyID0gdXNlU3RvcmVTdGF0ZShzdGF0ZSA9PiBzdGF0ZS5tZW51LmhlYWRlcik7XHJcbiAgICBjb25zdCBzZWxlY3RNZW51ID0gdXNlU3RvcmVBY3Rpb25zKHN0YXRlID0+IHN0YXRlLm1lbnUuc2VsZWN0TWVudSlcclxuICAgIGxldCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XHJcblxyXG4gICAgbGV0IHtwYXRobmFtZX0gPSB1c2VMb2NhdGlvbigpO1xyXG4gICAgY29uc3Qga2V5ID0gXCIvXCIgKyBwYXRobmFtZS5zcGxpdCgnLycpWzFdO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgc2VsZWN0TWVudShrZXkpXHJcbiAgICB9LCBba2V5XSlcclxuXHJcbiAgICByZXR1cm4gPE1lbnUgc2VsZWN0ZWRLZXlzPXtba2V5XX0gb25TZWxlY3Q9eyh7a2V5fSkgPT4ge1xyXG4gICAgICAgIG5hdmlnYXRlKGtleSk7XHJcbiAgICB9fSBjbGFzc05hbWU9XCJtZW51XCIgdGhlbWU9XCJkYXJrXCIgbW9kZT1cImhvcml6b250YWxcIiBpdGVtcz17aGVhZGVyfS8+XHJcbn0iLCJpbXBvcnQgUmVhY3QsIHt1c2VTdGF0ZX0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBcIi4vTWVudS5jc3NcIlxyXG5pbXBvcnQge0RyYXdlciwgTWVudX0gZnJvbSBcImFudGRcIjtcclxuaW1wb3J0IHt1c2VTdG9yZVN0YXRlfSBmcm9tIFwiZWFzeS1wZWFzeVwiO1xyXG5pbXBvcnQge1RoZW1lfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy90aGVtZS9UaGVtZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gICAgY29uc3Qgc2V0dGluZ3MgPSB1c2VTdG9yZVN0YXRlKHN0YXRlID0+IHN0YXRlLm1lbnUuc2V0dGluZ3MpO1xyXG4gICAgY29uc3QgW3Zpc2libGUsIHNldFZpc2libGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVNldHRpbmdTZWxlY3QgPSAoe2tleX0pID0+IHtcclxuICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICBjYXNlIFwic2V0dGluZ3NcIjpcclxuICAgICAgICAgICAgICAgIHNldFZpc2libGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIDw+XHJcbiAgICAgICAgPERyYXdlclxyXG4gICAgICAgICAgICB0aXRsZT1cItCd0LDRgdGC0YDQvtC50LrQsCDQvtGC0L7QsdGA0LDQttC10L3QuNGPXCJcclxuICAgICAgICAgICAgcGxhY2VtZW50PVwicmlnaHRcIlxyXG4gICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRWaXNpYmxlKGZhbHNlKX1cclxuICAgICAgICAgICAgdmlzaWJsZT17dmlzaWJsZX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICAgIDxUaGVtZS8+XHJcbiAgICAgICAgPC9EcmF3ZXI+XHJcbiAgICAgICAgPE1lbnUgb25DbGljaz17aGFuZGxlU2V0dGluZ1NlbGVjdH0gc2VsZWN0YWJsZT17ZmFsc2V9IGNsYXNzTmFtZT1cInNldHRpbmdzLW1lbnVcIiB0aGVtZT1cImRhcmtcIlxyXG4gICAgICAgICAgICAgIG1vZGU9XCJob3Jpem9udGFsXCJcclxuICAgICAgICAgICAgICBpdGVtcz17c2V0dGluZ3N9Lz5cclxuICAgIDwvPlxyXG59IiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgXCIuL01lbnUuY3NzXCJcclxuaW1wb3J0IHtNZW51LCBMYXlvdXQsIEJ1dHRvbn0gZnJvbSBcImFudGRcIjtcclxuaW1wb3J0IHt1c2VTdG9yZUFjdGlvbnMsIHVzZVN0b3JlU3RhdGV9IGZyb20gXCJlYXN5LXBlYXN5XCI7XHJcbmltcG9ydCB7dXNlTmF2aWdhdGUsIHVzZUxvY2F0aW9ufSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5pbXBvcnQge01lbnVVbmZvbGRPdXRsaW5lZCwgTWVudUZvbGRPdXRsaW5lZH0gZnJvbSBcIkBhbnQtZGVzaWduL2ljb25zXCI7XHJcblxyXG5jb25zdCB7U2lkZXJ9ID0gTGF5b3V0O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gICAgY29uc3Qgc2lkZXIgPSB1c2VTdG9yZVN0YXRlKHN0YXRlID0+IHN0YXRlLm1lbnUuc2lkZXIpO1xyXG4gICAgY29uc3QgY29sbGFwc2VkID0gdXNlU3RvcmVTdGF0ZShzdGF0ZSA9PiBzdGF0ZS5tZW51LmNvbGxhcHNlZCk7XHJcblxyXG4gICAgbGV0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcclxuICAgIGxldCB7cGF0aG5hbWV9ID0gdXNlTG9jYXRpb24oKTtcclxuXHJcbiAgICByZXR1cm4gKHNpZGVyID8gPFNpZGVyIGNsYXNzTmFtZT1cInNpdGUtbGF5b3V0LWJhY2tncm91bmRcIiB3aWR0aD17Y29sbGFwc2VkID8gMCA6IDIwMH0+XHJcbiAgICAgICAgPE1lbnVcclxuICAgICAgICAgICAgbW9kZT1cImlubGluZVwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7aGVpZ2h0OiAnMTAwJSd9fVxyXG4gICAgICAgICAgICBpdGVtcz17c2lkZXJ9XHJcbiAgICAgICAgICAgIG9uU2VsZWN0PXsoe2tleX0pID0+IHtcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRlKGtleSk7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIHNlbGVjdGVkS2V5cz17W3BhdGhuYW1lXX1cclxuICAgICAgICAvPlxyXG4gICAgPC9TaWRlcj4gOiBudWxsKVxyXG59IiwiZXhwb3J0IGNvbnN0IENPTVBPTkVOVFNfUEFUSCA9IFwiL2NvbXBvbmVudHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBDT01QT05FTlRTX1NUUklOR19QQVRIID0gQ09NUE9ORU5UU19QQVRIICsgXCIvc3RyaW5nXCI7XHJcbmV4cG9ydCBjb25zdCBDT01QT05FTlRTX1NUUklOR19URVhUX1BBVEggPSBDT01QT05FTlRTX1NUUklOR19QQVRIICsgXCIvdGV4dFwiO1xyXG5leHBvcnQgY29uc3QgQ09NUE9ORU5UU19TVFJJTkdfU0VMRUNUX1BBVEggPSBDT01QT05FTlRTX1NUUklOR19QQVRIICsgXCIvc2VsZWN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgQ09NUE9ORU5UU19CT09MRUFOX1BBVEggPSBDT01QT05FTlRTX1BBVEggKyBcIi9ib29sZWFuXCI7XHJcbmV4cG9ydCBjb25zdCBDT01QT05FTlRTX0JPT0xFQU5fQ0hFQ0tCT1hfUEFUSCA9IENPTVBPTkVOVFNfQk9PTEVBTl9QQVRIICsgXCIvY2hlY2tib3hcIjtcclxuZXhwb3J0IGNvbnN0IENPTVBPTkVOVFNfQk9PTEVBTl9TRUxFQ1RfUEFUSCA9IENPTVBPTkVOVFNfQk9PTEVBTl9QQVRIICsgXCIvc2VsZWN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgQ09NUE9ORU5UU19PQkpFQ1RfUEFUSCA9IENPTVBPTkVOVFNfUEFUSCArIFwiL29iamVjdFwiO1xyXG5leHBvcnQgY29uc3QgQ09NUE9ORU5UU19PQkpFQ1RfR1JJRF9QQVRIID0gQ09NUE9ORU5UU19PQkpFQ1RfUEFUSCArIFwiL2dyaWRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBET0NVTUVOVEFUSU9OX1BBVEggPSBcIi9kb2N1bWVudGF0aW9uXCI7XHJcblxyXG5leHBvcnQgY29uc3QgRE9DVU1FTlRBVElPTl9TQ0hFTUFfUEFUSCA9IERPQ1VNRU5UQVRJT05fUEFUSCArIFwiL3NjaGVtYVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IERPQ1VNRU5UQVRJT05fQ09ORklHX1NDSEVNQV9QQVRIID0gRE9DVU1FTlRBVElPTl9QQVRIICsgXCIvY29uZmlnU2NoZW1hXCI7XHJcbmV4cG9ydCBjb25zdCBET0NVTUVOVEFUSU9OX0NPTkZJR19TQ0hFTUFfRUxFTUVOVFNfUEFUSCA9IERPQ1VNRU5UQVRJT05fQ09ORklHX1NDSEVNQV9QQVRIICsgXCIvZWxlbWVudHNcIjtcclxuZXhwb3J0IGNvbnN0IERPQ1VNRU5UQVRJT05fQ09ORklHX1NDSEVNQV9MQVlPVVRfUEFUSCA9IERPQ1VNRU5UQVRJT05fQ09ORklHX1NDSEVNQV9QQVRIICsgXCIvbGF5b3V0XCI7XHJcbmV4cG9ydCBjb25zdCBET0NVTUVOVEFUSU9OX0NPTkZJR19TQ0hFTUFfU1RZTEVTX1BBVEggPSBET0NVTUVOVEFUSU9OX0NPTkZJR19TQ0hFTUFfUEFUSCArIFwiL3N0eWxlc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IERPQ1VNRU5UQVRJT05fVFlQRVNfUEFUSCA9IERPQ1VNRU5UQVRJT05fUEFUSCArIFwiL3R5cGVzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgRE9DVU1FTlRBVElPTl9UWVBFU19TVFJJTkdfUEFUSCA9IERPQ1VNRU5UQVRJT05fVFlQRVNfUEFUSCArIFwiL3N0cmluZ1wiO1xyXG5leHBvcnQgY29uc3QgRE9DVU1FTlRBVElPTl9UWVBFU19CT09MRUFOX1BBVEggPSBET0NVTUVOVEFUSU9OX1RZUEVTX1BBVEggKyBcIi9ib29sZWFuXCI7XHJcbmV4cG9ydCBjb25zdCBET0NVTUVOVEFUSU9OX1RZUEVTX09CSkVDVF9QQVRIID0gRE9DVU1FTlRBVElPTl9UWVBFU19QQVRIICsgXCIvb2JqZWN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgRE9DVU1FTlRBVElPTl9FVkVOVFNfUEFUSCA9IERPQ1VNRU5UQVRJT05fUEFUSCArIFwiL2V2ZW50c1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IERPQ1VNRU5UQVRJT05fREVGQVVMVFNfUEFUSCA9IERPQ1VNRU5UQVRJT05fUEFUSCArIFwiL2RlZmF1bHRzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgRVhBTVBMRVNfUEFUSCA9IFwiL2V4YW1wbGVzXCI7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IFNPTFVUSU9OU19QQVRIID0gXCIvc29sdXRpb25zXCI7IiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQge1NvbHV0aW9uc30gZnJvbSBcIi4uL2NvbXBvbmVudHMvc29sdXRpb25zL1NvbHV0aW9uc1wiO1xyXG5pbXBvcnQge05hdmlnYXRlfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5pbXBvcnQge0hvbWV9IGZyb20gXCIuLi9jb21wb25lbnRzL2hvbWUvSG9tZVwiO1xyXG5pbXBvcnQge1xyXG4gICAgQ09NUE9ORU5UU19QQVRILFxyXG4gICAgRE9DVU1FTlRBVElPTl9DT05GSUdfU0NIRU1BX0VMRU1FTlRTX1BBVEgsXHJcbiAgICBET0NVTUVOVEFUSU9OX0NPTkZJR19TQ0hFTUFfTEFZT1VUX1BBVEgsXHJcbiAgICBET0NVTUVOVEFUSU9OX0NPTkZJR19TQ0hFTUFfUEFUSCxcclxuICAgIERPQ1VNRU5UQVRJT05fQ09ORklHX1NDSEVNQV9TVFlMRVNfUEFUSCwgRE9DVU1FTlRBVElPTl9ERUZBVUxUU19QQVRILCBET0NVTUVOVEFUSU9OX0VWRU5UU19QQVRILFxyXG4gICAgRE9DVU1FTlRBVElPTl9QQVRILFxyXG4gICAgRE9DVU1FTlRBVElPTl9TQ0hFTUFfUEFUSCxcclxuICAgIERPQ1VNRU5UQVRJT05fVFlQRVNfQk9PTEVBTl9QQVRILCBET0NVTUVOVEFUSU9OX1RZUEVTX09CSkVDVF9QQVRILFxyXG4gICAgRE9DVU1FTlRBVElPTl9UWVBFU19QQVRILFxyXG4gICAgRE9DVU1FTlRBVElPTl9UWVBFU19TVFJJTkdfUEFUSCxcclxuICAgIEVYQU1QTEVTX1BBVEgsXHJcbiAgICBTT0xVVElPTlNfUEFUSFxyXG59IGZyb20gXCJyb3V0ZXMvY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7Qm9vbGVhblR5cGVEb2N1bWVudGF0aW9ufSBmcm9tIFwiY29tcG9uZW50cy9kb2N1bWVudGF0aW9uL3R5cGVzL0Jvb2xlYW5UeXBlRG9jdW1lbnRhdGlvblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgW1xyXG4gICAge1xyXG4gICAgICAgIHBhdGg6IFwiXCIsXHJcbiAgICAgICAgZWxlbWVudDogPEhvbWUvPlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiBET0NVTUVOVEFUSU9OX1BBVEgsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAge3BhdGg6IFwiXCIsIGVsZW1lbnQ6IDxOYXZpZ2F0ZSB0bz17RE9DVU1FTlRBVElPTl9TQ0hFTUFfUEFUSH0gcmVwbGFjZS8+fSxcclxuICAgICAgICAgICAge3BhdGg6IERPQ1VNRU5UQVRJT05fU0NIRU1BX1BBVEgsIGVsZW1lbnQ6IERPQ1VNRU5UQVRJT05fU0NIRU1BX1BBVEh9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiBET0NVTUVOVEFUSU9OX0NPTkZJR19TQ0hFTUFfUEFUSCwgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICB7cGF0aDogXCJcIiwgZWxlbWVudDogPE5hdmlnYXRlIHRvPXtET0NVTUVOVEFUSU9OX0NPTkZJR19TQ0hFTUFfRUxFTUVOVFNfUEFUSH0gcmVwbGFjZS8+fSxcclxuICAgICAgICAgICAgICAgICAgICB7cGF0aDogRE9DVU1FTlRBVElPTl9DT05GSUdfU0NIRU1BX0VMRU1FTlRTX1BBVEgsIGVsZW1lbnQ6IERPQ1VNRU5UQVRJT05fQ09ORklHX1NDSEVNQV9FTEVNRU5UU19QQVRIfSxcclxuICAgICAgICAgICAgICAgICAgICB7cGF0aDogRE9DVU1FTlRBVElPTl9DT05GSUdfU0NIRU1BX0xBWU9VVF9QQVRILCBlbGVtZW50OiBET0NVTUVOVEFUSU9OX0NPTkZJR19TQ0hFTUFfTEFZT1VUX1BBVEh9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtwYXRoOiBET0NVTUVOVEFUSU9OX0NPTkZJR19TQ0hFTUFfU1RZTEVTX1BBVEgsIGVsZW1lbnQ6IERPQ1VNRU5UQVRJT05fQ09ORklHX1NDSEVNQV9TVFlMRVNfUEFUSH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogRE9DVU1FTlRBVElPTl9UWVBFU19QQVRILCBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtwYXRoOiBcIlwiLCBlbGVtZW50OiA8TmF2aWdhdGUgdG89e0RPQ1VNRU5UQVRJT05fVFlQRVNfU1RSSU5HX1BBVEh9IHJlcGxhY2UvPn0sXHJcbiAgICAgICAgICAgICAgICAgICAge3BhdGg6IERPQ1VNRU5UQVRJT05fVFlQRVNfU1RSSU5HX1BBVEgsIGVsZW1lbnQ6IERPQ1VNRU5UQVRJT05fVFlQRVNfU1RSSU5HX1BBVEh9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtwYXRoOiBET0NVTUVOVEFUSU9OX1RZUEVTX0JPT0xFQU5fUEFUSCwgZWxlbWVudDogPEJvb2xlYW5UeXBlRG9jdW1lbnRhdGlvbi8+fSxcclxuICAgICAgICAgICAgICAgICAgICB7cGF0aDogRE9DVU1FTlRBVElPTl9UWVBFU19PQkpFQ1RfUEFUSCwgZWxlbWVudDogRE9DVU1FTlRBVElPTl9UWVBFU19PQkpFQ1RfUEFUSH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge3BhdGg6IERPQ1VNRU5UQVRJT05fRVZFTlRTX1BBVEgsIGVsZW1lbnQ6IERPQ1VNRU5UQVRJT05fRVZFTlRTX1BBVEh9LFxyXG4gICAgICAgICAgICB7cGF0aDogRE9DVU1FTlRBVElPTl9ERUZBVUxUU19QQVRILCBlbGVtZW50OiBET0NVTUVOVEFUSU9OX0RFRkFVTFRTX1BBVEh9XHJcblxyXG4gICAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6IENPTVBPTkVOVFNfUEFUSFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBwYXRoOiBFWEFNUExFU19QQVRIXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHBhdGg6IFNPTFVUSU9OU19QQVRILFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIHtwYXRoOiBcIlwiLCBlbGVtZW50OiA8TmF2aWdhdGUgdG89XCIvc29sdXRpb25zLzBcIiByZXBsYWNlLz59LFxyXG4gICAgICAgICAgICB7cGF0aDogXCI6aWRcIiwgZWxlbWVudDogPFNvbHV0aW9ucy8+fVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXSIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY29tbW9uOiB7XHJcbiAgICAgICAgY29uZmlnU2NoZW1hOiB7XHJcbiAgICAgICAgICAgIGxheW91dDoge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcImZvcm0tZ3JvdXBcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogXCIxMHB4XCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0eXBlOiB7XHJcbiAgICAgICAgc3RyaW5nOiB7XHJcbiAgICAgICAgICAgIGNvbmZpZ1NjaGVtYToge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnZm9ybS1jb250cm9sJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHdpZGdldDoge1xyXG4gICAgICAgIGJvb2xlYW46IHtcclxuICAgICAgICAgICAgY2hlY2tib3g6IHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZ1NjaGVtYToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogXCJzcGFuXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGxheW91dDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdjaGVja2JveCdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07IiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY2VydWxlYW46IHtcclxuICAgICAgICBzdHlsZXNoZWV0OlxyXG4gICAgICAgICAgICBcIi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Jvb3Rzd2F0Y2gvMy4zLjYvY2VydWxlYW4vYm9vdHN0cmFwLm1pbi5jc3NcIixcclxuICAgIH0sXHJcbiAgICBjb3Ntbzoge1xyXG4gICAgICAgIHN0eWxlc2hlZXQ6XHJcbiAgICAgICAgICAgIFwiLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvYm9vdHN3YXRjaC8zLjMuNi9jb3Ntby9ib290c3RyYXAubWluLmNzc1wiLFxyXG4gICAgfSxcclxuICAgIGN5Ym9yZzoge1xyXG4gICAgICAgIHN0eWxlc2hlZXQ6XHJcbiAgICAgICAgICAgIFwiLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvYm9vdHN3YXRjaC8zLjMuNi9jeWJvcmcvYm9vdHN0cmFwLm1pbi5jc3NcIixcclxuICAgIH0sXHJcbiAgICBkYXJrbHk6IHtcclxuICAgICAgICBzdHlsZXNoZWV0OlxyXG4gICAgICAgICAgICBcIi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Jvb3Rzd2F0Y2gvMy4zLjYvZGFya2x5L2Jvb3RzdHJhcC5taW4uY3NzXCIsXHJcbiAgICB9LFxyXG4gICAgZmxhdGx5OiB7XHJcbiAgICAgICAgc3R5bGVzaGVldDpcclxuICAgICAgICAgICAgXCIvL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9ib290c3dhdGNoLzMuMy42L2ZsYXRseS9ib290c3RyYXAubWluLmNzc1wiLFxyXG4gICAgfSxcclxuICAgIGpvdXJuYWw6IHtcclxuICAgICAgICBzdHlsZXNoZWV0OlxyXG4gICAgICAgICAgICBcIi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Jvb3Rzd2F0Y2gvMy4zLjYvam91cm5hbC9ib290c3RyYXAubWluLmNzc1wiLFxyXG4gICAgfSxcclxuICAgIGx1bWVuOiB7XHJcbiAgICAgICAgc3R5bGVzaGVldDpcclxuICAgICAgICAgICAgXCIvL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9ib290c3dhdGNoLzMuMy42L2x1bWVuL2Jvb3RzdHJhcC5taW4uY3NzXCIsXHJcbiAgICB9LFxyXG4gICAgcGFwZXI6IHtcclxuICAgICAgICBzdHlsZXNoZWV0OlxyXG4gICAgICAgICAgICBcIi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Jvb3Rzd2F0Y2gvMy4zLjYvcGFwZXIvYm9vdHN0cmFwLm1pbi5jc3NcIixcclxuICAgIH0sXHJcbiAgICByZWFkYWJsZToge1xyXG4gICAgICAgIHN0eWxlc2hlZXQ6XHJcbiAgICAgICAgICAgIFwiLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvYm9vdHN3YXRjaC8zLjMuNi9yZWFkYWJsZS9ib290c3RyYXAubWluLmNzc1wiLFxyXG4gICAgfSxcclxuICAgIHNhbmRzdG9uZToge1xyXG4gICAgICAgIHN0eWxlc2hlZXQ6XHJcbiAgICAgICAgICAgIFwiLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvYm9vdHN3YXRjaC8zLjMuNi9zYW5kc3RvbmUvYm9vdHN0cmFwLm1pbi5jc3NcIixcclxuICAgIH0sXHJcbiAgICBzaW1wbGV4OiB7XHJcbiAgICAgICAgc3R5bGVzaGVldDpcclxuICAgICAgICAgICAgXCIvL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9ib290c3dhdGNoLzMuMy42L3NpbXBsZXgvYm9vdHN0cmFwLm1pbi5jc3NcIixcclxuICAgIH0sXHJcbiAgICBzbGF0ZToge1xyXG4gICAgICAgIHN0eWxlc2hlZXQ6XHJcbiAgICAgICAgICAgIFwiLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvYm9vdHN3YXRjaC8zLjMuNi9zbGF0ZS9ib290c3RyYXAubWluLmNzc1wiLFxyXG4gICAgfSxcclxuICAgIHNwYWNlbGFiOiB7XHJcbiAgICAgICAgc3R5bGVzaGVldDpcclxuICAgICAgICAgICAgXCIvL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9ib290c3dhdGNoLzMuMy42L3NwYWNlbGFiL2Jvb3RzdHJhcC5taW4uY3NzXCIsXHJcbiAgICB9LFxyXG4gICAgXCJzb2xhcml6ZWQtZGFya1wiOiB7XHJcbiAgICAgICAgc3R5bGVzaGVldDpcclxuICAgICAgICAgICAgXCIvL2Nkbi5yYXdnaXQuY29tL2FhbHBlcm4vYm9vdHN0cmFwLXNvbGFyaXplZC9tYXN0ZXIvYm9vdHN0cmFwLXNvbGFyaXplZC1kYXJrLmNzc1wiLFxyXG4gICAgfSxcclxuICAgIFwic29sYXJpemVkLWxpZ2h0XCI6IHtcclxuICAgICAgICBzdHlsZXNoZWV0OlxyXG4gICAgICAgICAgICBcIi8vY2RuLnJhd2dpdC5jb20vYWFscGVybi9ib290c3RyYXAtc29sYXJpemVkL21hc3Rlci9ib290c3RyYXAtc29sYXJpemVkLWxpZ2h0LmNzc1wiLFxyXG4gICAgfSxcclxuICAgIHN1cGVyaGVybzoge1xyXG4gICAgICAgIHN0eWxlc2hlZXQ6XHJcbiAgICAgICAgICAgIFwiLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvYm9vdHN3YXRjaC8zLjMuNi9zdXBlcmhlcm8vYm9vdHN0cmFwLm1pbi5jc3NcIixcclxuICAgIH0sXHJcbiAgICB1bml0ZWQ6IHtcclxuICAgICAgICBzdHlsZXNoZWV0OlxyXG4gICAgICAgICAgICBcIi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2Jvb3Rzd2F0Y2gvMy4zLjYvdW5pdGVkL2Jvb3RzdHJhcC5taW4uY3NzXCIsXHJcbiAgICB9LFxyXG4gICAgeWV0aToge1xyXG4gICAgICAgIHN0eWxlc2hlZXQ6XHJcbiAgICAgICAgICAgIFwiLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvYm9vdHN3YXRjaC8zLjMuNi95ZXRpL2Jvb3RzdHJhcC5taW4uY3NzXCIsXHJcbiAgICB9LFxyXG4gICAgXCJib290c3RyYXAtNFwiOiB7XHJcbiAgICAgICAgc3R5bGVzaGVldDpcclxuICAgICAgICAgICAgXCJodHRwczovL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC80LjUuMC9jc3MvYm9vdHN0cmFwLm1pbi5jc3NcIixcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvbW1vbjoge1xyXG4gICAgICAgIGNvbmZpZ1NjaGVtYToge1xyXG4gICAgICAgICAgICB0aXRsZToge1xyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA3MDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGF5b3V0OiB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXI6IFtcclxuICAgICAgICAgICAgICAgICAgICB7dGl0bGU6IHt9fSxcclxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW46IHt9fSxcclxuICAgICAgICAgICAgICAgICAgICB7ZGVzY3JpcHRpb246IHt9fSxcclxuICAgICAgICAgICAgICAgICAgICB7aGVscDoge319LFxyXG4gICAgICAgICAgICAgICAgICAgIHtlcnJvcnM6IHt9fVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogXCIxMHB4XCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0eXBlOiB7XHJcbiAgICAgICAgb2JqZWN0OiB7XHJcbiAgICAgICAgICAgIGNvbmZpZ1NjaGVtYToge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjBweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIyMXB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogXCIxcHggc29saWQgI2U1ZTVlNVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdHJpbmc6IHtcclxuICAgICAgICAgICAgY29uZmlnU2NoZW1hOiB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFwidXNlci1mb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBib29sZWFuOiB7XHJcbiAgICAgICAgICAgIGNvbmZpZ1NjaGVtYToge1xyXG4gICAgICAgICAgICAgICAgbGF5b3V0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBcInVzZXItYm9vbGVhbi1sYXlvdXRcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiMjBweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCIyMHB4XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aXRsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luTGVmdDogXCIxMHB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduU2VsZjogXCJlbmRcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB3aWRnZXQ6IHtcclxuICAgICAgICBvYmplY3Q6IHtcclxuICAgICAgICAgICAgZ3JpZDoge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnU2NoZW1hOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1TdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImZsZXgtZW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7Y3JlYXRlU3RvcmV9IGZyb20gXCJlYXN5LXBlYXN5XCI7XHJcbmltcG9ydCBtZW51IGZyb20gXCIuL21vZGVsL21lbnVcIjtcclxuaW1wb3J0IHRoZW1lIGZyb20gXCIuL21vZGVsL3RoZW1lXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZSh7XHJcbiAgICBtZW51LCB0aGVtZVxyXG59KTsiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtTZXR0aW5nT3V0bGluZWR9IGZyb20gXCJAYW50LWRlc2lnbi9pY29uc1wiO1xyXG5pbXBvcnQge2FjdGlvbiwgY29tcHV0ZWR9IGZyb20gXCJlYXN5LXBlYXN5XCI7XHJcbmltcG9ydCBkb2N1bWVudGF0aW9uIGZyb20gXCIuL3NpZGVyL2RvY3VtZW50YXRpb25cIlxyXG5pbXBvcnQgZXhhbXBsZXMgZnJvbSBcIi4vc2lkZXIvZXhhbXBsZXNcIlxyXG5pbXBvcnQgc29sdXRpb25zIGZyb20gXCIuL3NpZGVyL3NvbHV0aW9uc1wiXHJcbmltcG9ydCBjb21wb25lbnRzIGZyb20gXCIuL3NpZGVyL2NvbXBvbmVudHNcIlxyXG5pbXBvcnQge0NPTVBPTkVOVFNfUEFUSCwgRE9DVU1FTlRBVElPTl9QQVRILCBFWEFNUExFU19QQVRILCBTT0xVVElPTlNfUEFUSH0gZnJvbSBcInJvdXRlcy9jb25zdGFudHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGhlYWRlcjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwi0JTQvtC60YPQvNC10L3RgtCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgIHNpZGVyOiBkb2N1bWVudGF0aW9uLFxyXG4gICAgICAgICAgICBrZXk6IERPQ1VNRU5UQVRJT05fUEFUSFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsYWJlbDogXCLQktC40LTQttC10YLRi1wiLFxyXG4gICAgICAgICAgICBzaWRlcjogY29tcG9uZW50cyxcclxuICAgICAgICAgICAga2V5OiBDT01QT05FTlRTX1BBVEhcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwi0J/RgNC40LzQtdGA0YtcIixcclxuICAgICAgICAgICAgc2lkZXI6IGV4YW1wbGVzLFxyXG4gICAgICAgICAgICBrZXk6IEVYQU1QTEVTX1BBVEhcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGFiZWw6IFwi0KDQtdGI0LXQvdC40Y9cIixcclxuICAgICAgICAgICAgc2lkZXI6IHNvbHV0aW9ucyxcclxuICAgICAgICAgICAga2V5OiBTT0xVVElPTlNfUEFUSFxyXG4gICAgICAgIH1cclxuICAgIF0sXHJcbiAgICBzZXR0aW5nczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAga2V5OiBcInNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgIGljb246IDxTZXR0aW5nT3V0bGluZWQgY2xhc3NOYW1lPVwibWVudS1oZWFkZXItZWxlbWVudFwiLz5cclxuICAgICAgICB9XHJcbiAgICBdLFxyXG5cclxuICAgIG1lbnVLZXk6IFwiL1wiLFxyXG4gICAgY29sbGFwc2VkOiBmYWxzZSxcclxuXHJcbiAgICBzaWRlcjogY29tcHV0ZWQoc3RhdGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IHN0YXRlLmhlYWRlci5maW5kKHggPT4geC5rZXkgPT09IHN0YXRlLm1lbnVLZXkpO1xyXG4gICAgICAgIGlmIChoZWFkZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhlYWRlci5zaWRlcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9KSxcclxuXHJcbiAgICBzZWxlY3RNZW51OiBhY3Rpb24oKHN0YXRlLCBwYXlsb2FkKSA9PiB7XHJcbiAgICAgICAgc3RhdGUubWVudUtleSA9IHBheWxvYWQ7XHJcbiAgICB9KSxcclxuXHJcbiAgICB0b2dnbGVDb2xsYXBzZTogYWN0aW9uKChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xyXG4gICAgICAgIHN0YXRlLmNvbGxhcHNlZCA9ICFzdGF0ZS5jb2xsYXBzZWQ7XHJcbiAgICB9KVxyXG5cclxufTsiLCJpbXBvcnQge1xyXG4gICAgQ09NUE9ORU5UU19CT09MRUFOX0NIRUNLQk9YX1BBVEgsXHJcbiAgICBDT01QT05FTlRTX0JPT0xFQU5fUEFUSCwgQ09NUE9ORU5UU19CT09MRUFOX1NFTEVDVF9QQVRILCBDT01QT05FTlRTX09CSkVDVF9HUklEX1BBVEgsXHJcbiAgICBDT01QT05FTlRTX09CSkVDVF9QQVRILFxyXG4gICAgQ09NUE9ORU5UU19TVFJJTkdfUEFUSCwgQ09NUE9ORU5UU19TVFJJTkdfU0VMRUNUX1BBVEgsXHJcbiAgICBDT01QT05FTlRTX1NUUklOR19URVhUX1BBVEhcclxufSBmcm9tIFwicm91dGVzL2NvbnN0YW50c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgW1xyXG4gICAge1xyXG4gICAgICAgIGxhYmVsOiBcInN0cmluZ1wiLCBrZXk6IENPTVBPTkVOVFNfU1RSSU5HX1BBVEgsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAge2xhYmVsOiBcInRleHRcIiwga2V5OiBDT01QT05FTlRTX1NUUklOR19URVhUX1BBVEh9LFxyXG4gICAgICAgICAgICB7bGFiZWw6IFwic2VsZWN0XCIsIGtleTogQ09NUE9ORU5UU19TVFJJTkdfU0VMRUNUX1BBVEh9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBsYWJlbDogXCJib29sZWFuXCIsIGtleTogQ09NUE9ORU5UU19CT09MRUFOX1BBVEgsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAge2xhYmVsOiBcImNoZWNrYm94XCIsIGtleTogQ09NUE9ORU5UU19CT09MRUFOX0NIRUNLQk9YX1BBVEh9LFxyXG4gICAgICAgICAgICB7bGFiZWw6IFwic2VsZWN0XCIsIGtleTogQ09NUE9ORU5UU19CT09MRUFOX1NFTEVDVF9QQVRIfSxcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGxhYmVsOiBcIm9iamVjdFwiLCBrZXk6IENPTVBPTkVOVFNfT0JKRUNUX1BBVEgsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAge2xhYmVsOiBcImdyaWRcIiwga2V5OiBDT01QT05FTlRTX09CSkVDVF9HUklEX1BBVEh9LFxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXSIsImltcG9ydCB7XHJcbiAgICBET0NVTUVOVEFUSU9OX0NPTkZJR19TQ0hFTUFfRUxFTUVOVFNfUEFUSCxcclxuICAgIERPQ1VNRU5UQVRJT05fQ09ORklHX1NDSEVNQV9MQVlPVVRfUEFUSCxcclxuICAgIERPQ1VNRU5UQVRJT05fQ09ORklHX1NDSEVNQV9QQVRILFxyXG4gICAgRE9DVU1FTlRBVElPTl9DT05GSUdfU0NIRU1BX1NUWUxFU19QQVRILCBET0NVTUVOVEFUSU9OX0RFRkFVTFRTX1BBVEgsIERPQ1VNRU5UQVRJT05fRVZFTlRTX1BBVEgsXHJcbiAgICBET0NVTUVOVEFUSU9OX1NDSEVNQV9QQVRILFxyXG4gICAgRE9DVU1FTlRBVElPTl9UWVBFU19CT09MRUFOX1BBVEgsIERPQ1VNRU5UQVRJT05fVFlQRVNfT0JKRUNUX1BBVEgsXHJcbiAgICBET0NVTUVOVEFUSU9OX1RZUEVTX1BBVEgsXHJcbiAgICBET0NVTUVOVEFUSU9OX1RZUEVTX1NUUklOR19QQVRIXHJcbn0gZnJvbSBcInJvdXRlcy9jb25zdGFudHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFtcclxuICAgIHtsYWJlbDogXCLQodGF0LXQvNCwXCIsIGtleTogRE9DVU1FTlRBVElPTl9TQ0hFTUFfUEFUSH0sXHJcbiAgICB7XHJcbiAgICAgICAgbGFiZWw6IFwi0JLQuNC30YPQsNC70YzQvdCw0Y8g0YHRhdC10LzQsFwiLCBrZXk6IERPQ1VNRU5UQVRJT05fQ09ORklHX1NDSEVNQV9QQVRILFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIHtsYWJlbDogXCLQrdC70LXQvNC10L3RgtGLXCIsIGtleTogRE9DVU1FTlRBVElPTl9DT05GSUdfU0NIRU1BX0VMRU1FTlRTX1BBVEh9LFxyXG4gICAgICAgICAgICB7bGFiZWw6IFwi0JLQtdGA0YHRgtC60LBcIiwga2V5OiBET0NVTUVOVEFUSU9OX0NPTkZJR19TQ0hFTUFfTEFZT1VUX1BBVEh9LFxyXG4gICAgICAgICAgICB7bGFiZWw6IFwi0KHRgtC40LvQuNC30LDRhtC40Y9cIiwga2V5OiBET0NVTUVOVEFUSU9OX0NPTkZJR19TQ0hFTUFfU1RZTEVTX1BBVEh9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBsYWJlbDogXCLQotC40L/Ri1wiLCBrZXk6IERPQ1VNRU5UQVRJT05fVFlQRVNfUEFUSCxcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICB7bGFiZWw6IFwi0KHRgtGA0L7QutCwXCIsIGtleTogRE9DVU1FTlRBVElPTl9UWVBFU19TVFJJTkdfUEFUSH0sXHJcbiAgICAgICAgICAgIHtsYWJlbDogXCLQm9C+0LPQuNGH0LXRgdC60L7QtVwiLCBrZXk6IERPQ1VNRU5UQVRJT05fVFlQRVNfQk9PTEVBTl9QQVRIfSxcclxuICAgICAgICAgICAge2xhYmVsOiBcItCe0LHRitC10LrRglwiLCBrZXk6IERPQ1VNRU5UQVRJT05fVFlQRVNfT0JKRUNUX1BBVEh9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtsYWJlbDogXCLQodC+0LHRi9GC0LjRj1wiLCBrZXk6IERPQ1VNRU5UQVRJT05fRVZFTlRTX1BBVEh9LFxyXG4gICAge2xhYmVsOiBcItCj0LzQvtC70YfQsNC90LjRj1wiLCBrZXk6IERPQ1VNRU5UQVRJT05fREVGQVVMVFNfUEFUSH1cclxuXSIsImV4cG9ydCBkZWZhdWx0IFtdIiwiaW1wb3J0IHtTT0xVVElPTlNfUEFUSH0gZnJvbSBcInJvdXRlcy9jb25zdGFudHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFtcclxuICAgIHtcclxuICAgICAgICBsYWJlbDogXCLQlNC40L3QsNC80LjRh9C10YHQutCw0Y8g0LLQtdGA0YHRgtC60LBcIiwga2V5OiBTT0xVVElPTlNfUEFUSCArIFwiLzBcIlxyXG4gICAgfVxyXG5dIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vdGhlbWUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3RoZW1lLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi90aGVtZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCB7YWN0aW9uLCBjb21wdXRlZH0gZnJvbSBcImVhc3ktcGVhc3lcIjtcclxuaW1wb3J0IHVzZXJEZWZhdWx0cyBmcm9tIFwiLi4vZGVmYXVsdHMvdXNlclwiXHJcbmltcG9ydCBib290c3RyYXBEZWZhdWx0cyBmcm9tIFwiLi4vZGVmYXVsdHMvYm9vdHN0cmFwXCJcclxuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi4vZGVmYXVsdHMvc3R5bGVzXCJcclxuXHJcbmltcG9ydCBcIi4vdGhlbWUuY3NzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGRlZmF1bHRzS2V5OiBcItCf0L7Qu9GM0LfQvtCy0LDRgtC10LvRjNGB0LrQuNC1INGB0YLQuNC70LhcIixcclxuICAgIHN0eWxlc0tleTogbnVsbCxcclxuXHJcbiAgICB0ZW1wbGF0ZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcItCf0L7Qu9GM0LfQvtCy0LDRgtC10LvRjNGB0LrQuNC1INGB0YLQuNC70LhcIixcclxuICAgICAgICAgICAgdmFsdWU6IHVzZXJEZWZhdWx0c1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aXRsZTogXCJCb290c3RyYXBcIixcclxuICAgICAgICAgICAgdmFsdWU6IGJvb3RzdHJhcERlZmF1bHRzXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuXHJcbiAgICBzdHlsZXM6IHN0eWxlcyxcclxuXHJcbiAgICBkZWZhdWx0VHlwZXM6IGNvbXB1dGVkKHN0YXRlID0+IHtcclxuICAgICAgICByZXR1cm4gc3RhdGUudGVtcGxhdGVzLm1hcCh0ZW1wbGF0ZSA9PiB0ZW1wbGF0ZS50aXRsZSk7XHJcbiAgICB9KSxcclxuXHJcbiAgICBzdHlsZXNUeXBlczogY29tcHV0ZWQoc3RhdGUgPT4ge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhzdGF0ZS5zdHlsZXMpO1xyXG4gICAgfSksXHJcblxyXG4gICAgc2VsZWN0ZWREZWZhdWx0czogY29tcHV0ZWQoc3RhdGUgPT4ge1xyXG4gICAgICAgIHJldHVybiAoc3RhdGUudGVtcGxhdGVzLmZpbmQodGVtcGxhdGUgPT4gdGVtcGxhdGUudGl0bGUgPT09IHN0YXRlLmRlZmF1bHRzS2V5KSB8fCB7dmFsdWU6IHt9fSkudmFsdWU7XHJcbiAgICB9KSxcclxuXHJcbiAgICBzZWxlY3RlZFN0eWxlczogY29tcHV0ZWQoc3RhdGUgPT4ge1xyXG4gICAgICAgIGlmIChzdGF0ZS5zdHlsZXNLZXkgJiYgc3RhdGUuZGVmYXVsdHNLZXkgPT09IFwiQm9vdHN0cmFwXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLnN0eWxlc1tzdGF0ZS5zdHlsZXNLZXldLnN0eWxlc2hlZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSksXHJcblxyXG4gICAgc2V0RGVmYXVsdHM6IGFjdGlvbigoc3RhdGUsIHBheWxvYWQpID0+IHtcclxuICAgICAgICBzdGF0ZS5kZWZhdWx0c0tleSA9IHBheWxvYWQ7XHJcbiAgICAgICAgaWYocGF5bG9hZCAhPT0gXCJCb290c3RyYXBcIikge1xyXG4gICAgICAgICAgICBzdGF0ZS5zdHlsZXNLZXkgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH0pLFxyXG5cclxuICAgIHNldFN0eWxlczogYWN0aW9uKChzdGF0ZSwgcGF5bG9hZCkgPT4ge1xyXG4gICAgICAgIHN0YXRlLnN0eWxlc0tleSA9IHBheWxvYWQ7XHJcbiAgICB9KVxyXG5cclxuXHJcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==