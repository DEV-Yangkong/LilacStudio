# Generated by Django 4.2.2 on 2023-08-22 04:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("notice_board", "0006_notice_views_count"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="notice",
            options={"ordering": ["-created_at"]},
        ),
    ]
