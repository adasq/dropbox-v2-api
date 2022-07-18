
### account/set_profile_photo ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#account-set_profile_photo))
Sets a user's profile photo.

```js
dropbox({
    resource: 'account/set_profile_photo',
    parameters: {
        'photo': {
            '.tag': 'base64_data',
            'base64_data': 'SW1hZ2UgZGF0YSBpbiBiYXNlNjQtZW5jb2RlZCBieXRlcy4gTm90IGEgdmFsaWQgZXhhbXBsZS4='
        }
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### auth/token/from_oauth1 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#auth-token-from_oauth1))
Creates an OAuth 2.0 access token from the supplied OAuth 1.0 access token.

```js
dropbox({
    resource: 'auth/token/from_oauth1',
    parameters: {
        'oauth1_token': 'qievr8hamyg6ndck',
        'oauth1_token_secret': 'qomoftv0472git7'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### auth/token/revoke ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#auth-token-revoke))
Disables the access token used to authenticate the call. If there is a corresponding refresh token for the access token, this disables that refresh token, as well as any other access tokens for that refresh token.

```js
dropbox({
    resource: 'auth/token/revoke'
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### check/app ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#check-app))
This endpoint performs App Authentication, validating the supplied app key and secret, and returns the supplied string, to allow you to test your code and connection to the Dropbox API. It has no other effect. If you receive an HTTP 200 response with the supplied query, it indicates at least part of the Dropbox API infrastructure is working and that the app key and secret valid.

```js
dropbox({
    resource: 'check/app',
    parameters: {
        'query': 'foo'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### check/user ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#check-user))
This endpoint performs User Authentication, validating the supplied access token, and returns the supplied string, to allow you to test your code and connection to the Dropbox API. It has no other effect. If you receive an HTTP 200 response with the supplied query, it indicates at least part of the Dropbox API infrastructure is working and that the access token is valid.

```js
dropbox({
    resource: 'check/user',
    parameters: {
        'query': 'foo'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### contacts/delete_manual_contacts ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#contacts-delete_manual_contacts))
Removes all manually added contacts. You'll still keep contacts who are on your team or who you imported. New contacts will be added when you share.

```js
dropbox({
    resource: 'contacts/delete_manual_contacts'
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### contacts/delete_manual_contacts_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#contacts-delete_manual_contacts_batch))
Removes manually added contacts from the given list.

```js
dropbox({
    resource: 'contacts/delete_manual_contacts_batch',
    parameters: {
        'email_addresses': ['contactemailaddress1@domain.com', 'contactemailaddress2@domain.com']
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_properties/properties/add ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_properties-properties-add))
Add property groups to a Dropbox file. See :route:`templates/add_for_user` or :route:`templates/add_for_team` to create new templates.

```js
dropbox({
    resource: 'file_properties/properties/add',
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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_properties/properties/overwrite ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_properties-properties-overwrite))
Overwrite property groups associated with a file. This endpoint should be used instead of :route:`properties/update` when property groups are being updated via a "snapshot" instead of via a "delta". In other words, this endpoint will delete all omitted fields from a property group, whereas :route:`properties/update` will only delete fields that are explicitly marked for deletion.

```js
dropbox({
    resource: 'file_properties/properties/overwrite',
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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_properties/properties/remove ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_properties-properties-remove))
Permanently removes the specified property group from the file. To remove specific property field key value pairs, see :route:`properties/update`. To update a template, see :route:`templates/update_for_user` or :route:`templates/update_for_team`. To remove a template, see :route:`templates/remove_for_user` or :route:`templates/remove_for_team`.

```js
dropbox({
    resource: 'file_properties/properties/remove',
    parameters: {
        'path': '/my_awesome/word.docx',
        'property_template_ids': ['ptid:1a5n2i6d3OYEAAAAAAAAAYa']
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_properties/properties/search ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_properties-properties-search))
Search across property templates for particular property field values.

```js
dropbox({
    resource: 'file_properties/properties/search',
    parameters: {
        'queries': [{
            'query': 'Confidential',
            'mode': {
                '.tag': 'field_name',
                'field_name': 'Security'
            },
            'logical_operator': 'or_operator'
        }],
        'template_filter': 'filter_none'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_properties/properties/search/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_properties-properties-search-continue))
Once a cursor has been retrieved from :route:`properties/search`, use this to paginate through all search results.

```js
dropbox({
    resource: 'file_properties/properties/search/continue',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_properties/properties/update ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_properties-properties-update))
Add, update or remove properties associated with the supplied file and templates. This endpoint should be used instead of :route:`properties/overwrite` when property groups are being updated via a "delta" instead of via a "snapshot" . In other words, this endpoint will not delete any omitted fields from a property group, whereas :route:`properties/overwrite` will delete any fields that are omitted from a property group.

```js
dropbox({
    resource: 'file_properties/properties/update',
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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_properties/templates/add_for_user ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_properties-templates-add_for_user))
Add a template associated with a user. See :route:`properties/add` to add properties to a file. This endpoint can't be called on a team member or admin's behalf.

```js
dropbox({
    resource: 'file_properties/templates/add_for_user',
    parameters: {
        'name': 'Security',
        'description': 'These properties describe how confidential this file or folder is.',
        'fields': [{
            'name': 'Security Policy',
            'description': 'This is the security policy of the file or folder described.\nPolicies can be Confidential, Public or Internal.',
            'type': 'string'
        }]
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_properties/templates/get_for_user ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_properties-templates-get_for_user))
Get the schema for a specified template. This endpoint can't be called on a team member or admin's behalf.

```js
dropbox({
    resource: 'file_properties/templates/get_for_user',
    parameters: {
        'template_id': 'ptid:1a5n2i6d3OYEAAAAAAAAAYa'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_properties/templates/list_for_user ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_properties-templates-list_for_user))
Get the template identifiers for a team. To get the schema of each template use :route:`templates/get_for_user`. This endpoint can't be called on a team member or admin's behalf.

```js
dropbox({
    resource: 'file_properties/templates/list_for_user'
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_properties/templates/remove_for_user ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_properties-templates-remove_for_user))
Permanently removes the specified template created from :route:`templates/add_for_user`. All properties associated with the template will also be removed. This action cannot be undone.

```js
dropbox({
    resource: 'file_properties/templates/remove_for_user',
    parameters: {
        'template_id': 'ptid:1a5n2i6d3OYEAAAAAAAAAYa'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_properties/templates/update_for_user ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_properties-templates-update_for_user))
Update a template associated with a user. This route can update the template name, the template description and add optional properties to templates. This endpoint can't be called on a team member or admin's behalf.

```js
dropbox({
    resource: 'file_properties/templates/update_for_user',
    parameters: {
        'template_id': 'ptid:1a5n2i6d3OYEAAAAAAAAAYa',
        'name': 'New Security Template Name',
        'description': 'These properties will describe how confidential this file or folder is.',
        'add_fields': [{
            'name': 'Security Policy',
            'description': 'This is the security policy of the file or folder described.\nPolicies can be Confidential, Public or Internal.',
            'type': 'string'
        }]
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_requests/count ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_requests-count))
Returns the total number of file requests owned by this user. Includes both open and closed file requests.

```js
dropbox({
    resource: 'file_requests/count'
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_requests/create ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_requests-create))
Creates a file request for this user.

```js
dropbox({
    resource: 'file_requests/create',
    parameters: {
        'title': 'Homework submission',
        'destination': '/File Requests/Homework',
        'deadline': {
            'deadline': '2020-10-12T17:00:00Z',
            'allow_late_uploads': 'seven_days'
        },
        'open': true
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_requests/delete ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_requests-delete))
Delete a batch of closed file requests.

```js
dropbox({
    resource: 'file_requests/delete',
    parameters: {
        'ids': ['oaCAVmEyrqYnkZX9955Y', 'BaZmehYoXMPtaRmfTbSG']
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_requests/delete_all_closed ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_requests-delete_all_closed))
Delete all closed file requests owned by this user.

```js
dropbox({
    resource: 'file_requests/delete_all_closed'
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_requests/get ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_requests-get))
Returns the specified file request.

```js
dropbox({
    resource: 'file_requests/get',
    parameters: {
        'id': 'oaCAVmEyrqYnkZX9955Y'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_requests/list ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_requests-list))
Returns a list of file requests owned by this user. For apps with the app folder permission, this will only return file requests with destinations in the app folder.

```js
dropbox({
    resource: 'file_requests/list'
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_requests/list_v2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_requests-list_v2))
Returns a list of file requests owned by this user. For apps with the app folder permission, this will only return file requests with destinations in the app folder.

```js
dropbox({
    resource: 'file_requests/list_v2',
    parameters: {
        'limit': 1000
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_requests/list/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_requests-list-continue))
Once a cursor has been retrieved from :route:`list:2`, use this to paginate through all file requests. The cursor must come from a previous call to :route:`list:2` or :route:`list/continue`.

```js
dropbox({
    resource: 'file_requests/list/continue',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### file_requests/update ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#file_requests-update))
Update a file request.

```js
dropbox({
    resource: 'file_requests/update',
    parameters: {
        'id': 'oaCAVmEyrqYnkZX9955Y',
        'title': 'Homework submission',
        'destination': '/File Requests/Homework',
        'deadline': {
            '.tag': 'update',
            'deadline': '2020-10-12T17:00:00Z',
            'allow_late_uploads': 'seven_days'
        },
        'open': true
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/copy ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-copy))
Copy a file or folder to a different location in the user's Dropbox.
If the source path is a folder all its contents will be copied.

```js
dropbox({
    resource: 'files/copy',
    parameters: {
        'from_path': '/Homework/math',
        'to_path': '/Homework/algebra',
        'allow_shared_folder': false,
        'autorename': false,
        'allow_ownership_transfer': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/copy_v2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-copy_v2))
Copy a file or folder to a different location in the user's Dropbox.
If the source path is a folder all its contents will be copied.

```js
dropbox({
    resource: 'files/copy_v2',
    parameters: {
        'from_path': '/Homework/math',
        'to_path': '/Homework/algebra',
        'allow_shared_folder': false,
        'autorename': false,
        'allow_ownership_transfer': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/copy_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-copy_batch))
Copy multiple files or folders to different locations at once in the user's Dropbox.
This route will return job ID immediately and do the async copy job in background. Please use :route:`copy_batch/check:1` to check the job status.

```js
dropbox({
    resource: 'files/copy_batch',
    parameters: {
        'entries': [{
            'from_path': '/Homework/math',
            'to_path': '/Homework/algebra'
        }],
        'autorename': false,
        'allow_shared_folder': false,
        'allow_ownership_transfer': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/copy_batch_v2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-copy_batch_v2))
Copy multiple files or folders to different locations at once in the user's Dropbox.
This route will replace :route:`copy_batch:1`. The main difference is this route will return status for each entry, while :route:`copy_batch:1` raises failure if any entry fails.
This route will either finish synchronously, or return a job ID and do the async copy job in background. Please use :route:`copy_batch/check:2` to check the job status.

```js
dropbox({
    resource: 'files/copy_batch_v2',
    parameters: {
        'entries': [{
            'from_path': '/Homework/math',
            'to_path': '/Homework/algebra'
        }],
        'autorename': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/copy_batch/check ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-copy_batch-check))
Returns the status of an asynchronous job for :route:`copy_batch:1`. If success, it returns list of results for each entry.

```js
dropbox({
    resource: 'files/copy_batch/check',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/copy_batch/check_v2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-copy_batch-check_v2))
Returns the status of an asynchronous job for :route:`copy_batch:2`. It returns list of results for each entry.

```js
dropbox({
    resource: 'files/copy_batch/check_v2',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/copy_reference/get ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-copy_reference-get))
Get a copy reference to a file or folder. This reference string can be used to save that file or folder to another user's Dropbox by passing it to :route:`copy_reference/save`.

```js
dropbox({
    resource: 'files/copy_reference/get',
    parameters: {
        'path': '/video.mp4'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/copy_reference/save ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-copy_reference-save))
Save a copy reference returned by :route:`copy_reference/get` to the user's Dropbox.

```js
dropbox({
    resource: 'files/copy_reference/save',
    parameters: {
        'copy_reference': 'z1X6ATl6aWtzOGq0c3g5Ng',
        'path': '/video.mp4'
    }
}, (err, result, response) => {
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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/create_folder_v2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-create_folder_v2))
Create a folder at a given path.

```js
dropbox({
    resource: 'files/create_folder_v2',
    parameters: {
        'path': '/Homework/math',
        'autorename': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/create_folder_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-create_folder_batch))
Create multiple folders at once.
This route is asynchronous for large batches, which returns a job ID immediately and runs the create folder batch asynchronously. Otherwise, creates the folders and returns the result synchronously for smaller inputs. You can force asynchronous behaviour by using the :field:`CreateFolderBatchArg.force_async` flag.  Use :route:`create_folder_batch/check` to check the job status.

```js
dropbox({
    resource: 'files/create_folder_batch',
    parameters: {
        'paths': ['/Homework/math'],
        'autorename': false,
        'force_async': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/create_folder_batch/check ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-create_folder_batch-check))
Returns the status of an asynchronous job for :route:`create_folder_batch`. If success, it returns list of result for each entry.

```js
dropbox({
    resource: 'files/create_folder_batch/check',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/delete ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-delete))
Delete the file or folder at a given path.
If the path is a folder, all its contents will be deleted too.
A successful response indicates that the file or folder was deleted. The returned metadata will be the corresponding :type:`FileMetadata` or :type:`FolderMetadata` for the item at time of deletion, and not a :type:`DeletedMetadata` object.

```js
dropbox({
    resource: 'files/delete',
    parameters: {
        'path': '/Homework/math/Prime_Numbers.txt'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/delete_v2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-delete_v2))
Delete the file or folder at a given path.
If the path is a folder, all its contents will be deleted too.
A successful response indicates that the file or folder was deleted. The returned metadata will be the corresponding :type:`FileMetadata` or :type:`FolderMetadata` for the item at time of deletion, and not a :type:`DeletedMetadata` object.

```js
dropbox({
    resource: 'files/delete_v2',
    parameters: {
        'path': '/Homework/math/Prime_Numbers.txt'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/delete_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-delete_batch))
Delete multiple files/folders at once.
This route is asynchronous, which returns a job ID immediately and runs the delete batch asynchronously. Use :route:`delete_batch/check` to check the job status.

```js
dropbox({
    resource: 'files/delete_batch',
    parameters: {
        'entries': [{
            'path': '/Homework/math/Prime_Numbers.txt'
        }]
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/delete_batch/check ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-delete_batch-check))
Returns the status of an asynchronous job for :route:`delete_batch`. If success, it returns list of result for each entry.

```js
dropbox({
    resource: 'files/delete_batch/check',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result, response) => {
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
}, (err, result, response) => {
    //see docs for `result` parameters
});

stream
    .pipe(fs.createWriteStream('/Homework/math/Prime_Numbers.txt')); //pipe the stream
```


### files/download_zip ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-download_zip))
Download a folder from the user's Dropbox, as a zip file. The folder must be less than 20 GB in size and any single file within must be less than 4 GB in size. The resulting zip must have fewer than 10,000 total file and folder entries, including the top level folder. The input cannot be a single file.
Note: this endpoint does not support HTTP range requests.

```js
const stream = dropbox({
    resource: 'files/download_zip',
    parameters: {
        'path': '/Homework/math'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});

stream
    .pipe(fs.createWriteStream('/Homework/math')); //pipe the stream
```


### files/export ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-export))
Export a file from a user's Dropbox. This route only supports exporting files that cannot be downloaded directly  and whose :field:`ExportResult.file_metadata` has :field:`ExportInfo.export_as` populated.

```js
const stream = dropbox({
    resource: 'files/export',
    parameters: {
        'path': '/Homework/math/Prime_Numbers.gsheet'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});

stream
    .pipe(fs.createWriteStream('/Homework/math/Prime_Numbers.gsheet')); //pipe the stream
```


### files/get_file_lock_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-get_file_lock_batch))
Return the lock metadata for the given list of paths.

```js
dropbox({
    resource: 'files/get_file_lock_batch',
    parameters: {
        'entries': [{
            'path': '/John Doe/sample/test.pdf'
        }]
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/get_metadata ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-get_metadata))
Returns the metadata for a file or folder.
Note: Metadata for the root folder is unsupported.

```js
dropbox({
    resource: 'files/get_metadata',
    parameters: {
        'path': '/Homework/math',
        'include_media_info': false,
        'include_deleted': false,
        'include_has_explicit_shared_members': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/get_preview ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-get_preview))
Get a preview for a file.
Currently, PDF previews are generated for files with the following extensions: .ai, .doc, .docm, .docx, .eps, .gdoc, .gslides, .odp, .odt, .pps, .ppsm, .ppsx, .ppt, .pptm, .pptx, .rtf.
HTML previews are generated for files with the following extensions: .csv, .ods, .xls, .xlsm, .gsheet, .xlsx.
Other formats will return an unsupported extension error.

```js
const stream = dropbox({
    resource: 'files/get_preview',
    parameters: {
        'path': '/word.docx'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});

stream
    .pipe(fs.createWriteStream('/word.docx')); //pipe the stream
```


### files/get_temporary_link ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-get_temporary_link))
Get a temporary link to stream content of a file. This link will expire in four hours and afterwards you will get 410 Gone. This URL should not be used to display content directly in the browser. The Content-Type of the link is determined automatically by the file's mime type.

```js
dropbox({
    resource: 'files/get_temporary_link',
    parameters: {
        'path': '/video.mp4'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/get_temporary_upload_link ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-get_temporary_upload_link))
Get a one-time use temporary upload link to upload a file to a Dropbox location.

This endpoint acts as a delayed :route:`upload`. The returned temporary upload link may be used to make a POST request with the data to be uploaded. The upload will then be perfomed with the :type:`CommitInfo` previously provided to :route:`get_temporary_upload_link` but evaluated only upon consumption. Hence, errors stemming from invalid :type:`CommitInfo` with respect to the state of the user's Dropbox will only be communicated at consumption time. Additionally, these errors are surfaced as generic HTTP 409 Conflict responses, potentially hiding issue details. The maximum temporary upload link duration is 4 hours. Upon consumption or expiration, a new link will have to be generated. Multiple links may exist for a specific upload path at any given time.

The POST request on the temporary upload link must have its Content-Type set to "application/octet-stream".

Example temporary upload link consumption request:

curl -X POST https://content.dropboxapi.com/apitul/1/bNi2uIYF51cVBND
--header "Content-Type: application/octet-stream"
--data-binary @local_file.txt

A successful temporary upload link consumption request returns the content hash of the uploaded data in JSON format.

Example successful temporary upload link consumption response:
{"content-hash": "599d71033d700ac892a0e48fa61b125d2f5994"}

An unsuccessful temporary upload link consumption request returns any of the following status codes:

HTTP 400 Bad Request: Content-Type is not one of application/octet-stream and text/plain or request is invalid.
HTTP 409 Conflict: The temporary upload link does not exist or is currently unavailable, the upload failed, or another error happened.
HTTP 410 Gone: The temporary upload link is expired or consumed.

Example unsuccessful temporary upload link consumption response:
Temporary upload link has been recently consumed.

```js
dropbox({
    resource: 'files/get_temporary_upload_link',
    parameters: {
        'commit_info': {
            'path': '/Homework/math/Matrices.txt',
            'mode': 'add',
            'autorename': true,
            'mute': false,
            'strict_conflict': false
        },
        'duration': 3600
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/get_thumbnail ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-get_thumbnail))
Get a thumbnail for an image.
This method currently supports files with the following file extensions: jpg, jpeg, png, tiff, tif, gif, webp, ppm and bmp. Photos that are larger than 20MB in size won't be converted to a thumbnail.

```js
const stream = dropbox({
    resource: 'files/get_thumbnail',
    parameters: {
        'path': '/image.jpg',
        'format': 'jpeg',
        'size': 'w64h64',
        'mode': 'strict'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});

stream
    .pipe(fs.createWriteStream('/image.jpg')); //pipe the stream
```


### files/get_thumbnail_v2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-get_thumbnail_v2))
Get a thumbnail for an image.
This method currently supports files with the following file extensions: jpg, jpeg, png, tiff, tif, gif, webp, ppm and bmp. Photos that are larger than 20MB in size won't be converted to a thumbnail.

```js
const stream = dropbox({
    resource: 'files/get_thumbnail_v2',
    parameters: {
        'resource': {
            '.tag': 'path',
            'path': '/a.docx'
        },
        'format': 'jpeg',
        'size': 'w64h64',
        'mode': 'strict'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});

stream
    .pipe(fs.createWriteStream()); //pipe the stream
```


### files/get_thumbnail_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-get_thumbnail_batch))
Get thumbnails for a list of images. We allow up to 25 thumbnails in a single batch.
This method currently supports files with the following file extensions: jpg, jpeg, png, tiff, tif, gif, webp, ppm and bmp. Photos that are larger than 20MB in size won't be converted to a thumbnail.

```js
dropbox({
    resource: 'files/get_thumbnail_batch',
    parameters: {
        'entries': [{
            'path': '/image.jpg',
            'format': 'jpeg',
            'size': 'w64h64',
            'mode': 'strict'
        }]
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/list_folder ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-list_folder))
Starts returning the contents of a folder. If the result's :field:`ListFolderResult.has_more` field is :val:`true`, call :route:`list_folder/continue` with the returned :field:`ListFolderResult.cursor` to retrieve more entries.
If you're using :field:`ListFolderArg.recursive` set to :val:`true` to keep a local cache of the contents of a Dropbox account, iterate through each entry in order and process them as follows to keep your local state in sync:
For each :type:`FileMetadata`, store the new entry at the given path in your local state. If the required parent folders don't exist yet, create them. If there's already something else at the given path, replace it and remove all its children.
For each :type:`FolderMetadata`, store the new entry at the given path in your local state. If the required parent folders don't exist yet, create them. If there's already something else at the given path, replace it but leave the children as they are. Check the new entry's :field:`FolderSharingInfo.read_only` and set all its children's read-only statuses to match.
For each :type:`DeletedMetadata`, if your local state has something at the given path, remove it and all its children. If there's nothing at the given path, ignore this entry.
Note: :type:`auth.RateLimitError` may be returned if multiple :route:`list_folder` or :route:`list_folder/continue` calls with same parameters are made simultaneously by same API app for same user. If your app implements retry logic, please hold off the retry until the previous request finishes.

```js
dropbox({
    resource: 'files/list_folder',
    parameters: {
        'path': '/Homework/math',
        'recursive': false,
        'include_media_info': false,
        'include_deleted': false,
        'include_has_explicit_shared_members': false,
        'include_mounted_folders': true,
        'include_non_downloadable_files': true
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/list_folder/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-list_folder-continue))
Once a cursor has been retrieved from :route:`list_folder`, use this to paginate through all files and retrieve updates to the folder, following the same rules as documented for :route:`list_folder`.

```js
dropbox({
    resource: 'files/list_folder/continue',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/list_folder/get_latest_cursor ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-list_folder-get_latest_cursor))
A way to quickly get a cursor for the folder's state. Unlike :route:`list_folder`, :route:`list_folder/get_latest_cursor` doesn't return any entries. This endpoint is for app which only needs to know about new files and modifications and doesn't need to know about files that already exist in Dropbox.

```js
dropbox({
    resource: 'files/list_folder/get_latest_cursor',
    parameters: {
        'path': '/Homework/math',
        'recursive': false,
        'include_media_info': false,
        'include_deleted': false,
        'include_has_explicit_shared_members': false,
        'include_mounted_folders': true,
        'include_non_downloadable_files': true
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/list_folder/longpoll ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-list_folder-longpoll))
A longpoll endpoint to wait for changes on an account. In conjunction with :route:`list_folder/continue`, this call gives you a low-latency way to monitor an account for file changes. The connection will block until there are changes available or a timeout occurs. This endpoint is useful mostly for client-side apps. If you're looking for server-side notifications, check out our :link:`webhooks documentation https://www.dropbox.com/developers/reference/webhooks`.

```js
dropbox({
    resource: 'files/list_folder/longpoll',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu',
        'timeout': 30
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/list_revisions ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-list_revisions))
Returns revisions for files based on a file path or a file id. The file path or file id is identified from the latest file entry at the given file path or id. This end point allows your app to query either by file path or file id by setting the mode parameter appropriately.
In the :field:`ListRevisionsMode.path` (default) mode, all revisions at the same file path as the latest file entry are returned. If revisions with the same file id are desired, then mode must be set to :field:`ListRevisionsMode.id`. The :field:`ListRevisionsMode.id` mode is useful to retrieve revisions for a given file across moves or renames.

```js
dropbox({
    resource: 'files/list_revisions',
    parameters: {
        'path': '/root/word.docx',
        'mode': 'path',
        'limit': 10
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/lock_file_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-lock_file_batch))
Lock the files at the given paths. A locked file will be writable only by the lock holder. A successful response indicates that the file has been locked. Returns a list of the locked file paths and their metadata after this operation.

```js
dropbox({
    resource: 'files/lock_file_batch',
    parameters: {
        'entries': [{
            'path': '/John Doe/sample/test.pdf'
        }]
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/move ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-move))
Move a file or folder to a different location in the user's Dropbox.
If the source path is a folder all its contents will be moved.

```js
dropbox({
    resource: 'files/move',
    parameters: {
        'from_path': '/Homework/math',
        'to_path': '/Homework/algebra',
        'allow_shared_folder': false,
        'autorename': false,
        'allow_ownership_transfer': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/move_v2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-move_v2))
Move a file or folder to a different location in the user's Dropbox.
If the source path is a folder all its contents will be moved.
Note that we do not currently support case-only renaming.

```js
dropbox({
    resource: 'files/move_v2',
    parameters: {
        'from_path': '/Homework/math',
        'to_path': '/Homework/algebra',
        'allow_shared_folder': false,
        'autorename': false,
        'allow_ownership_transfer': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/move_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-move_batch))
Move multiple files or folders to different locations at once in the user's Dropbox.
This route will return job ID immediately and do the async moving job in background. Please use :route:`move_batch/check:1` to check the job status.

```js
dropbox({
    resource: 'files/move_batch',
    parameters: {
        'entries': [{
            'from_path': '/Homework/math',
            'to_path': '/Homework/algebra'
        }],
        'autorename': false,
        'allow_shared_folder': false,
        'allow_ownership_transfer': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/move_batch_v2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-move_batch_v2))
Move multiple files or folders to different locations at once in the user's Dropbox. Note that we do not currently support case-only renaming.
This route will replace :route:`move_batch:1`. The main difference is this route will return status for each entry, while :route:`move_batch:1` raises failure if any entry fails.
This route will either finish synchronously, or return a job ID and do the async move job in background. Please use :route:`move_batch/check:2` to check the job status.

```js
dropbox({
    resource: 'files/move_batch_v2',
    parameters: {
        'entries': [{
            'from_path': '/Homework/math',
            'to_path': '/Homework/algebra'
        }],
        'autorename': false,
        'allow_ownership_transfer': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/move_batch/check ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-move_batch-check))
Returns the status of an asynchronous job for :route:`move_batch:1`. If success, it returns list of results for each entry.

```js
dropbox({
    resource: 'files/move_batch/check',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/move_batch/check_v2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-move_batch-check_v2))
Returns the status of an asynchronous job for :route:`move_batch:2`. It returns list of results for each entry.

```js
dropbox({
    resource: 'files/move_batch/check_v2',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/paper/create ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-paper-create))
Creates a new Paper doc with the provided content.

```js
const stream = dropbox({
    resource: 'files/paper/create',
    parameters: {
        'path': '/Paper Docs/New Doc.paper',
        'import_format': 'html'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});

fs.createReadStream('/Paper Docs/New Doc.paper').pipe(stream);
```


### files/paper/update ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-paper-update))
Updates an existing Paper doc with the provided content.

```js
const stream = dropbox({
    resource: 'files/paper/update',
    parameters: {
        'path': '/Paper Docs/My Doc.paper',
        'import_format': 'html',
        'doc_update_policy': 'update',
        'paper_revision': 123
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});

fs.createReadStream('/Paper Docs/My Doc.paper').pipe(stream);
```


### files/permanently_delete ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-permanently_delete))
Permanently delete the file or folder at a given path (see https://www.dropbox.com/en/help/40).
If the given file or folder is not yet deleted, this route will first delete it. It is possible for this route to successfully delete, then fail to permanently delete.
Note: This endpoint is only available for Dropbox Business apps.

```js
dropbox({
    resource: 'files/permanently_delete',
    parameters: {
        'path': '/Homework/math/Prime_Numbers.txt'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/restore ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-restore))
Restore a specific revision of a file to the given path.

```js
dropbox({
    resource: 'files/restore',
    parameters: {
        'path': '/root/word.docx',
        'rev': 'a1c10ce0dd78'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/save_url ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-save_url))
Save the data from a specified URL into a file in user's Dropbox.
Note that the transfer from the URL must complete within 5 minutes, or the operation will time out and the job will fail.
If the given path already exists, the file will be renamed to avoid the conflict (e.g. myfile (1).txt).

```js
dropbox({
    resource: 'files/save_url',
    parameters: {
        'path': '/a.txt',
        'url': 'http://example.com/a.txt'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/save_url/check_job_status ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-save_url-check_job_status))
Check the status of a :route:`save_url` job.

```js
dropbox({
    resource: 'files/save_url/check_job_status',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/search ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-search))
Searches for files and folders.
Note: Recent changes will be reflected in search results within a few seconds and older revisions of existing files may still match your query for up to a few days.

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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/search_v2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-search_v2))
Searches for files and folders.
Note: :route:`search:2` along with :route:`search/continue:2` can only be used to retrieve a maximum of 10,000 matches.
Recent changes may not immediately be reflected in search results due to a short delay in indexing. Duplicate results may be returned across pages. Some results may not be returned.

```js
dropbox({
    resource: 'files/search_v2',
    parameters: {
        'query': 'cat',
        'options': {
            'path': '/Folder',
            'max_results': 20,
            'file_status': 'active',
            'filename_only': false
        },
        'match_field_options': {
            'include_highlights': false
        }
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/search/continue_v2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-search-continue_v2))
Fetches the next page of search results returned from :route:`search:2`.
Note: :route:`search:2` along with :route:`search/continue:2` can only be used to retrieve a maximum of 10,000 matches.
Recent changes may not immediately be reflected in search results due to a short delay in indexing. Duplicate results may be returned across pages. Some results may not be returned.

```js
dropbox({
    resource: 'files/search/continue_v2',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/tags/add ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-tags-add))
Add a tag to an item. A tag is a string. The strings are automatically converted to lowercase letters. No more than 20 tags can be added to a given item.

```js
dropbox({
    resource: 'files/tags/add',
    parameters: {
        'path': '/Prime_Numbers.txt',
        'tag_text': 'my_tag'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/tags/get ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-tags-get))
Get list of tags assigned to items.

```js
dropbox({
    resource: 'files/tags/get',
    parameters: {
        'paths': ['/Prime_Numbers.txt']
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/tags/remove ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-tags-remove))
Remove a tag from an item.

```js
dropbox({
    resource: 'files/tags/remove',
    parameters: {
        'path': '/Prime_Numbers.txt',
        'tag_text': 'my_tag'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/unlock_file_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-unlock_file_batch))
Unlock the files at the given paths. A locked file can only be unlocked by the lock holder or, if a business account, a team admin. A successful response indicates that the file has been unlocked. Returns a list of the unlocked file paths and their metadata after this operation.

```js
dropbox({
    resource: 'files/unlock_file_batch',
    parameters: {
        'entries': [{
            'path': '/John Doe/sample/test.pdf'
        }]
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/upload ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload))
Create a new file with the contents provided in the request.
Do not use this to upload a file larger than 150 MB. Instead, create an upload session with :route:`upload_session/start`.
Calls to this endpoint will count as data transport calls for any Dropbox Business teams with a limit on the number of data transport calls allowed per month. For more information, see the :link:`Data transport limit page https://www.dropbox.com/developers/reference/data-transport-limit`.

```js
const stream = dropbox({
    resource: 'files/upload',
    parameters: {
        'path': '/Homework/math/Matrices.txt',
        'mode': 'add',
        'autorename': false,
        'mute': false,
        'strict_conflict': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});

fs.createReadStream('/Homework/math/Matrices.txt').pipe(stream);
```


### files/upload_session/append ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload_session-append))
Append more data to an upload session.
A single request should not upload more than 150 MB. The maximum size of a file one can upload to an upload session is 350 GB.
Calls to this endpoint will count as data transport calls for any Dropbox Business teams with a limit on the number of data transport calls allowed per month. For more information, see the :link:`Data transport limit page https://www.dropbox.com/developers/reference/data-transport-limit`.

```js
const stream = dropbox({
    resource: 'files/upload_session/append',
    parameters: {
        'session_id': '1234faaf0678bcde',
        'offset': 0
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});

fs.createReadStream().pipe(stream);
```


### files/upload_session/append_v2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload_session-append_v2))
Append more data to an upload session.
When the parameter close is set, this call will close the session.
A single request should not upload more than 150 MB. The maximum size of a file one can upload to an upload session is 350 GB.
Calls to this endpoint will count as data transport calls for any Dropbox Business teams with a limit on the number of data transport calls allowed per month. For more information, see the :link:`Data transport limit page https://www.dropbox.com/developers/reference/data-transport-limit`.

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
}, (err, result, response) => {
    //see docs for `result` parameters
});

fs.createReadStream().pipe(stream);
```


### files/upload_session/finish ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload_session-finish))
Finish an upload session and save the uploaded data to the given file path.
A single request should not upload more than 150 MB. The maximum size of a file one can upload to an upload session is 350 GB.
Calls to this endpoint will count as data transport calls for any Dropbox Business teams with a limit on the number of data transport calls allowed per month. For more information, see the :link:`Data transport limit page https://www.dropbox.com/developers/reference/data-transport-limit`.

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
            'mute': false,
            'strict_conflict': false
        }
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});

fs.createReadStream().pipe(stream);
```


### files/upload_session/finish_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload_session-finish_batch))
This route helps you commit many files at once into a user's Dropbox. Use :route:`upload_session/start` and :route:`upload_session/append:2` to upload file contents. We recommend uploading many files in parallel to increase throughput. Once the file contents have been uploaded, rather than calling :route:`upload_session/finish`, use this route to finish all your upload sessions in a single request.
:field:`UploadSessionStartArg.close` or :field:`UploadSessionAppendArg.close` needs to be true for the last :route:`upload_session/start` or :route:`upload_session/append:2` call. The maximum size of a file one can upload to an upload session is 350 GB.
This route will return a job_id immediately and do the async commit job in background. Use :route:`upload_session/finish_batch/check` to check the job status.
For the same account, this route should be executed serially. That means you should not start the next job before current job finishes. We allow up to 1000 entries in a single request.
Calls to this endpoint will count as data transport calls for any Dropbox Business teams with a limit on the number of data transport calls allowed per month. For more information, see the :link:`Data transport limit page https://www.dropbox.com/developers/reference/data-transport-limit`.

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
                'mode': 'add',
                'autorename': true,
                'mute': false,
                'strict_conflict': false
            }
        }]
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/upload_session/finish_batch_v2 ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload_session-finish_batch_v2))
This route helps you commit many files at once into a user's Dropbox. Use :route:`upload_session/start` and :route:`upload_session/append:2` to upload file contents. We recommend uploading many files in parallel to increase throughput. Once the file contents have been uploaded, rather than calling :route:`upload_session/finish`, use this route to finish all your upload sessions in a single request.
:field:`UploadSessionStartArg.close` or :field:`UploadSessionAppendArg.close` needs to be true for the last :route:`upload_session/start` or :route:`upload_session/append:2` call of each upload session. The maximum size of a file one can upload to an upload session is 350 GB.
We allow up to 1000 entries in a single request.
Calls to this endpoint will count as data transport calls for any Dropbox Business teams with a limit on the number of data transport calls allowed per month. For more information, see the :link:`Data transport limit page https://www.dropbox.com/developers/reference/data-transport-limit`.

```js
dropbox({
    resource: 'files/upload_session/finish_batch_v2',
    parameters: {
        'entries': [{
            'cursor': {
                'session_id': '1234faaf0678bcde',
                'offset': 0
            },
            'commit': {
                'path': '/Homework/math/Matrices.txt',
                'mode': 'add',
                'autorename': true,
                'mute': false,
                'strict_conflict': false
            }
        }]
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/upload_session/finish_batch/check ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload_session-finish_batch-check))
Returns the status of an asynchronous job for :route:`upload_session/finish_batch`. If success, it returns list of result for each entry.

```js
dropbox({
    resource: 'files/upload_session/finish_batch/check',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/upload_session/start ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload_session-start))
Upload sessions allow you to upload a single file in one or more requests, for example where the size of the file is greater than 150 MB.  This call starts a new upload session with the given data. You can then use :route:`upload_session/append:2` to add more data and :route:`upload_session/finish` to save all the data to a file in Dropbox.
A single request should not upload more than 150 MB. The maximum size of a file one can upload to an upload session is 350 GB.
An upload session can be used for a maximum of 7 days. Attempting to use an :field:`UploadSessionStartResult.session_id` with :route:`upload_session/append:2` or :route:`upload_session/finish` more than 7 days after its creation will return a :field:`UploadSessionLookupError.not_found`.
Calls to this endpoint will count as data transport calls for any Dropbox Business teams with a limit on the number of data transport calls allowed per month. For more information, see the :link:`Data transport limit page https://www.dropbox.com/developers/reference/data-transport-limit`.
By default, upload sessions require you to send content of the file in sequential order via consecutive :route:`upload_session/start`, :route:`upload_session/append:2`, :route:`upload_session/finish` calls. For better performance, you can instead optionally use a :field:`UploadSessionType.concurrent` upload session. To start a new concurrent session, set :field:`UploadSessionStartArg.session_type` to :field:`UploadSessionType.concurrent`. After that, you can send file data in concurrent :route:`upload_session/append:2` requests. Finally finish the session with :route:`upload_session/finish`.
There are couple of constraints with concurrent sessions to make them work. You can not send data with :route:`upload_session/start` or :route:`upload_session/finish` call, only with :route:`upload_session/append:2` call. Also data uploaded in :route:`upload_session/append:2` call must be multiple of 4194304 bytes (except for last :route:`upload_session/append:2` with :field:`UploadSessionStartArg.close` to :val:`true`, that may contain any remaining data).

```js
const stream = dropbox({
    resource: 'files/upload_session/start',
    parameters: {
        'close': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});

fs.createReadStream().pipe(stream);
```


### files/upload_session/start_batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-upload_session-start_batch))
This route starts batch of upload_sessions. Please refer to `upload_session/start` usage.
Calls to this endpoint will count as data transport calls for any Dropbox Business teams with a limit on the number of data transport calls allowed per month. For more information, see the :link:`Data transport limit page https://www.dropbox.com/developers/reference/data-transport-limit`.

```js
dropbox({
    resource: 'files/upload_session/start_batch',
    parameters: {
        'num_sessions': 1
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/alpha/get_metadata ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-alpha-get_metadata))
Returns the metadata for a file or folder. This is an alpha endpoint compatible with the properties API.
Note: Metadata for the root folder is unsupported.

```js
dropbox({
    resource: 'files/alpha/get_metadata',
    parameters: {
        'path': '/Homework/math',
        'include_media_info': false,
        'include_deleted': false,
        'include_has_explicit_shared_members': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/alpha/upload ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-alpha-upload))
Create a new file with the contents provided in the request. Note that the behavior of this alpha endpoint is unstable and subject to change.
Do not use this to upload a file larger than 150 MB. Instead, create an upload session with :route:`upload_session/start`.

```js
const stream = dropbox({
    resource: 'files/alpha/upload',
    parameters: {
        'path': '/Homework/math/Matrices.txt',
        'mode': 'add',
        'autorename': false,
        'mute': false,
        'strict_conflict': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});

fs.createReadStream('/Homework/math/Matrices.txt').pipe(stream);
```


### files/properties/add ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-properties-add))
undefined

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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/properties/overwrite ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-properties-overwrite))
undefined

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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/properties/remove ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-properties-remove))
undefined

```js
dropbox({
    resource: 'files/properties/remove',
    parameters: {
        'path': '/my_awesome/word.docx',
        'property_template_ids': ['ptid:1a5n2i6d3OYEAAAAAAAAAYa']
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/properties/template/get ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-properties-template-get))
undefined

```js
dropbox({
    resource: 'files/properties/template/get',
    parameters: {
        'template_id': 'ptid:1a5n2i6d3OYEAAAAAAAAAYa'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/properties/template/list ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-properties-template-list))
undefined

```js
dropbox({
    resource: 'files/properties/template/list'
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### files/properties/update ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#files-properties-update))
undefined

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
}, (err, result, response) => {
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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/add_folder_member ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-add_folder_member))
Allows an owner or editor (if the ACL update policy allows) of a shared folder to add another member.
For the new member to get access to all the functionality for this folder, you will need to call :route:`mount_folder` on their behalf.

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
            'access_level': 'editor'
        }, {
            'member': {
                '.tag': 'dropbox_id',
                'dropbox_id': 'dbid:AAEufNrMPSPe0dMQijRP0N_aZtBJRm26W4Q'
            },
            'access_level': 'viewer'
        }],
        'quiet': false,
        'custom_message': 'Documentation for launch day'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/check_job_status ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-check_job_status))
Returns the status of an asynchronous job.

```js
dropbox({
    resource: 'sharing/check_job_status',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/check_remove_member_job_status ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-check_remove_member_job_status))
Returns the status of an asynchronous job for sharing a folder.

```js
dropbox({
    resource: 'sharing/check_remove_member_job_status',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/check_share_job_status ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-check_share_job_status))
Returns the status of an asynchronous job for sharing a folder.

```js
dropbox({
    resource: 'sharing/check_share_job_status',
    parameters: {
        'async_job_id': '34g93hh34h04y384084'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/create_shared_link_with_settings ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-create_shared_link_with_settings))
Create a shared link with custom settings. If no settings are given then the default visibility is :field:`RequestedVisibility.public` (The resolved visibility, though, may depend on other aspects such as team and shared folder settings).

```js
dropbox({
    resource: 'sharing/create_shared_link_with_settings',
    parameters: {
        'path': '/Prime_Numbers.txt',
        'settings': {
            'audience': 'public',
            'access': 'viewer',
            'requested_visibility': 'public',
            'allow_download': true
        }
    }
}, (err, result, response) => {
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
}, (err, result, response) => {
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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/get_folder_metadata ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-get_folder_metadata))
Returns shared folder metadata by its folder ID.

```js
dropbox({
    resource: 'sharing/get_folder_metadata',
    parameters: {
        'shared_folder_id': '84528192421',
        'actions': []
    }
}, (err, result, response) => {
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
}, (err, result, response) => {
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
}, (err, result, response) => {
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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/list_file_members/batch ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_file_members-batch))
Get members of multiple files at once. The arguments to this route are more limited, and the limit on query result size per file is more strict. To customize the results more, use the individual file endpoint.
Inherited users and groups are not included in the result, and permissions are not returned for this endpoint.

```js
dropbox({
    resource: 'sharing/list_file_members/batch',
    parameters: {
        'files': ['id:3kmLmQFnf1AAAAAAAAAAAw', 'id:VvTaJu2VZzAAAAAAAAAADQ'],
        'limit': 10
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/list_file_members/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_file_members-continue))
Once a cursor has been retrieved from :route:`list_file_members` or :route:`list_file_members/batch`, use this to paginate through all shared file members.

```js
dropbox({
    resource: 'sharing/list_file_members/continue',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/list_folder_members ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_folder_members))
Returns shared folder membership by its folder ID.

```js
dropbox({
    resource: 'sharing/list_folder_members',
    parameters: {
        'shared_folder_id': '84528192421',
        'actions': [],
        'limit': 10
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/list_folder_members/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_folder_members-continue))
Once a cursor has been retrieved from :route:`list_folder_members`, use this to paginate through all shared folder members.

```js
dropbox({
    resource: 'sharing/list_folder_members/continue',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/list_folders ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_folders))
Return the list of all shared folders the current user has access to.

```js
dropbox({
    resource: 'sharing/list_folders',
    parameters: {
        'limit': 100,
        'actions': []
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/list_folders/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_folders-continue))
Once a cursor has been retrieved from :route:`list_folders`, use this to paginate through all shared folders. The cursor must come from a previous call to :route:`list_folders` or :route:`list_folders/continue`.

```js
dropbox({
    resource: 'sharing/list_folders/continue',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/list_mountable_folders ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_mountable_folders))
Return the list of all shared folders the current user can mount or unmount.

```js
dropbox({
    resource: 'sharing/list_mountable_folders',
    parameters: {
        'limit': 100,
        'actions': []
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/list_mountable_folders/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_mountable_folders-continue))
Once a cursor has been retrieved from :route:`list_mountable_folders`, use this to paginate through all mountable shared folders. The cursor must come from a previous call to :route:`list_mountable_folders` or :route:`list_mountable_folders/continue`.

```js
dropbox({
    resource: 'sharing/list_mountable_folders/continue',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/list_received_files ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_received_files))
Returns a list of all files shared with current user.
 Does not include files the user has received via shared folders, and does  not include unclaimed invitations.

```js
dropbox({
    resource: 'sharing/list_received_files',
    parameters: {
        'limit': 100,
        'actions': []
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/list_received_files/continue ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_received_files-continue))
Get more results with a cursor from :route:`list_received_files`.

```js
dropbox({
    resource: 'sharing/list_received_files/continue',
    parameters: {
        'cursor': 'AzJJbGlzdF90eXBdofe9c3RPbGlzdGFyZ3NfYnlfZ2lkMRhcbric7Rdog9emfGRlc2MCRWxpbWl0BGRId'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/list_shared_links ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-list_shared_links))
List shared links of this user.
If no path is given, returns a list of all shared links for the current user. For members of business teams using team space and member folders, returns all shared links in the team member's home folder unless the team space ID is specified in the request header. For more information, refer to the :link:`Namespace Guide https://www.dropbox.com/developers/reference/namespace-guide`.
If a non-empty path is given, returns a list of all shared links that allow access to the given path - direct links to the given path and links to parent folders of the given path. Links to parent folders can be suppressed by setting direct_only to true.

```js
dropbox({
    resource: 'sharing/list_shared_links',
    parameters: {
        'cursor': 'ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/modify_shared_link_settings ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-modify_shared_link_settings))
Modify the shared link's settings.
If the requested visibility conflict with the shared links policy of the team or the shared folder (in case the linked file is part of a shared folder) then the :field:`LinkPermissions.resolved_visibility` of the returned :type:`SharedLinkMetadata` will reflect the actual visibility of the shared link and the :field:`LinkPermissions.requested_visibility` will reflect the requested visibility.

```js
dropbox({
    resource: 'sharing/modify_shared_link_settings',
    parameters: {
        'url': 'https://www.dropbox.com/s/2sn712vy1ovegw8/Prime_Numbers.txt?dl=0',
        'settings': {
            'audience': 'public',
            'access': 'viewer',
            'requested_visibility': 'public',
            'allow_download': true
        },
        'remove_expiration': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/mount_folder ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-mount_folder))
The current user mounts the designated folder.
Mount a shared folder for a user after they have been added as a member. Once mounted, the shared folder will appear in their Dropbox.

```js
dropbox({
    resource: 'sharing/mount_folder',
    parameters: {
        'shared_folder_id': '84528192421'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/relinquish_file_membership ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-relinquish_file_membership))
The current user relinquishes their membership in the designated file. Note that the current user may still have inherited access to this file through the parent folder.

```js
dropbox({
    resource: 'sharing/relinquish_file_membership',
    parameters: {
        'file': 'id:3kmLmQFnf1AAAAAAAAAAAw'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/relinquish_folder_membership ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-relinquish_folder_membership))
The current user relinquishes their membership in the designated shared folder and will no longer have access to the folder.  A folder owner cannot relinquish membership in their own folder.
This will run synchronously if leave_a_copy is false, and asynchronously if leave_a_copy is true.

```js
dropbox({
    resource: 'sharing/relinquish_folder_membership',
    parameters: {
        'shared_folder_id': '84528192421',
        'leave_a_copy': false
    }
}, (err, result, response) => {
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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/remove_folder_member ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-remove_folder_member))
Allows an owner or editor (if the ACL update policy allows) of a shared folder to remove another member.

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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/revoke_shared_link ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-revoke_shared_link))
Revoke a shared link.
Note that even after revoking a shared link to a file, the file may be accessible if there are shared links leading to any of the file parent folders. To list all shared links that enable access to a specific file, you can use the :route:`list_shared_links` with the file as the :field:`ListSharedLinksArg.path` argument.

```js
dropbox({
    resource: 'sharing/revoke_shared_link',
    parameters: {
        'url': 'https://www.dropbox.com/s/2sn712vy1ovegw8/Prime_Numbers.txt?dl=0'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/set_access_inheritance ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-set_access_inheritance))
Change the inheritance policy of an existing Shared Folder. Only permitted for shared folders in a shared team root.
If a :field:`ShareFolderLaunch.async_job_id` is returned, you'll need to call :route:`check_share_job_status` until the action completes to get the metadata for the folder.

```js
dropbox({
    resource: 'sharing/set_access_inheritance',
    parameters: {
        'shared_folder_id': '84528192421',
        'access_inheritance': 'inherit'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/share_folder ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-share_folder))
Share a folder with collaborators.
Most sharing will be completed synchronously. Large folders will be completed asynchronously. To make testing the async case repeatable, set `ShareFolderArg.force_async`.
If a :field:`ShareFolderLaunch.async_job_id` is returned, you'll need to call :route:`check_share_job_status` until the action completes to get the metadata for the folder.

```js
dropbox({
    resource: 'sharing/share_folder',
    parameters: {
        'path': '/example/workspace',
        'acl_update_policy': 'editors',
        'force_async': false,
        'member_policy': 'team',
        'shared_link_policy': 'members',
        'access_inheritance': 'inherit'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/transfer_folder ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-transfer_folder))
Transfer ownership of a shared folder to a member of the shared folder.
User must have :field:`AccessLevel.owner` access to the shared folder to perform a transfer.

```js
dropbox({
    resource: 'sharing/transfer_folder',
    parameters: {
        'shared_folder_id': '84528192421',
        'to_dropbox_id': 'dbid:AAEufNrMPSPe0dMQijRP0N_aZtBJRm26W4Q'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/unmount_folder ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-unmount_folder))
The current user unmounts the designated folder. They can re-mount the folder at a later time using :route:`mount_folder`.

```js
dropbox({
    resource: 'sharing/unmount_folder',
    parameters: {
        'shared_folder_id': '84528192421'
    }
}, (err, result, response) => {
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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/unshare_folder ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-unshare_folder))
Allows a shared folder owner to unshare the folder.
You'll need to call :route:`check_job_status` to determine if the action has completed successfully.

```js
dropbox({
    resource: 'sharing/unshare_folder',
    parameters: {
        'shared_folder_id': '84528192421',
        'leave_a_copy': false
    }
}, (err, result, response) => {
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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/update_folder_member ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-update_folder_member))
Allows an owner or editor of a shared folder to update another member's permissions.

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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/update_folder_policy ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-update_folder_policy))
Update the sharing policies for a shared folder.
User must have :field:`AccessLevel.owner` access to the shared folder to update its policies.

```js
dropbox({
    resource: 'sharing/update_folder_policy',
    parameters: {
        'shared_folder_id': '84528192421',
        'member_policy': 'team',
        'acl_update_policy': 'owner',
        'shared_link_policy': 'members'
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/create_shared_link ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-create_shared_link))
Create a shared link.
If a shared link already exists for the given path, that link is returned.
Previously, it was technically possible to break a shared link by moving or renaming the corresponding file or folder. In the future, this will no longer be the case, so your app shouldn't rely on this behavior. Instead, if your app needs to revoke a shared link, use :route:`revoke_shared_link`.

```js
dropbox({
    resource: 'sharing/create_shared_link',
    parameters: {
        'path': '/Homework/Math/Prime_Numbers.txt',
        'short_url': false
    }
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### sharing/get_shared_links ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#sharing-get_shared_links))
Returns a list of :type:`LinkMetadata` objects for this user, including collection links.
If no path is given, returns a list of all shared links for the current user, including collection links, up to a maximum of 1000 links.
If a non-empty path is given, returns a list of all shared links that allow access to the given path.  Collection links are never returned in this case.

```js
dropbox({
    resource: 'sharing/get_shared_links',
    parameters: {
        'path': ''
    }
}, (err, result, response) => {
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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### users/features/get_values ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#users-features-get_values))
Get a list of feature values that may be configured for the current account.

```js
dropbox({
    resource: 'users/features/get_values',
    parameters: {
        'features': [{
            '.tag': 'paper_as_files'
        }, {
            '.tag': 'file_locking'
        }]
    }
}, (err, result, response) => {
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
}, (err, result, response) => {
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
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### users/get_current_account ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#users-get_current_account))
Get information about the current user's account.

```js
dropbox({
    resource: 'users/get_current_account'
}, (err, result, response) => {
    //see docs for `result` parameters
});
```


### users/get_space_usage ([see docs](https://www.dropbox.com/developers/documentation/http/documentation#users-get_space_usage))
Get the space usage information for the current user's account.

```js
dropbox({
    resource: 'users/get_space_usage'
}, (err, result, response) => {
    //see docs for `result` parameters
});
```
