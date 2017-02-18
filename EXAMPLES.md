
### auth/token/from_oauth1 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#auth-token-from_oauth1))
Creates an OAuth 2.0 access token from the supplied OAuth 1.0 access token.

```js
dropbox({
    resource: 'auth/token/from_oauth1',
    parameters: {
        'oauth1_token': 'qievr8hamyg6ndck',
        'oauth1_token_secret': 'qomoftv0472git7'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### auth/token/revoke ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#auth-token-revoke))
Disables the access token used to authenticate the call.

```js
dropbox({
    resource: 'auth/token/revoke'
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/alpha/get_metadata ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-alpha-get_metadata))
Returns the metadata for a file or folder. This is an alpha endpoint compatible with the properties API.Note: Metadata for the root folder is unsupported.

```js
dropbox({
    resource: 'files/alpha/get_metadata',
    parameters: {
        'path': '/Homework/math',
        'include_media_info': false,
        'include_deleted': false,
        'include_has_explicit_shared_members': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/alpha/upload ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-alpha-upload))
Create a new file with the contents provided in the request. Note that this endpoint is part of the properties API alpha and is slightly different from [upload](#filesupload-see-docs).Do not use this to upload a file larger than 150 MB. Instead, create an upload session with [upload_session/start](#filesupload_sessionstart-see-docs).

```js
const stream = dropbox({
    resource: 'files/alpha/upload',
    parameters: {
        'path': '/Homework/math/Matrices.txt',
        'mode': 'add',
        'autorename': true,
        'mute': false,
        'property_groups': [{
            'template_id': 'ptid:1a5n2i6d3OYEAAAAAAAAAYa',
            'fields': [{
                'name': 'Security Policy',
                'value': 'Confidential'
            }]
        }]
    }
}, (err, result) => {
    //see docs for `result` parameters
});

fs.createReadStream('/Homework/math/Matrices.txt').pipe(stream);
```


### files/copy ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-copy))
Copy a file or folder to a different location in the user's Dropbox.If the source path is a folder all its contents will be copied.

```js
dropbox({
    resource: 'files/copy',
    parameters: {
        'from_path': '/Homework/math',
        'to_path': '/Homework/algebra',
        'allow_shared_folder': false,
        'autorename': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/copy_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-copy_batch))
Copy multiple files or folders to different locations at once in the user's Dropbox.If RelocationBatchArg.allow_shared_folder is false, this route is atomic. If on entry failes, the whole transaction will abort. If RelocationBatchArg.allow_shared_folder is true, not atomicity is guaranteed, but you will be able to copy the contents of shared folders to new locations.This route will return job ID immediately and do the async copy job in background. Please use [copy_batch/check](#filescopy_batchcheck-see-docs) to check the job status.

```js
dropbox({
    resource: 'files/copy_batch',
    parameters: {
        'entries': [{
            'from_path': '/Homework/math',
            'to_path': '/Homework/algebra'
        }],
        'allow_shared_folder': false,
        'autorename': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/copy_batch/check ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-copy_batch-check))
Returns the status of an asynchronous job for [copy_batch](#filescopy_batch-see-docs). If success, it returns list of results for each entry.

```js
dropbox({
    resource: 'files/copy_batch/check',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/copy_reference/get ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-copy_reference-get))
Get a copy reference to a file or folder. This reference string can be used to save that file or folder to another user's Dropbox by passing it to [copy_reference/save](#filescopy_referencesave-see-docs).

```js
dropbox({
    resource: 'files/copy_reference/get',
    parameters: {
        'path': '/video.mp4'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/copy_reference/save ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-copy_reference-save))
Save a copy reference returned by [copy_reference/get](#filescopy_referenceget-see-docs) to the user's Dropbox.

```js
dropbox({
    resource: 'files/copy_reference/save',
    parameters: {
        'copy_reference': 'z1X6ATl6aWtzOGq0c3g5Ng',
        'path': '/video.mp4'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/create_folder ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-create_folder))
Create a folder at a given path.

```js
dropbox({
    resource: 'files/create_folder',
    parameters: {
        'path': '/Homework/math',
        'autorename': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/delete ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-delete))
Delete the file or folder at a given path.If the path is a folder, all its contents will be deleted too.A successful response indicates that the file or folder was deleted. The returned metadata will be the corresponding FileMetadata or FolderMetadata for the item at time of deletion, and not a DeletedMetadata object.

```js
dropbox({
    resource: 'files/delete',
    parameters: {
        'path': '/Homework/math/Prime_Numbers.txt'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/delete_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-delete_batch))
Delete multiple files/folders at once.This route is asynchronous, which returns a job ID immediately and runs the delete batch asynchronously. Use [delete_batch/check](#filesdelete_batchcheck-see-docs) to check the job status.

```js
dropbox({
    resource: 'files/delete_batch',
    parameters: {
        'entries': [{
            'path': '/Homework/math/Prime_Numbers.txt'
        }]
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/delete_batch/check ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-delete_batch-check))
Returns the status of an asynchronous job for [delete_batch](#filesdelete_batch-see-docs). If success, it returns list of result for each entry.

```js
dropbox({
    resource: 'files/delete_batch/check',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/download ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-download))
Download a file from a user's Dropbox.

```js
const stream = dropbox({
    resource: 'files/download',
    parameters: {
        'path': '/Homework/math/Prime_Numbers.txt'
    }
}, (err, result) => {
    //see docs for `result` parameters
});

stream
    .pipe(fs.createWriteStream('/Homework/math/Prime_Numbers.txt')); //pipe the stream
```


### files/get_metadata ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-get_metadata))
Returns the metadata for a file or folder.Note: Metadata for the root folder is unsupported.

```js
dropbox({
    resource: 'files/get_metadata',
    parameters: {
        'path': '/Homework/math',
        'include_media_info': false,
        'include_deleted': false,
        'include_has_explicit_shared_members': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/get_preview ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-get_preview))
Get a preview for a file. Currently previews are only generated for the files with  the following extensions: .doc, .docx, .docm, .ppt, .pps, .ppsx, .ppsm, .pptx, .pptm,  .xls, .xlsx, .xlsm, .rtf.

```js
const stream = dropbox({
    resource: 'files/get_preview',
    parameters: {
        'path': '/word.docx'
    }
}, (err, result) => {
    //see docs for `result` parameters
});

stream
    .pipe(fs.createWriteStream('/word.docx')); //pipe the stream
```


### files/get_temporary_link ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-get_temporary_link))
Get a temporary link to stream content of a file. This link will expire in four hours and afterwards you will get 410 Gone. Content-Type of the link is determined automatically by the file's mime type.

```js
dropbox({
    resource: 'files/get_temporary_link',
    parameters: {
        'path': '/video.mp4'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/get_thumbnail ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-get_thumbnail))
Get a thumbnail for an image.This method currently supports files with the following file extensions: jpg, jpeg, png, tiff, tif, gif and bmp. Photos that are larger than 20MB in size won't be converted to a thumbnail.

```js
const stream = dropbox({
    resource: 'files/get_thumbnail',
    parameters: {
        'path': '/image.jpg',
        'format': 'jpeg',
        'size': 'w64h64'
    }
}, (err, result) => {
    //see docs for `result` parameters
});

stream
    .pipe(fs.createWriteStream('/image.jpg')); //pipe the stream
```


### files/list_folder ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-list_folder))
Starts returning the contents of a folder. If the result's ListFolderResult.has_more field is true, call [list_folder/continue](#fileslist_foldercontinue-see-docs) with the returned ListFolderResult.cursor to retrieve more entries.If you're using ListFolderArg.recursive set to true to keep a local cache of the contents of a Dropbox account, iterate through each entry in order and process them as follows to keep your local state in sync:For each FileMetadata, store the new entry at the given path in your local state. If the required parent folders don't exist yet, create them. If there's already something else at the given path, replace it and remove all its children.For each FolderMetadata, store the new entry at the given path in your local state. If the required parent folders don't exist yet, create them. If there's already something else at the given path, replace it but leave the children as they are. Check the new entry's FolderSharingInfo.read_only and set all its children's read-only statuses to match.For each DeletedMetadata, if your local state has something at the given path, remove it and all its children. If there's nothing at the given path, ignore this entry.

```js
dropbox({
    resource: 'files/list_folder',
    parameters: {
        'path': '/Homework/math',
        'recursive': false,
        'include_media_info': false,
        'include_deleted': false,
        'include_has_explicit_shared_members': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/list_folder/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-list_folder-continue))
Once a cursor has been retrieved from [[list_folder](#fileslist_folder-see-docs)](#fileslist_folder-see-docs), use this to paginate through all files and retrieve updates to the folder, following the same rules as documented for list_folder.

```js
dropbox({
    resource: 'files/list_folder/continue',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/list_folder/get_latest_cursor ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-list_folder-get_latest_cursor))
A way to quickly get a cursor for the folder's state. Unlike [list_folder](#fileslist_folder-see-docs), [list_folder/get_latest_cursor](#fileslist_folderget_latest_cursor-see-docs) doesn't return any entries. This endpoint is for app which only needs to know about new files and modifications and doesn't need to know about files that already exist in Dropbox.

```js
dropbox({
    resource: 'files/list_folder/get_latest_cursor',
    parameters: {
        'path': '/Homework/math',
        'recursive': false,
        'include_media_info': false,
        'include_deleted': false,
        'include_has_explicit_shared_members': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/list_folder/longpoll ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-list_folder-longpoll))
A longpoll endpoint to wait for changes on an account. In conjunction with [list_folder/continue](#fileslist_foldercontinue-see-docs), this call gives you a low-latency way to monitor an account for file changes. The connection will block until there are changes available or a timeout occurs. This endpoint is useful mostly for client-side apps. If you're looking for server-side notifications, check out our webhooks documentation.

```js
dropbox({
    resource: 'files/list_folder/longpoll',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu',
        'timeout': 30
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/list_revisions ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-list_revisions))
Return revisions of a file.

```js
dropbox({
    resource: 'files/list_revisions',
    parameters: {
        'path': '/root/word.docx',
        'limit': 10
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/move ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-move))
Move a file or folder to a different location in the user's Dropbox.If the source path is a folder all its contents will be moved.

```js
dropbox({
    resource: 'files/move',
    parameters: {
        'from_path': '/Homework/math',
        'to_path': '/Homework/algebra',
        'allow_shared_folder': false,
        'autorename': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/move_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-move_batch))
Move multiple files or folders to different locations at once in the user's Dropbox.This route is 'all or nothing', which means if one entry fails, the whole transaction will abort.This route will return job ID immediately and do the async moving job in background. Please use [move_batch/check](#filesmove_batchcheck-see-docs) to check the job status.

```js
dropbox({
    resource: 'files/move_batch',
    parameters: {
        'entries': [{
            'from_path': '/Homework/math',
            'to_path': '/Homework/algebra'
        }],
        'allow_shared_folder': false,
        'autorename': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/move_batch/check ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-move_batch-check))
Returns the status of an asynchronous job for [move_batch](#filesmove_batch-see-docs). If success, it returns list of results for each entry.

```js
dropbox({
    resource: 'files/move_batch/check',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/permanently_delete ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-permanently_delete))
Permanently delete the file or folder at a given path (see https://www.dropbox.com/en/help/40).Note: This endpoint is only available for Dropbox Business apps.

```js
dropbox({
    resource: 'files/permanently_delete',
    parameters: {
        'path': '/Homework/math/Prime_Numbers.txt'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/properties/add ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-properties-add))
Add custom properties to a file using a filled property template. See properties/template/add to create new property templates.

```js
dropbox({
    resource: 'files/properties/add',
    parameters: {
        'path': '/my_awesome/word.docx',
        'property_groups': [{
            'template_id': 'ptid:1a5n2i6d3OYEAAAAAAAAAYa',
            'fields': [{
                'name': 'Security Policy',
                'value': 'Confidential'
            }]
        }]
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/properties/overwrite ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-properties-overwrite))
Overwrite custom properties from a specified template associated with a file.

```js
dropbox({
    resource: 'files/properties/overwrite',
    parameters: {
        'path': '/my_awesome/word.docx',
        'property_groups': [{
            'template_id': 'ptid:1a5n2i6d3OYEAAAAAAAAAYa',
            'fields': [{
                'name': 'Security Policy',
                'value': 'Confidential'
            }]
        }]
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/properties/remove ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-properties-remove))
Remove all custom properties from a specified template associated with a file. To remove specific property key value pairs, see [properties/update](#filespropertiesupdate-see-docs). To update a property template, see properties/template/update. Property templates can't be removed once created.

```js
dropbox({
    resource: 'files/properties/remove',
    parameters: {
        'path': '/my_awesome/word.docx',
        'property_template_ids': ['ptid:1a5n2i6d3OYEAAAAAAAAAYa']
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/properties/template/get ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-properties-template-get))
Get the schema for a specified template.

```js
dropbox({
    resource: 'files/properties/template/get',
    parameters: {
        'template_id': 'ptid:1a5n2i6d3OYEAAAAAAAAAYa'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/properties/template/list ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-properties-template-list))
Get the property template identifiers for a user. To get the schema of each template use [properties/template/get](#filespropertiestemplateget-see-docs).

```js
dropbox({
    resource: 'files/properties/template/list'
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/properties/update ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-properties-update))
Add, update or remove custom properties from a specified template associated with a file. Fields that already exist and not described in the request will not be modified.

```js
dropbox({
    resource: 'files/properties/update',
    parameters: {
        'path': '/my_awesome/word.docx',
        'update_property_groups': [{
            'template_id': 'ptid:1a5n2i6d3OYEAAAAAAAAAYa',
            'add_or_update_fields': [{
                'name': 'Security Policy',
                'value': 'Confidential'
            }],
            'remove_fields': []
        }]
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/restore ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-restore))
Restore a file to a specific revision.

```js
dropbox({
    resource: 'files/restore',
    parameters: {
        'path': '/root/word.docx',
        'rev': 'a1c10ce0dd78'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/save_url ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-save_url))
Save a specified URL into a file in user's Dropbox. If the given path already exists, the file will be renamed to avoid the conflict (e.g. myfile (1).txt).

```js
dropbox({
    resource: 'files/save_url',
    parameters: {
        'path': '/a.txt',
        'url': 'http://example.com/a.txt'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/save_url/check_job_status ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-save_url-check_job_status))
Check the status of a [save_url](#filessave_url-see-docs) job.

```js
dropbox({
    resource: 'files/save_url/check_job_status',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/search ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-search))
Searches for files and folders.Note: Recent changes may not immediately be reflected in search results due to a short delay in indexing.

```js
dropbox({
    resource: 'files/search',
    parameters: {
        'path': '',
        'query': 'prime numbers',
        'start': 0,
        'max_results': 100,
        'mode': 'filename'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/upload ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload))
Create a new file with the contents provided in the request.Do not use this to upload a file larger than 150 MB. Instead, create an upload session with [upload_session/start](#filesupload_sessionstart-see-docs).

```js
const stream = dropbox({
    resource: 'files/upload',
    parameters: {
        'path': '/Homework/math/Matrices.txt',
        'mode': 'add',
        'autorename': true,
        'mute': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});

fs.createReadStream('/Homework/math/Matrices.txt').pipe(stream);
```


### files/upload_session/append ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload_session-append))
Append more data to an upload session.A single request should not upload more than 150 MB of file contents.

```js
const stream = dropbox({
    resource: 'files/upload_session/append',
    parameters: {
        'session_id': '1234faaf0678bcde',
        'offset': 0
    }
}, (err, result) => {
    //see docs for `result` parameters
});

fs.createReadStream().pipe(stream);
```


### files/upload_session/append_v2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload_session-append_v2))
Append more data to an upload session.When the parameter close is set, this call will close the session.A single request should not upload more than 150 MB of file contents.

```js
const stream = dropbox({
    resource: 'files/upload_session/append_v2',
    parameters: {
        'cursor': {
            'session_id': '1234faaf0678bcde',
            'offset': 0
        },
        'close': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});

fs.createReadStream().pipe(stream);
```


### files/upload_session/finish ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload_session-finish))
Finish an upload session and save the uploaded data to the given file path.A single request should not upload more than 150 MB of file contents.

```js
const stream = dropbox({
    resource: 'files/upload_session/finish',
    parameters: {
        'cursor': {
            'session_id': '1234faaf0678bcde',
            'offset': 0
        },
        'commit': {
            'path': '/Homework/math/Matrices.txt',
            'mode': 'add',
            'autorename': true,
            'mute': false
        }
    }
}, (err, result) => {
    //see docs for `result` parameters
});

fs.createReadStream().pipe(stream);
```


### files/upload_session/finish_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload_session-finish_batch))
This route helps you commit many files at once into a user's Dropbox. Use [[upload_session/start](#filesupload_sessionstart-see-docs)](#filesupload_sessionstart-see-docs) and [[upload_session/append_v2](#filesupload_sessionappend_v2-see-docs)](#filesupload_sessionappend_v2-see-docs) to upload file contents. We recommend uploading many files in parallel to increase throughput. Once the file contents have been uploaded, rather than calling [upload_session/finish](#filesupload_sessionfinish-see-docs), use this route to finish all your upload sessions in a single request.UploadSessionStartArg.close or UploadSessionAppendArg.close needs to be true for the last upload_session/start or upload_session/append_v2 call.This route will return a job_id immediately and do the async commit job in background. Use [upload_session/finish_batch/check](#filesupload_sessionfinish_batchcheck-see-docs) to check the job status.For the same account, this route should be executed serially. That means you should not start the next job before current job finishes. We allow up to 1000 entries in a single request.

```js
dropbox({
    resource: 'files/upload_session/finish_batch',
    parameters: {
        'entries': [{
            'cursor': {
                'session_id': '1234faaf0678bcde',
                'offset': 0
            },
            'commit': {
                'path': '/Homework/math/Matrices.txt',
                'mode': {
                    '.tag': 'add'
                },
                'autorename': true,
                'mute': false
            }
        }]
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/upload_session/finish_batch/check ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload_session-finish_batch-check))
Returns the status of an asynchronous job for [upload_session/finish_batch](#filesupload_sessionfinish_batch-see-docs). If success, it returns list of result for each entry.

```js
dropbox({
    resource: 'files/upload_session/finish_batch/check',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### files/upload_session/start ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload_session-start))
Upload sessions allow you to upload a single file in one or more requests, for example where the size of the file is greater than 150 MB.  This call starts a new upload session with the given data. You can then use [upload_session/append_v2](#filesupload_sessionappend_v2-see-docs) to add more data and [upload_session/finish](#filesupload_sessionfinish-see-docs) to save all the data to a file in Dropbox.A single request should not upload more than 150 MB of file contents.

```js
const stream = dropbox({
    resource: 'files/upload_session/start',
    parameters: {
        'close': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});

fs.createReadStream().pipe(stream);
```


### paper/docs/archive ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-archive))
Marks the given Paper doc as deleted. This operation is non-destructive and the doc can be revived by the owner.Note: This action can be performed only by the doc owner.

```js
dropbox({
    resource: 'paper/docs/archive',
    parameters: {
        'doc_id': 'uaSvRuxvnkFa12PTkBv5q'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### paper/docs/download ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-download))
Exports and downloads Paper doc either as HTML or markdown.

```js
const stream = dropbox({
    resource: 'paper/docs/download',
    parameters: {
        'doc_id': 'uaSvRuxvnkFa12PTkBv5q',
        'export_format': 'markdown'
    }
}, (err, result) => {
    //see docs for `result` parameters
});

stream
    .pipe(fs.createWriteStream()); //pipe the stream
```


### paper/docs/folder_users/list ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-folder_users-list))
Lists the users who are explicitly invited to the Paper folder in which the Paper doc is contained. For private folders all users (including owner) shared on the folder are listed and for team folders all non-team users shared on the folder are returned.

```js
dropbox({
    resource: 'paper/docs/folder_users/list',
    parameters: {
        'doc_id': 'uaSvRuxvnkFa12PTkBv5q',
        'limit': 100
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### paper/docs/folder_users/list/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-folder_users-list-continue))
Once a cursor has been retrieved from [docs/folder_users/list](#paperdocsfolder_userslist-see-docs), use this to paginate through all users on the Paper folder.

```js
dropbox({
    resource: 'paper/docs/folder_users/list/continue',
    parameters: {
        'doc_id': 'uaSvRuxvnkFa12PTkBv5q',
        'cursor': 'U60b6BxT43ySd5sAVQbbIvoteSnWLjUdLU7aR25hbt3ySd5sAVQbbIvoteSnWLjUd'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### paper/docs/get_folder_info ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-get_folder_info))
Retrieves folder information for the given Paper doc. This includes:  - folder sharing policy; permissions for subfolders are set by the top-level folder.  - full 'filepath', i.e. the list of folders (both folderId and folderName) from the root folder to the folder directly containing the Paper doc.Note: If the Paper doc is not in any folder (aka unfiled) the response will be empty.

```js
dropbox({
    resource: 'paper/docs/get_folder_info',
    parameters: {
        'doc_id': 'uaSvRuxvnkFa12PTkBv5q'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### paper/docs/list ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-list))
Return the list of all Paper docs according to the argument specifications. To iterate over through the full pagination, pass the cursor to [docs/list/continue](#paperdocslistcontinue-see-docs).

```js
dropbox({
    resource: 'paper/docs/list',
    parameters: {
        'filter_by': 'docs_created',
        'sort_by': 'modified',
        'sort_order': 'descending',
        'limit': 100
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### paper/docs/list/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-list-continue))
Once a cursor has been retrieved from [docs/list](#paperdocslist-see-docs), use this to paginate through all Paper doc.

```js
dropbox({
    resource: 'paper/docs/list/continue',
    parameters: {
        'cursor': 'U60b6BxT43ySd5sAVQbbIvoteSnWLjUdLU7aR25hbt3ySd5sAVQbbIvoteSnWLjUd'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### paper/docs/permanently_delete ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-permanently_delete))
Permanently deletes the given Paper doc. This operation is final as the doc cannot be recovered.Note: This action can be performed only by the doc owner.

```js
dropbox({
    resource: 'paper/docs/permanently_delete',
    parameters: {
        'doc_id': 'uaSvRuxvnkFa12PTkBv5q'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### paper/docs/sharing_policy/get ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-sharing_policy-get))
Gets the default sharing policy for the given Paper doc.

```js
dropbox({
    resource: 'paper/docs/sharing_policy/get',
    parameters: {
        'doc_id': 'uaSvRuxvnkFa12PTkBv5q'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### paper/docs/sharing_policy/set ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-sharing_policy-set))
Sets the default sharing policy for the given Paper doc. The default 'team_sharing_policy' can be changed only by teams, omit this field for personal accounts.Note: 'public_sharing_policy' cannot be set to the value 'disabled' because this setting can be changed only via the team admin console.

```js
dropbox({
    resource: 'paper/docs/sharing_policy/set',
    parameters: {
        'doc_id': 'uaSvRuxvnkFa12PTkBv5q',
        'sharing_policy': {
            'public_sharing_policy': 'people_with_link_can_edit',
            'team_sharing_policy': 'people_with_link_can_edit'
        }
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### paper/docs/users/add ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-users-add))
Allows an owner or editor to add users to a Paper doc or change their permissions using their email or Dropbox account id.Note: The Doc owner's permissions cannot be changed.

```js
dropbox({
    resource: 'paper/docs/users/add',
    parameters: {
        'doc_id': 'uaSvRuxvnkFa12PTkBv5q',
        'members': [{
            'member': {
                '.tag': 'email',
                'email': 'justin@example.com'
            },
            'permission_level': {
                '.tag': 'view_and_comment'
            }
        }],
        'custom_message': 'Welcome to Paper.',
        'quiet': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### paper/docs/users/list ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-users-list))
Lists all users who visited the Paper doc or users with explicit access. This call excludes users who have been removed. The list is sorted by the date of the visit or the share date.The list will include both users, the explicitly shared ones as well as those who came in using the Paper url link.

```js
dropbox({
    resource: 'paper/docs/users/list',
    parameters: {
        'doc_id': 'uaSvRuxvnkFa12PTkBv5q',
        'limit': 100,
        'filter_by': 'shared'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### paper/docs/users/list/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-users-list-continue))
Once a cursor has been retrieved from [docs/users/list](#paperdocsuserslist-see-docs), use this to paginate through all users on the Paper doc.

```js
dropbox({
    resource: 'paper/docs/users/list/continue',
    parameters: {
        'doc_id': 'uaSvRuxvnkFa12PTkBv5q',
        'cursor': 'U60b6BxT43ySd5sAVQbbIvoteSnWLjUdLU7aR25hbt3ySd5sAVQbbIvoteSnWLjUd'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### paper/docs/users/remove ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#paper-docs-users-remove))
Allows an owner or editor to remove users from a Paper doc using their email or Dropbox account id.Note: Doc owner cannot be removed.

```js
dropbox({
    resource: 'paper/docs/users/remove',
    parameters: {
        'doc_id': 'uaSvRuxvnkFa12PTkBv5q',
        'member': {
            '.tag': 'email',
            'email': 'justin@example.com'
        }
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/add_file_member ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-add_file_member))
Adds specified members to a file.

```js
dropbox({
    resource: 'sharing/add_file_member',
    parameters: {
        'file': 'id:3kmLmQFnf1AAAAAAAAAAAw',
        'members': [{
            '.tag': 'email',
            'email': 'justin@example.com'
        }],
        'custom_message': 'This is a custom message about ACME.doc',
        'quiet': false,
        'access_level': 'viewer',
        'add_message_as_comment': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/add_folder_member ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-add_folder_member))
Allows an owner or editor (if the ACL update policy allows) of a shared folder to add another member.For the new member to get access to all the functionality for this folder, you will need to call [mount_folder](#sharingmount_folder-see-docs) on their behalf.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/add_folder_member',
    parameters: {
        'shared_folder_id': '84528192421',
        'members': [{
            'member': {
                '.tag': 'email',
                'email': 'justin@example.com'
            },
            'access_level': {
                '.tag': 'editor'
            }
        }, {
            'member': {
                '.tag': 'dropbox_id',
                'dropbox_id': 'dbid:AAEufNrMPSPe0dMQijRP0N_aZtBJRm26W4Q'
            },
            'access_level': {
                '.tag': 'viewer'
            }
        }],
        'quiet': false,
        'custom_message': 'Documentation for launch day'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/change_file_member_access ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-change_file_member_access))
Identical to update_file_member but with less information returned.

```js
dropbox({
    resource: 'sharing/change_file_member_access',
    parameters: {
        'file': 'id:3kmLmQFnf1AAAAAAAAAAAw',
        'member': {
            '.tag': 'email',
            'email': 'justin@example.com'
        },
        'access_level': 'viewer'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/check_job_status ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-check_job_status))
Returns the status of an asynchronous job.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/check_job_status',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/check_remove_member_job_status ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-check_remove_member_job_status))
Returns the status of an asynchronous job for sharing a folder.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/check_remove_member_job_status',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/check_share_job_status ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-check_share_job_status))
Returns the status of an asynchronous job for sharing a folder.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/check_share_job_status',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/create_shared_link ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-create_shared_link))
Create a shared link.If a shared link already exists for the given path, that link is returned.Note that in the returned PathLinkMetadata, the PathLinkMetadata.url field is the shortened URL if CreateSharedLinkArg.short_url argument is set to true.Previously, it was technically possible to break a shared link by moving or renaming the corresponding file or folder. In the future, this will no longer be the case, so your app shouldn't rely on this behavior. Instead, if your app needs to revoke a shared link, use [revoke_shared_link](#sharingrevoke_shared_link-see-docs).

```js
dropbox({
    resource: 'sharing/create_shared_link',
    parameters: {
        'path': '/Homework/Math/Prime_Numbers.txt',
        'short_url': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/create_shared_link_with_settings ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-create_shared_link_with_settings))
Create a shared link with custom settings. If no settings are given then the default visibility is RequestedVisibility.public (The resolved visibility, though, may depend on other aspects such as team and shared folder settings).

```js
dropbox({
    resource: 'sharing/create_shared_link_with_settings',
    parameters: {
        'path': '/Prime_Numbers.txt',
        'settings': {
            'requested_visibility': 'public'
        }
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/get_file_metadata ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-get_file_metadata))
Returns shared file metadata.

```js
dropbox({
    resource: 'sharing/get_file_metadata',
    parameters: {
        'file': 'id:3kmLmQFnf1AAAAAAAAAAAw',
        'actions': []
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/get_file_metadata/batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-get_file_metadata-batch))
Returns shared file metadata.

```js
dropbox({
    resource: 'sharing/get_file_metadata/batch',
    parameters: {
        'files': ['id:3kmLmQFnf1AAAAAAAAAAAw', 'id:VvTaJu2VZzAAAAAAAAAADQ'],
        'actions': []
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/get_folder_metadata ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-get_folder_metadata))
Returns shared folder metadata by its folder ID.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/get_folder_metadata',
    parameters: {
        'shared_folder_id': '84528192421',
        'actions': []
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/get_shared_link_file ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-get_shared_link_file))
Download the shared link's file from a user's Dropbox.

```js
const stream = dropbox({
    resource: 'sharing/get_shared_link_file',
    parameters: {
        'url': 'https://www.dropbox.com/s/2sn712vy1ovegw8/Prime_Numbers.txt?dl=0',
        'path': '/Prime_Numbers.txt'
    }
}, (err, result) => {
    //see docs for `result` parameters
});

stream
    .pipe(fs.createWriteStream('/Prime_Numbers.txt')); //pipe the stream
```


### sharing/get_shared_link_metadata ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-get_shared_link_metadata))
Get the shared link's metadata.

```js
dropbox({
    resource: 'sharing/get_shared_link_metadata',
    parameters: {
        'url': 'https://www.dropbox.com/s/2sn712vy1ovegw8/Prime_Numbers.txt?dl=0',
        'path': '/Prime_Numbers.txt'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/get_shared_links ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-get_shared_links))
Returns a list of LinkMetadata objects for this user, including collection links.If no path is given, returns a list of all shared links for the current user, including collection links.If a non-empty path is given, returns a list of all shared links that allow access to the given path.  Collection links are never returned in this case.Note that the url field in the response is never the shortened URL.

```js
dropbox({
    resource: 'sharing/get_shared_links',
    parameters: {
        'path': ''
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/list_file_members ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_file_members))
Use to obtain the members who have been invited to a file, both inherited and uninherited members.

```js
dropbox({
    resource: 'sharing/list_file_members',
    parameters: {
        'file': 'id:3kmLmQFnf1AAAAAAAAAAAw',
        'include_inherited': true,
        'limit': 100
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/list_file_members/batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_file_members-batch))
Get members of multiple files at once. The arguments to this route are more limited, and the limit on query result size per file is more strict. To customize the results more, use the individual file endpoint.Inherited users and groups are not included in the result, and permissions are not returned for this endpoint.

```js
dropbox({
    resource: 'sharing/list_file_members/batch',
    parameters: {
        'files': ['id:3kmLmQFnf1AAAAAAAAAAAw', 'id:VvTaJu2VZzAAAAAAAAAADQ'],
        'limit': 10
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/list_file_members/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_file_members-continue))
Once a cursor has been retrieved from [list_file_members](#sharinglist_file_members-see-docs) or [list_file_members/batch](#sharinglist_file_membersbatch-see-docs), use this to paginate through all shared file members.

```js
dropbox({
    resource: 'sharing/list_file_members/continue',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/list_folder_members ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_folder_members))
Returns shared folder membership by its folder ID.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/list_folder_members',
    parameters: {
        'shared_folder_id': '84528192421',
        'actions': [],
        'limit': 10
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/list_folder_members/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_folder_members-continue))
Once a cursor has been retrieved from [list_folder_members](#sharinglist_folder_members-see-docs), use this to paginate through all shared folder members.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/list_folder_members/continue',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/list_folders ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_folders))
Return the list of all shared folders the current user has access to.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/list_folders',
    parameters: {
        'limit': 100,
        'actions': []
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/list_folders/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_folders-continue))
Once a cursor has been retrieved from [[list_folders](#sharinglist_folders-see-docs)](#sharinglist_folders-see-docs), use this to paginate through all shared folders. The cursor must come from a previous call to list_folders or [list_folders/continue](#sharinglist_folderscontinue-see-docs).Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/list_folders/continue',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/list_mountable_folders ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_mountable_folders))
Return the list of all shared folders the current user can mount or unmount.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/list_mountable_folders',
    parameters: {
        'limit': 100,
        'actions': []
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/list_mountable_folders/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_mountable_folders-continue))
Once a cursor has been retrieved from [[list_mountable_folders](#sharinglist_mountable_folders-see-docs)](#sharinglist_mountable_folders-see-docs), use this to paginate through all mountable shared folders. The cursor must come from a previous call to list_mountable_folders or [list_mountable_folders/continue](#sharinglist_mountable_folderscontinue-see-docs).Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/list_mountable_folders/continue',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/list_received_files ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_received_files))
Returns a list of all files shared with current user. Does not include files the user has received via shared folders, and does  not include unclaimed invitations.

```js
dropbox({
    resource: 'sharing/list_received_files',
    parameters: {
        'limit': 100,
        'actions': []
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/list_received_files/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_received_files-continue))
Get more results with a cursor from [list_received_files](#sharinglist_received_files-see-docs).

```js
dropbox({
    resource: 'sharing/list_received_files/continue',
    parameters: {
        'cursor': 'AzJJbGlzdF90eXBdofe9c3RPbGlzdGFyZ3NfYnlfZ2lkMRhcbric7Rdog9emfGRlc2MCRWxpbWl0BGRId'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/list_shared_links ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_shared_links))
List shared links of this user.If no path is given, returns a list of all shared links for the current user.If a non-empty path is given, returns a list of all shared links that allow access to the given path - direct links to the given path and links to parent folders of the given path. Links to parent folders can be suppressed by setting direct_only to true.

```js
dropbox({
    resource: 'sharing/list_shared_links',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/modify_shared_link_settings ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-modify_shared_link_settings))
Modify the shared link's settings.If the requested visibility conflict with the shared links policy of the team or the shared folder (in case the linked file is part of a shared folder) then the LinkPermissions.resolved_visibility of the returned SharedLinkMetadata will reflect the actual visibility of the shared link and the LinkPermissions.requested_visibility will reflect the requested visibility.

```js
dropbox({
    resource: 'sharing/modify_shared_link_settings',
    parameters: {
        'url': 'https://www.dropbox.com/s/2sn712vy1ovegw8/Prime_Numbers.txt?dl=0',
        'settings': {
            'requested_visibility': 'public'
        },
        'remove_expiration': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/mount_folder ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-mount_folder))
The current user mounts the designated folder.Mount a shared folder for a user after they have been added as a member. Once mounted, the shared folder will appear in their Dropbox.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/mount_folder',
    parameters: {
        'shared_folder_id': '84528192421'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/relinquish_file_membership ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-relinquish_file_membership))
The current user relinquishes their membership in the designated file. Note that the current user may still have inherited access to this file through the parent folder.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/relinquish_file_membership',
    parameters: {
        'file': 'id:3kmLmQFnf1AAAAAAAAAAAw'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/relinquish_folder_membership ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-relinquish_folder_membership))
The current user relinquishes their membership in the designated shared folder and will no longer have access to the folder.  A folder owner cannot relinquish membership in their own folder.This will run synchronously if leave_a_copy is false, and asynchronously if leave_a_copy is true. Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/relinquish_folder_membership',
    parameters: {
        'shared_folder_id': '84528192421',
        'leave_a_copy': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/remove_file_member ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-remove_file_member))
Identical to remove_file_member_2 but with less information returned.

```js
dropbox({
    resource: 'sharing/remove_file_member',
    parameters: {
        'file': 'id:3kmLmQFnf1AAAAAAAAAAAw',
        'member': {
            '.tag': 'email',
            'email': 'justin@example.com'
        }
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/remove_file_member_2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-remove_file_member_2))
Removes a specified member from the file.

```js
dropbox({
    resource: 'sharing/remove_file_member_2',
    parameters: {
        'file': 'id:3kmLmQFnf1AAAAAAAAAAAw',
        'member': {
            '.tag': 'email',
            'email': 'justin@example.com'
        }
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/remove_folder_member ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-remove_folder_member))
Allows an owner or editor (if the ACL update policy allows) of a shared folder to remove another member.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/remove_folder_member',
    parameters: {
        'shared_folder_id': '84528192421',
        'member': {
            '.tag': 'email',
            'email': 'justin@example.com'
        },
        'leave_a_copy': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/revoke_shared_link ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-revoke_shared_link))
Revoke a shared link.Note that even after revoking a shared link to a file, the file may be accessible if there are shared links leading to any of the file parent folders. To list all shared links that enable access to a specific file, you can use the [list_shared_links](#sharinglist_shared_links-see-docs) with the file as the ListSharedLinksArg.path argument.

```js
dropbox({
    resource: 'sharing/revoke_shared_link',
    parameters: {
        'url': 'https://www.dropbox.com/s/2sn712vy1ovegw8/Prime_Numbers.txt?dl=0'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/share_folder ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-share_folder))
Share a folder with collaborators.Most sharing will be completed synchronously. Large folders will be completed asynchronously. To make testing the async case repeatable, set `ShareFolderArg.force_async`.If a ShareFolderLaunch.async_job_id is returned, you'll need to call [check_share_job_status](#sharingcheck_share_job_status-see-docs) until the action completes to get the metadata for the folder.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/share_folder',
    parameters: {
        'path': '/example/workspace',
        'member_policy': 'team',
        'acl_update_policy': 'editors',
        'shared_link_policy': 'members',
        'force_async': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/transfer_folder ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-transfer_folder))
Transfer ownership of a shared folder to a member of the shared folder.User must have AccessLevel.owner access to the shared folder to perform a transfer.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/transfer_folder',
    parameters: {
        'shared_folder_id': '84528192421',
        'to_dropbox_id': 'dbid:AAEufNrMPSPe0dMQijRP0N_aZtBJRm26W4Q'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/unmount_folder ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-unmount_folder))
The current user unmounts the designated folder. They can re-mount the folder at a later time using [mount_folder](#sharingmount_folder-see-docs).Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/unmount_folder',
    parameters: {
        'shared_folder_id': '84528192421'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/unshare_file ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-unshare_file))
Remove all members from this file. Does not remove inherited members.

```js
dropbox({
    resource: 'sharing/unshare_file',
    parameters: {
        'file': 'id:3kmLmQFnf1AAAAAAAAAAAw'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/unshare_folder ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-unshare_folder))
Allows a shared folder owner to unshare the folder.You'll need to call [check_job_status](#sharingcheck_job_status-see-docs) to determine if the action has completed successfully.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/unshare_folder',
    parameters: {
        'shared_folder_id': '84528192421',
        'leave_a_copy': false
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/update_file_member ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-update_file_member))
Changes a member's access on a shared file.

```js
dropbox({
    resource: 'sharing/update_file_member',
    parameters: {
        'file': 'id:3kmLmQFnf1AAAAAAAAAAAw',
        'member': {
            '.tag': 'email',
            'email': 'justin@example.com'
        },
        'access_level': 'viewer'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/update_folder_member ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-update_folder_member))
Allows an owner or editor of a shared folder to update another member's permissions.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/update_folder_member',
    parameters: {
        'shared_folder_id': '84528192421',
        'member': {
            '.tag': 'email',
            'email': 'justin@example.com'
        },
        'access_level': 'editor'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### sharing/update_folder_policy ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-update_folder_policy))
Update the sharing policies for a shared folder.User must have AccessLevel.owner access to the shared folder to update its policies.Apps must have full Dropbox access to use this endpoint.

```js
dropbox({
    resource: 'sharing/update_folder_policy',
    parameters: {
        'shared_folder_id': '84528192421',
        'member_policy': 'team',
        'acl_update_policy': 'owner',
        'shared_link_policy': 'members'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### users/get_account ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#users-get_account))
Get information about a user's account.

```js
dropbox({
    resource: 'users/get_account',
    parameters: {
        'account_id': 'dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc'
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### users/get_account_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#users-get_account_batch))
Get information about multiple user accounts.  At most 300 accounts may be queried per request.

```js
dropbox({
    resource: 'users/get_account_batch',
    parameters: {
        'account_ids': ['dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc', 'dbid:AAH1Vcz-DVoRDeixtr_OA8oUGgiqhs4XPOQ']
    }
}, (err, result) => {
    //see docs for `result` parameters
});
```


### users/get_current_account ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#users-get_current_account))
Get information about the current user's account.

```js
dropbox({
    resource: 'users/get_current_account'
}, (err, result) => {
    //see docs for `result` parameters
});
```


### users/get_space_usage ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#users-get_space_usage))
Get the space usage information for the current user's account.

```js
dropbox({
    resource: 'users/get_space_usage'
}, (err, result) => {
    //see docs for `result` parameters
});
```
