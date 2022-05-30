# -*- coding: utf-8 -*-
{
    'name' : 'App',
    'summary': """App to manage inventory with TOC""",
    'description':"""
    App to manage inventory with TOC
    """,
    'author' : 'odoo',
    'category' : 'Training',
    'version' : '0.1',
    'depends' : ['sale'],
    'data':[
       'views/mta_app_view.xml',
       'views/product_view.xml',
    ],
    'css': ['css/styles.css'],
    'demo' : [
        
    ],
    'license': 'OPL-1'
}