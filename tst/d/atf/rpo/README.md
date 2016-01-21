# DS Repository 

## Repository Structure

1. stc - static pre-written and compiled artifacts.
2. tpl - templates. Each template can be used by any configuration.
3. dat - data for templates. Variable settings for different configurations.
4. gen - generators.
5. tsk - Builder scheduled tasks.

## Sample structure

```
dat/
  humans.json
  sitemap.json
gen/
  sitemap.js
stc/
  beta/
    nm/
    www/
      robots.txt
  ci/
    butfile.json
  dev/
    nm/
    yum.repos.d/
    www/
      robots.txt
  prd/
    vm/
    cfg/
    nm/
    www/
      robots.txt
      google_identification_file
      yandex_identification_file
tpl/
  www/
    humans.txt
    sitemap.xml
tsk/
  backup.js
  sample.js
mapping.json
README.md
```

## Deployment Work-Flow

1. Compile dat/** + tpl/** to stc/**
2. If found tag ${generator.GENERATOR_NAME} generates data for it with gen/GENERATOR_NAME.js
3. Deploy from stc/**

## Road Map

| Version | Status     | Functionality                                                                 |
|---      |---         |---                                                                            |
| 0.1     |            | Req. [esf-util-1.1](esf-util-1.1)                                             |
| 0.2     |            | Req. [esf-util-1.3](esf-util-1.3), [esf-util-1.3](esf-util-1.3)               |
| 1.0     |            | Own Product or Ansible DS repository (req. [esf-util-1.3](esf-util-1.3))      |

## Requirements

### esf-util-1
| ReqId        | Requirement                                                  | Implementation Methods |
|---           |---                                                           |---                     |
| esf-util-1.1 | Used with the ESF-Builder (```[srpo]/dmn/dev/ci/bdr```)      |                        |
| esf-util-1.2 | Can be additionally used with Ansible                        |                        |
| esf-util-1.3 | Separate settings from modules (```esf-but```)               |                        |
| esf-util-1.4 | Decide to have own Product or Ansible DS repository          |                        |
| esf-util-1.5 | Try to switch to gulp instead CLI and use just the Builder   |                        |


## Notes

### 2015-08-02:
Currently tasks can be ran with cli:

```bash
node /web/itms/dmn/itms/ci/bdr/simpletask.js backup
```
