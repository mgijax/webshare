############################################################################
# Global Config
############################################################################

NAME                    MGI_4.4
 
###--
###-- MGI Host Servers
###--

# Python host and directory where standard MGI python products are installed
PY_HOST                 www.informatics.jax.org

# Host of tomcat servlet container; non-public, production or firien installs include port # 
JAVA_HOST               www.informatics.jax.org

# Host of the sequence retrieval tool
SEQFETCH_HOST           www.informatics.jax.org

#Host of the mouse blast tool
MOUSEBLAST_HOST         mouseblast.informatics.jax.org

#Host of the gbrowse tool
GBROWSE_HOST            gbrowse.informatics.jax.org/cgi-bin/

#Host of the Public Installation
PUBLIC_HOST		www.informatics.jax.org

###--
###-- Database Connectivity
###--

DB_URL           isengard.informatics.jax.org:4100
DB_SERVER        BOT_MGI
DB_DATABASE      mgd
DB_USER          mgd_public
DB_PASSWORD      mgdpub
SNP_DATABASE     snp

###--
###-- Global Flags & Strings
###--

# is this WI part of a production installation?  (so no page caching)
IS_PRODUCTION           0

# are SNP and marker coordinates drawn from the same genome assembly? (0/1)
BUILDS_IN_SYNC          1

# genome assembly version for marker coordinates
ASSEMBLY_VERSION        37

# genome assembly version for SNP coordinates
SNP_ASSEMBLY_VERSION    37

# indicates if the Java WI should do no caching of pages
JAVAWI_CACHE_ENABLED    1

# integer number of minutes for which we can cache an allele's phenotype data
# (should be 0 on production to see edits instantly; longer on public to aid
# performance)
PHENO_CACHE_TIMEOUT   15

# indicates if the awstats browser stat collection javascript is enabled
STAT_COLLECT_ENABLED    0

# version numbers used in css and js filename and path
YUI_VERSION         2.8.1
MGI_VERSION         01

# path & name of the generated css files
TEMPLATE_CSS_FILE   mgi_template${MGI_VERSION}.css
MGIHOME_CSS_FILE    homepages_template${MGI_VERSION}.css
YUI_CSS_URL         ${YUI_URL}combo?${YUI_VERSION}/build/assets/skins/sam/skin.css

# patch and name of the generated js files
TEMPLATE_JS_FILE    mgi_template${MGI_VERSION}.js
MGIHOME_JS_FILE     homepages_template${MGI_VERSION}.js
YUI_JS_URL          ${YUI_URL}combo?${YUI_VERSION}/build/utilities/utilities.js&${YUI_VERSION}/build/container/container-min.js&${YUI_VERSION}/build/datasource/datasource-min.js&${YUI_VERSION}/build/datatable/datatable-min.js&${YUI_VERSION}/build/menu/menu-min.js&${YUI_VERSION}/build/resize/resize-min.js&${YUI_VERSION}/build/selector/selector-min.js&${YUI_VERSION}/build/tabview/tabview-min.js&${YUI_VERSION}/build/treeview/treeview-min.js&${YUI_VERSION}/build/history/history-min.js

# settings for javascript captcha implementation, element is hidden form param, 
# hide is element hidden by css
CAPTCHA_ELEMENT street
CAPTCHA_HIDE    business
CAPTCHA_TIMEOUT 5

###--
###-- MGI BASE URLs -be aware some server aliases will include the '/www/'
###--

JAVAWI_URL              http://${JAVA_HOST}/javawi2/servlet/

WI_URL                  http://${PY_HOST}/

QUICKSEARCH_URL         http://${PY_HOST}/searchtool/

MGIHOME_URL             http://${PY_HOST}/mgihome/

USERDOCS_URL            http://${PY_HOST}/userdocs/

WEBSHARE_URL            http://${PY_HOST}/webshare/

FAQ_URL                 http://${PY_HOST}/faq/

MOUSEBLAST_URL          http://${MOUSEBLAST_HOST}/

FTP_BASE_URL            ftp://ftp.informatics.jax.org/pub/

FTP_URL                 ${FTP_BASE_URL}reports/

PIXELDB_URL             http://${PY_HOST}/pixeldb/fetch_pixels.cgi?id=

GO_GRAPH_URL            http://${PY_HOST}/GOgraphs/

GO_TOOLS_URL            http://${PY_HOST}/gotools/

MGIWS_URL               http://services.informatics.jax.org/mgiws

BIOMART_URL             http://biomart.informatics.jax.org/

YUI_URL                 http://yui.yahooapis.com/

###--
###-- MGI URLs using apache aliases - if you wish to use apache aliases to 
###-- find these pages, use the PY_HOST (if same as docroot), otherwise use
###-- fully extended paths to their respective directories
###--

HOMEPAGES_URL           http://${PY_HOST}/

MENUS_URL               http://${PY_HOST}/

###--
###-- MGI FULL URLs 
###--

SEQFETCH_URL            http://${SEQFETCH_HOST}/seqfetch/tofasta.cgi?

GREENBOOK_URL           http://${PY_HOST}/greenbook/

COOKBOOK_URL            http://${PY_HOST}/cookbook/

MORSEBOOK_URL           http://${PY_HOST}/morsebook/

SILVER_URL              http://${PY_HOST}/silverbook/

WKSILVERS_URL           http://${PY_HOST}/wksilvers/

SCHEMA                  http://${PY_HOST}/schema/

GBROWSE_URL             http://${GBROWSE_HOST}gbrowse/mouse_current

GBROWSE_THUMB_URL       http://${GBROWSE_HOST}gbrowse_img/thumbs_current

IMSRURL                 http://www.findmice.org/

MTB_URL                 http://tumor.informatics.jax.org/mtbwi/index.do


###--
###-- Other Paths
###--

GENOMIC_PATH /hobbiton/data/research/
NIBDBS /hobbiton/data/research/dna/mouse_build_37_nib

